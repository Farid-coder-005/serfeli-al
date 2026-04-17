import { NextResponse } from "next/server";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { Resend } from "resend";

const resend = process.env.RESEND_API_KEY 
  ? new Resend(process.env.RESEND_API_KEY) 
  : null;

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    const normalizedEmail = (email || "").trim().toLowerCase();

    console.log(`[ForgotPassword] Lookup request for: "${normalizedEmail}" (Raw: "${email}")`);

    if (!normalizedEmail) {
      return NextResponse.json({ error: "Email daxil edilməyib" }, { status: 400 });
    }

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (!user) {
      console.log(`[ForgotPassword] USER NOT FOUND in database for: "${normalizedEmail}"`);
      return NextResponse.json({ error: "Bu email ilə qeydiyyatdan keçmiş istifadəçi tapılmadı" }, { status: 404 });
    }

    console.log(`[ForgotPassword] User found: ${user.id}. Generating token...`);

    // 1. Generate Token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour from now

    // 2. Save to DB
    await prisma.user.update({
      where: { email: normalizedEmail },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    // 3. Send Email
    const resetUrl = `${process.env.NEXTAUTH_URL || 'https://serfeli-al.vercel.app'}/auth/reset-password/${resetToken}`;

    if (!resend) {
      const keyPrefix = process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.slice(0, 4) : "MISSING";
      console.error(`[ForgotPassword] 🛑 Resend not initialized. Key Prefix: ${keyPrefix}`);
      return NextResponse.json({ 
        error: "Email sistemi tənzimlənməyib",
        debug: { keyPrefix, envPresent: !!process.env.RESEND_API_KEY }
      }, { status: 500 });
    }

    const { data, error } = await resend.emails.send({
      from: "Serfeli.al <auth@serfeli.al>",
      to: [normalizedEmail],
      subject: "Şifrənin sıfırlanması - Serfeli.al",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
          <h1 style="color: #FF5500; text-align: center;">Şifrə Sıfırlama</h1>
          <p style="font-size: 16px; color: #333;">
            Sizin hesabınız üçün şifrə sıfırlama tələbi daxil olub. Əgər bunu siz etməmisinizsə, bu e-poçta məhəl qoymayın.
          </p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${resetUrl}" 
               style="background: #FF5500; color: white; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block; font-size: 16px;">
              Şifrəni Sıfırla
            </a>
          </div>
          <p style="font-size: 14px; color: #666; text-align: center;">
            Bu link 1 saat ərzində qüvvədədir.
          </p>
          <hr style="border: 0; border-top: 1px solid #eee; margin: 30px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">
            Hörmətlə, <br /> Serfeli.al Komandası
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("[ForgotPassword] 🛑 FINAL DIAGNOSTIC - RESEND ERROR:", JSON.stringify(error, null, 2));
      return NextResponse.json({ 
        error: "Email göndərilərkən xəta baş verdi", 
        diagnostic: error,
        message: error.message,
        name: error.name
      }, { status: 500 });
    }

    console.log(`[ForgotPassword] Success: Email sent to ${normalizedEmail}. MessageId: ${data?.id}`);
    return NextResponse.json({ success: true, message: "Sıfırlama linki göndərildi" });
  } catch (err: any) {
    console.error("[ForgotPassword] CRITICAL SERVER ERROR:", err.message, err.stack);
    return NextResponse.json({ error: "Server xətası baş verdi" }, { status: 500 });
  }
}
