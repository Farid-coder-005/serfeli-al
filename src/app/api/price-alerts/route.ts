import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { productId, productName, targetPrice, currentPriceAtAlert, email } = body;

    if (!productId || !targetPrice || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const priceAlert = await prisma.priceAlert.create({
      data: {
        userId: (session.user as any).id,
        productId,
        productName,
        targetPrice: parseFloat(targetPrice),
        currentPriceAtAlert: parseFloat(currentPriceAtAlert),
        email,
        isActive: true,
      },
    });

    return NextResponse.json(priceAlert, { status: 201 });
  } catch (error: any) {
    console.error("Price Alert Error:", error);
    return NextResponse.json(
      { error: "Failed to create price alert", details: error.message },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const alerts = await prisma.priceAlert.findMany({
      where: {
        userId: (session.user as any).id,
      },
      include: {
        product: {
          include: {
            offers: {
              where: { isAvailable: true },
              orderBy: { currentPrice: 'asc' },
              take: 1
            }
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    return NextResponse.json(alerts);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
