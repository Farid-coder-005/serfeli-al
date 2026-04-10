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
    <div className="bg-white border border-gray-200 hover:shadow-md hover:border-gray-300 transition-shadow duration-200 group relative flex flex-col">
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5">
        {realDiscount ? (
          <span className="bg-[#FF5500] text-white text-[11px] font-bold px-2 py-0.5 rounded-sm">
            Endirim {discountPercent > 0 && `-${discountPercent}%`}
          </span>
        ) : null}
      </div>
      <div className="absolute top-3 right-3 z-10">
         <FavoriteButton productId={product.id} initialFavorited={userFavoriteIds.includes(product.id)} />
      </div>

      <Link 
        href={`/product/${product.id}`}
        className="flex flex-col flex-1 p-4"
      >
        {/* Top: Image */}
        <div className="w-full h-[220px] relative flex items-center justify-center mb-4">
          <Image 
            src={product.imageUrl || "/iphone15pro.png"} 
            alt={product.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        {/* Middle: Brand + Title */}
        <div className="flex flex-col mb-4">
          <span className="text-[12px] text-gray-500 mb-1 font-medium">{storeName}</span>
          <h3 className="text-[15px] font-bold text-[#005ea8] group-hover:underline line-clamp-2 leading-snug">
            {product.title}
          </h3>
        </div>
        
        {/* Bottom: Massive Price */}
        <div className="mt-auto pt-2 flex flex-col">
          {oldPrice > 0 && (
            <span className="text-[12px] text-gray-400 line-through mb-0.5">
              {oldPrice} ₼
            </span>
          )}
          <span className="text-[22px] sm:text-[24px] font-black text-[#222222] tracking-tighter leading-none">
            {newPrice} ₼
          </span>
        </div>
      </Link>
    </div>
  );
}
