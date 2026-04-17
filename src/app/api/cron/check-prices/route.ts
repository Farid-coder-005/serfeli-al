import { NextResponse } from "next/server";
import { Resend } from "resend";
import prisma from "@/lib/prisma";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const isDryRun = searchParams.get("dryrun") === "true";

  // 1. Security check
  const authHeader = request.headers.get("authorization");
  if (
    !isDryRun && 
    authHeader !== `Bearer ${process.env.CRON_SECRET}` && 
    process.env.NODE_ENV === "production"
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  console.log(`[Cron] Starting Price Check. Mode: ${isDryRun ? "DRY-RUN" : "PROD"}`);

  try {
    // 2. Fetch all active alerts
    const activeAlerts = await prisma.priceAlert.findMany({
      where: { isActive: true },
      include: {
        product: {
          include: {
            offers: true,
          },
        },
      },
    });

    console.log(`[Cron] Found ${activeAlerts.length} active alerts.`);

    const notificationsSent = [];
    const skippedDryRun = [];

    for (const alert of activeAlerts) {
      const availableOffers = alert.product.offers?.filter((o: any) => o.isAvailable) || [];
      
      if (availableOffers.length === 0) {
        console.log(`[Cron] Skip: No available offers for ${alert.productName}`);
        continue;
      }

      // 3. Find the lowest current price safely
      const lowestPrice = Math.min(...availableOffers.map((o: any) => o.currentPrice));

      // 4. Compare with target price
      if (lowestPrice <= alert.targetPrice) {
        if (isDryRun) {
          console.log(`[Cron] [Dry-Run] Would notify ${alert.email} for ${alert.productName} (Price: ${lowestPrice} <= ${alert.targetPrice})`);
          skippedDryRun.push(alert.id);
          continue;
        }

        // 5. Send notification via Resend
        try {
          const { data, error } = await resend.emails.send({
            from: "Serfeli.al <auth@serfeli.al>",
            to: [alert.email],
            subject: `Endirim! ${alert.productName} qiyməti düşdü!`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
                <h1 style="color: #005ea8;">Şad xəbər!</h1>
                <p style="font-size: 16px; color: #333;">
                  İzlədiyiniz <strong>${alert.productName}</strong> məhsulunun qiyməti sizin hədəf 
                  qiymətinizə (<strong>${alert.targetPrice.toFixed(2)} ₼</strong>) çatdı!
                </p>
                <div style="background: #f9f9f9; padding: 20px; text-align: center; border-radius: 10px; margin: 20px 0;">
                  <p style="font-size: 14px; color: #666; margin-bottom: 5px;">Hazırkı ən aşağı qiymət:</p>
                  <p style="font-size: 32px; font-weight: bold; color: #FF5500; margin: 0;">${lowestPrice.toFixed(2)} ₼</p>
                </div>
                <p style="text-align: center;">
                  <a href="https://serfeli-al.vercel.app/product/${alert.productId}" 
                     style="background: #005ea8; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; font-weight: bold; display: inline-block;">
                    İndi Al / Müqayisə Et
                  </a>
                </p>
              </div>
            `,
          });

          if (!error) {
            await prisma.priceAlert.update({
              where: { id: alert.id },
              data: { isActive: false },
            });
            notificationsSent.push(alert.id);
            console.log(`[Cron] Email sent to ${alert.email} for ${alert.productName}`);
          } else {
            console.error(`[Cron] Resend error for ${alert.email}:`, error);
          }
        } catch (emailErr) {
          console.error(`[Cron] Failed to send email to ${alert.email}:`, emailErr);
        }
      }
    }

    return NextResponse.json({
      success: true,
      mode: isDryRun ? "dry-run" : "production",
      stats: {
        activeAlerts: activeAlerts.length,
        metTarget: notificationsSent.length + skippedDryRun.length,
        emailsSent: notificationsSent.length,
        dryRunSkips: skippedDryRun.length
      }
    });
  } catch (error: any) {
    console.error("[Cron] Global Error:", error);
    return NextResponse.json({ error: "Internal Server Error", details: error.message }, { status: 500 });
  }
}
