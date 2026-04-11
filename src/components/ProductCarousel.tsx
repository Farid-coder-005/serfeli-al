"use client";

import { useRef } from 'react';
import { ProductCard } from '@/components/ProductCard';

interface ProductCarouselProps {
  products: any[];
  userFavoriteIds: string[];
}

export function ProductCarousel({ products, userFavoriteIds }: ProductCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: direction === 'left' ? -300 : 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="relative group w-full">
      {/* Left Arrow Button */}
      <button 
        onClick={() => scroll('left')} 
        className="absolute -left-2 sm:-left-5 top-[40%] -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-lg rounded-full w-10 h-10 hidden md:flex items-center justify-center text-[#FF5500] text-3xl hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
      >
        &#8249;
      </button>

      {/* Scrollable Track */}
      <div 
        ref={scrollRef} 
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory scroll-smooth pb-6 w-full" 
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
         {products.map((p) => (
            <div key={p.id} className="flex-none w-[260px] md:w-[280px] snap-start">
               {/* Note: I'm not adding isBestseller to ProductCard since it wasn't requested in its interface earlier, but it maps the products correctly */}
               <ProductCard product={p} userFavoriteIds={userFavoriteIds} />
            </div>
         ))}
      </div>

      {/* Right Arrow Button */}
      <button 
        onClick={() => scroll('right')} 
        className="absolute -right-2 sm:-right-5 top-[40%] -translate-y-1/2 z-10 bg-white border border-gray-200 shadow-lg rounded-full w-10 h-10 hidden md:flex items-center justify-center text-[#FF5500] text-3xl hover:scale-105 transition-all opacity-0 group-hover:opacity-100"
      >
        &#8250;
      </button>
    </div>
  );
}
