import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { HomeContent } from "@/components/HomeContent";

export default async function Page() {
  const products = await prisma.product.findMany({ 
    include: { offers: { include: { store: true } } } 
  });
  
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }

  return (
    <HomeContent 
      products={products} 
      userFavoriteIds={userFavoriteIds} 
    />
  );
}
