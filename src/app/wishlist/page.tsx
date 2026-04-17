import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Heart, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";
import { ProductGrid } from "@/components/ProductGrid";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user || !(session.user as any).id) {
    redirect("/login");
  }

  const userId = (session.user as any).id;

  const favorites = await prisma.favorite.findMany({
    where: { userId },
    include: {
      product: {
        include: {
          offers: { include: { store: true } }
        }
      }
    },
    orderBy: { createdAt: 'desc' }
  });

  return (
    <div className="w-full flex-1 bg-[#F9FAFB] flex flex-col relative z-0 min-h-[calc(100vh-96px)]">
      {/* Background patterns */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

      <div className="bg-white/70 backdrop-blur-md border-b border-gray-100/50 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#0F172A] tracking-tight flex items-center gap-3 uppercase">
              <Heart className="w-8 h-8 text-[#FF6B00] stroke-[#FF6B00]" fill="currentColor" /> İstək Siyahısı
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">Bəyəndiyiniz və yadda saxladığınız məhsullar</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 relative z-10 flex flex-col">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-orange-50/50 rounded-full flex items-center justify-center mx-auto mb-6 border-2 border-orange-100">
              <Heart className="w-12 h-12 text-[#0F172A] opacity-20" />
            </div>
            <h3 className="text-2xl font-black text-[#0F172A] mb-4 uppercase tracking-tight">İstək siyahınız boşdur</h3>
            <p className="text-gray-400 max-w-sm mx-auto mb-10 font-medium italic">Siz hələ heç bir məhsulu bəyənməmisiniz. Məhsulları kəşf edərək onları istək siyahınıza əlavə edin.</p>
            <Link href="/" className="px-10 py-4 bg-[#FF6B00] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#E64D00] active:scale-[0.98] uppercase tracking-wider shadow-lg shadow-orange-500/20">
              KƏŞF ETMƏYƏ BAŞLA <ArrowRight size={20} />
            </Link>
          </div>
        ) : (
          <ProductGrid 
            products={favorites.map(f => f.product)} 
            userFavoriteIds={favorites.map(f => f.product.id)} 
          />
        )}
      </div>
    </div>
  );
}
