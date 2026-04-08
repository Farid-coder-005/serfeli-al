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
    <div className="fixed top-0 left-0 right-0 z-[100] bg-white/90 backdrop-blur-xl border-b border-gray-100 shadow-xl shadow-gray-200/20 animate-in fade-in slide-in-from-top-full duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 min-w-0">
          <div className="w-12 h-12 rounded-xl bg-gray-50 border border-gray-100 flex items-center justify-center shrink-0 p-1">
            <Image
              src={productImage}
              alt={productName}
              width={48}
              height={48}
              className="object-contain w-full h-full mix-blend-multiply"
            />
          </div>
          <h2 className="text-sm sm:text-base font-black text-slate-800 truncate">
            {productName}
          </h2>
        </div>

        <div className="flex items-center gap-6 shrink-0">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Ən Ucuz Qiymət</span>
            <span className="text-xl font-black text-[#057850] tracking-tighter leading-none">{price} ₼</span>
          </div>
          <a
            href={ctaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 sm:px-8 py-3 bg-[#057850] text-white rounded-2xl text-[12px] font-black uppercase tracking-widest hover:bg-[#046241] transition-all shadow-lg shadow-green-900/20 active:scale-95"
          >
            Mağazaya Keç
            <ExternalLink className="w-3.5 h-3.5 opacity-80" />
          </a>
        </div>
      </div>
    </div>
  );
}
