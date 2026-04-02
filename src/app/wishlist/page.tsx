import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { Heart, Tag, ArrowRight, ShoppingBag } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

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
    <div className="w-full flex-1 bg-[#F9FAFB] flex flex-col relative overflow-hidden z-0 min-h-[calc(100vh-96px)]">
      {/* Background patterns */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

      <div className="bg-white/70 backdrop-blur-md border-b border-gray-100/50 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E3A8A] tracking-tight flex items-center gap-3">
              <Heart className="w-8 h-8 text-[#EA580C] stroke-[#EA580C]" fill="currentColor" /> İstək Siyahısı
            </h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">Bəyəndiyiniz və yadda saxladığınız məhsullar</p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 relative z-10 flex flex-col">
        {favorites.length === 0 ? (
          <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl flex-1 flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Heart className="w-12 h-12 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">İstək siyahınız boşdur</h3>
            <p className="text-gray-400 max-w-sm mx-auto mb-8 font-medium">Siz hələ heç bir məhsulu bəyənməmisiniz. Məhsulları kəşf edərək onları istək siyahınıza əlavə edin.</p>
            <Link href="/" className="inline-flex items-center gap-2 bg-[#057850] text-white px-8 py-4 rounded-full font-black uppercase tracking-widest hover:-translate-y-1 hover:shadow-lg hover:shadow-green-900/20 transition-all">
              Kəşf Etməyə Başla <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {favorites.map((fave) => {
              const product = fave.product;
              const cheapestOffer = product.offers?.length > 0 
                ? product.offers.reduce((p: any, c: any) => p.currentPrice < c.currentPrice ? p : c) 
                : null;
                
              const newPrice = cheapestOffer ? cheapestOffer.currentPrice : 0;
              const oldPrice = newPrice > 0 ? Math.floor(newPrice * 1.15) : 0;
              const storeName = cheapestOffer?.store?.name || "Bilinmir";

              return (
                <Link 
                  href={`/product/${product.id}`}
                  key={product.id} 
                  className="bg-[#FFFFFF] rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-[#1E3A8A]/10 hover:border-[#1E3A8A]/10 hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col cursor-pointer relative"
                >
                  <FavoriteButton productId={product.id} initialFavorited={true} className="absolute top-4 right-4" />
                  
                  {/* Image & Badge */}
                  <div className="relative aspect-square overflow-hidden bg-gray-50/50 flex items-center justify-center p-8">
                    <Image 
                      src={product.imageUrl || "/iphone15pro.png"} 
                      alt={product.title} 
                      width={200} 
                      height={200}
                      className="object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 mix-blend-multiply"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">{storeName}</div>
                    <h3 className="text-sm font-bold text-[#1E3A8A] mb-6 line-clamp-2 leading-relaxed flex-1 group-hover:text-[#166534] transition-colors">
                      {product.title}
                    </h3>
                    
                    <div className="mt-auto">
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400 line-through text-sm font-medium">{oldPrice > 0 ? `${oldPrice} ₼` : ''}</span>
                        <span className="text-[#EA580C] font-black text-2xl tracking-tighter">{newPrice > 0 ? `${newPrice} ₼` : 'Tükənib'}</span>
                      </div>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        )}
      </div>
    </div>
  );
}
