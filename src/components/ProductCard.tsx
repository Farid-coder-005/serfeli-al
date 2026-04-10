import Image from "next/image";
import Link from "next/link";
import { Tag, Star, Heart } from "lucide-react";
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
  const realDiscount = true;
  const discountPercent = oldPrice > 0 ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;
  
  // Mocking rating for visual accuracy
  const rating = 4.5;
  const reviewCount = 124;

  return (
    <div className="bg-white border border-gray-200 rounded-md hover:border-gray-300 transition-all group relative flex flex-col h-full">
      {/* 1. Top Level Badges */}
      <div className="absolute top-2 left-0 z-10 flex flex-col gap-1 items-start">
        {realDiscount && (
          <div className="bg-[#FF5500] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r-sm">
            -{discountPercent}%
          </div>
        )}
        <div className="bg-[#008a00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r-sm">
          A
        </div>
      </div>

      <div className="absolute top-2 right-2 z-10 text-[#005ea8]">
         <FavoriteButton productId={product.id} initialFavorited={userFavoriteIds.includes(product.id)} />
      </div>

      <Link 
        href={`/product/${product.id}`}
        className="flex flex-col flex-1 p-3"
      >
        {/* 2. Middle: Large Centered Image */}
        <div className="w-full h-[180px] relative flex items-center justify-center mb-3">
          <Image 
            src={product.imageUrl || "/iphone15pro.png"} 
            alt={product.title} 
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={priority}
            className="object-contain p-2 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* 3. Bottom Info */}
        <div className="flex flex-col flex-1">
          {/* Tag & Category */}
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-bold text-[#005ea8] bg-[#E8F0F8] px-1 rounded-sm">Bestseller</span>
            <span className="text-[10px] text-gray-400 font-medium truncate">{product.category}</span>
          </div>

          {/* Title */}
          <h3 className="text-[14px] font-semibold text-[#1a1a1a] line-clamp-2 leading-[1.4] mb-1 group-hover:text-[#005ea8] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-[#ffcc00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < 4 ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[11px] text-gray-400 font-medium">{rating} ({reviewCount})</span>
          </div>
          
          {/* Price Area */}
          <div className="mt-auto pt-2 flex flex-col">
            <span className="text-[11px] text-gray-500 font-medium mb-[-2px]">from</span>
            <div className="flex items-baseline gap-1">
              <span className="text-[20px] sm:text-[22px] font-bold text-[#FF5500] tracking-tight leading-tight">
                {newPrice.toLocaleString('az-AZ', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[16px] font-bold text-[#FF5500]">₼</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

