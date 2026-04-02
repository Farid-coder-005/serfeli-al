import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Lütfən daxil olun" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const favorites = await prisma.favorite.findMany({
      where: { userId },
      select: { productId: true }
    });
    
    return NextResponse.json(favorites.map(f => f.productId));
  } catch (error) {
    console.error("GET Favorites Err:", error);
    return NextResponse.json({ message: "Xəta baş verdi" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    return NextResponse.json({ message: "Lütfən daxil olun" }, { status: 401 });
  }

  const userId = (session.user as any).id;

  try {
    const { productId } = await req.json();

    if (!productId) {
      return NextResponse.json({ message: "Məhsul ID-si tələb olunur" }, { status: 400 });
    }

    const existing = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existing) {
      // Unlike
      await prisma.favorite.delete({
        where: { id: existing.id }
      });
      return NextResponse.json({ action: "unliked" }, { status: 200 });
    } else {
      // Like
      await prisma.favorite.create({
        data: {
          userId,
          productId
        }
      });
      return NextResponse.json({ action: "liked" }, { status: 201 });
    }
  } catch (error) {
    console.error("POST Favorites Err:", error);
    return NextResponse.json({ message: "Xəta baş verdi" }, { status: 500 });
  }
}
