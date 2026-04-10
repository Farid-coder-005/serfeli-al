import Image from "next/image";
import Link from "next/link";
import { Tag } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

export function ProductCard({ 
  product,
  userFavoriteIds = [],
  priority = false
}: { 
  product: any;
  userFavoriteIds?: string[];
  priority?: boolean;
}) {
  const cheapestOffer = product.offers?.length > 0 
    ? product.offers.reduce((p: any, c: any) => p.currentPrice < c.currentPrice ? p : c) 
    : null;
    
  const newPrice = cheapestOffer ? cheapestOffer.currentPrice : 0;
  const oldPrice = newPrice > 0 ? Math.floor(newPrice * 1.15) : 0;
  const storeName = cheapestOffer?.store?.name || "Bilinmir";
  const realDiscount = true; // Placeholder for real discount logic
  const discountPercent = oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;

  return (
    <Link 
      href={`/product/${product.id}`}
      key={product.id} 
      className="bg-[#FFFFFF] rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ease-out group flex flex-col cursor-pointer relative"
    >
      {/* Image & Badge */}
      <div className="relative aspect-square overflow-hidden bg-gray-50/50 flex items-center justify-center p-8">
        <div className="absolute top-4 left-4 z-10">
          {realDiscount ? (
            <span className="inline-flex items-center px-3 py-1.5 rounded-md text-[10px] font-black bg-[#FF5500] text-white shadow-sm uppercase tracking-wider">
              <Tag className="w-3 h-3 mr-1.5" /> REAL ENDİRİM {discountPercent > 0 && `-${discountPercent}%`}
            </span>
          ) : (
            <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black bg-gray-900 text-white uppercase tracking-wider">
               SÜNİ ENDİRİM
            </span>
          )}
        </div>
        <FavoriteButton productId={product.id} initialFavorited={userFavoriteIds.includes(product.id)} className="absolute top-4 right-4" />
        <Image 
          src={product.imageUrl || "/iphone15pro.png"} 
          alt={product.title} 
          width={200} 
          height={200}
          priority={priority}
          className={`object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 mix-blend-multiply`}
        />
      </div>
      
      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">{storeName}</div>
        <h3 className="text-sm font-bold text-[#222222] mb-6 line-clamp-2 leading-relaxed flex-1 group-hover:text-[#FF5500] transition-colors">
          {product.title}
        </h3>
        
        <div className="mt-auto">
          <div className="flex items-center gap-3">
            <span className="text-gray-400 line-through text-sm font-medium">{oldPrice} ₼</span>
            <span className="text-[#222222] font-black text-2xl tracking-tighter">{newPrice} ₼</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
