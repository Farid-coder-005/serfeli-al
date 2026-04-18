"use client";

import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { FavoriteButton } from "@/components/FavoriteButton";

export default function DetailedProductCard({ 
  product,
  userFavoriteIds = []
}: { 
  product: any;
  userFavoriteIds?: string[];
}) {
  const cheapestOffer = product.offers?.length > 0 
    ? product.offers.reduce((p: any, c: any) => p.currentPrice < c.currentPrice ? p : c) 
    : null;
    
  const newPrice = cheapestOffer ? cheapestOffer.currentPrice : 0;
  const oldPrice = product.oldPrice || 0;
  const storeName = cheapestOffer?.store?.name || "Bilinmir";
  const discountPercent = oldPrice > newPrice ? Math.round(((oldPrice - newPrice) / oldPrice) * 100) : 0;
  
  // Mocking details for visual accuracy
  const rating = 4.7;
  const reviewCount = Math.floor(Math.random() * 500) + 50;
  const offerCount = Math.floor(Math.random() * 50) + 5;
  const description = product.description || "Yüksək performanslı prosessor, uzunömürlü batareya və möhtəşəm kamera sistemi ilə təmin olunub.";

  return (
    <div className="bg-white border-r border-b border-gray-200 p-4 hover:shadow-xl transition-all group relative flex flex-col h-full min-h-[450px]">
      {/* Badges */}
      <div className="absolute top-2 left-0 z-10 flex flex-col gap-1 items-start">
        {oldPrice > newPrice && (
          <div className="bg-[#FF6B00] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-r-sm shadow-sm">
            -{discountPercent}%
          </div>
        )}
      </div>

      {/* Favorite Button */}
      <div className="absolute top-4 right-4 z-10 text-[#002B55]">
         <FavoriteButton productId={product.id} initialFavorited={userFavoriteIds.includes(product.id)} />
      </div>

      <Link href={`/product/${product.id}`} className="flex flex-col flex-1">
        {/* Image Section */}
        <div className="w-full h-[200px] relative flex items-center justify-center mb-4">
          <Image 
            src={product.imageUrl || "/iphone15pro.png"} 
            alt={product.title} 
            fill
            className="object-contain p-4 transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        {/* Info Section */}
        <div className="flex flex-col flex-1">
          {/* Brand/Category */}
          <span className="text-[12px] text-[#1E293B] font-medium mb-1 uppercase tracking-wider">{product.category}</span>

          {/* Title */}
          <h3 className="text-[16px] font-bold text-[#1a1a1a] line-clamp-2 leading-snug mb-2 group-hover:text-[#002B55] transition-colors">
            {product.title}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1 mb-3">
            <div className="flex text-[#ffcc00]">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-current' : 'fill-gray-200 text-gray-200'}`} />
              ))}
            </div>
            <span className="text-[12px] text-[#1E293B] font-medium">{rating} ({reviewCount})</span>
          </div>

          {/* Description */}
          <p className="text-[13px] text-gray-600 line-clamp-3 mb-4 leading-relaxed">
            {description}
          </p>
          
          {/* Offer Count */}
          <div className="mb-4">
            <span className="text-[12px] font-bold text-[#1E293B]">{offerCount} təklif</span>
          </div>

          {/* Price Area */}
          <div className="mt-auto pt-4 flex flex-col">
            <div className="flex items-baseline gap-1">
              <span className="text-[24px] font-extrabold text-[#FF6B00] tracking-tight">
                {newPrice.toLocaleString('az-AZ', { minimumFractionDigits: 2 })}
              </span>
              <span className="text-[18px] font-bold text-[#FF6B00]">₼</span>
            </div>
            <span className="text-[12px] text-[#1E293B] mt-1">Mağaza: <span className="font-semibold text-gray-700">{storeName}</span></span>
          </div>
        </div>
      </Link>

      {/* Detail Link Footer */}
      <div className="mt-4 pt-4 border-t border-gray-50">
        <Link 
          href={`/product/${product.id}`}
          className="text-[13px] font-bold text-[#002B55] hover:underline flex items-center gap-1"
        >
          ↗ Məhsul detalları
        </Link>
      </div>
    </div>
  );
}
