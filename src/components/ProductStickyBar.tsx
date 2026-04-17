"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ExternalLink } from "lucide-react";

interface ProductStickyBarProps {
  productName: string;
  productImage: string;
  price: number;
  ctaUrl: string;
}

export default function ProductStickyBar({
  productName,
  productImage,
  price,
  ctaUrl,
}: ProductStickyBarProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past hero section (~600px)
      if (window.scrollY > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] bg-white/95 backdrop-blur-xl border-b border-gray-100 shadow-xl shadow-slate-200/10 animate-in fade-in slide-in-from-top-full duration-500">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-10 h-10 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-1">
            <Image
              src={productImage}
              alt={productName}
              width={40}
              height={40}
              className="object-contain w-full h-full mix-blend-multiply"
            />
          </div>
          <h2 className="text-sm font-black text-slate-700 truncate">
            {productName}
          </h2>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Cari Qiymət</span>
            <span className="text-lg font-black text-[#FF5500] tracking-tighter leading-none">{price} ₼</span>
          </div>
          <a 
            href={ctaUrl.startsWith('http') ? ctaUrl : `https://${ctaUrl}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-2.5 bg-[#FF5500] hover:bg-[#E04A00] text-white rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm"
          >
            Mağazaya Keç
            <ExternalLink className="w-3 h-3 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}

