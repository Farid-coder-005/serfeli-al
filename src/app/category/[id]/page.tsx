"use client";

import Link from "next/link";
import { useRef } from "react";
import { ProductCard } from "@/components/ProductCard";
import { ChevronLeft, ChevronRight } from "lucide-react";

const SUB_CATEGORIES = [
  {
    title: "Kompüterlər",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop",
    links: ["Noutbuklar", "Masaüstü kompüterlər", "Planşetlər", "Monitorlar"]
  },
  {
    title: "Mobil Telefonlar",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2680&auto=format&fit=crop",
    links: ["Smartfonlar", "Düyməli telefonlar", "Aksesuarlar", "Powerbank-lar"]
  },
  {
    title: "Audio və Video",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
    links: ["Qulaqlıqlar", "Dinamiklər", "Televizorlar", "Ev kinoteatrları"]
  },
  {
    title: "Foto və Kamera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2672&auto=format&fit=crop",
    links: ["Fotoaparatlar", "Video kameralar", "Obyektivlər", "Ştativlər"]
  }
];

const BESTSELLERS = [
  {
    id: "b1",
    title: "iPhone 15 Pro 256GB Natural Titanium",
    category: "Smartfonlar",
    imageUrl: "https://placehold.co/400x400/png?text=iPhone+15+Pro",
    offers: [{ currentPrice: 2849, store: { name: "Kontakt Home" } }]
  },
  {
    id: "b2",
    title: "MacBook Air 13 M2 8GB/256GB - Space Gray",
    category: "Noutbuklar",
    imageUrl: "https://placehold.co/400x400/png?text=MacBook+Air",
    offers: [{ currentPrice: 2199, store: { name: "Irsad" } }]
  },
  {
    id: "b3",
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Qulaqlıqlar",
    imageUrl: "https://placehold.co/400x400/png?text=Sony+WH-1000XM5",
    offers: [{ currentPrice: 649, store: { name: "Baku Electronics" } }]
  },
  {
    id: "b4",
    title: "Apple Watch Ultra 2",
    category: "Smart Saatlar",
    imageUrl: "https://placehold.co/400x400/png?text=Apple+Watch+Ultra",
    offers: [{ currentPrice: 1749, store: { name: "Kontakt Home" } }]
  }
];

const DEALS = [
  ...BESTSELLERS,
  {
    id: "d1",
    title: "Samsung Galaxy S24 Ultra 512GB",
    category: "Smartfonlar",
    imageUrl: "https://placehold.co/400x400/png?text=Galaxy+S24+Ultra",
    offers: [{ currentPrice: 2459, store: { name: "Kontakt Home" } }]
  },
  {
    id: "d2",
    title: "PlayStation 5 Slim Edition",
    category: "Oyun Konsolları",
    imageUrl: "https://placehold.co/400x400/png?text=PS5+Slim",
    offers: [{ currentPrice: 1149, store: { name: "Music Gallery" } }]
  }
];

export default function CategoryPage() {
  const bestSellerRef = useRef<HTMLDivElement | null>(null);
  const dealsRef = useRef<HTMLDivElement | null>(null);

  const scroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      ref.current.scrollBy({ left: direction === 'left' ? -320 : 320, behavior: 'smooth' });
    }
  };

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8 bg-white">
      {/* 1. Breadcrumbs & Title */}
      <div className="text-sm text-gray-500 mb-4 px-1">Ana Səhifə {'>'} Elektronika</div>
      <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-10 px-1">Elektronika</h1>

      {/* 2. Sub-Category 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
         {SUB_CATEGORIES.map((cat, i) => (
           <div key={i} className="group cursor-pointer">
             <div className="h-48 bg-gray-50 mb-4 flex items-center justify-center rounded-xl overflow-hidden border border-gray-100 group-hover:border-[#005ea8] transition-all">
               <img 
                 src={cat.image} 
                 alt={cat.title} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
               />
             </div>
             <h3 className="text-xl font-bold border-b border-gray-100 pb-2 mb-3 text-[#1a1a1a] group-hover:text-[#005ea8] transition-colors flex justify-between items-center">
               {cat.title} <span>{'>'}</span>
             </h3>
             <ul className="space-y-2">
                {cat.links.map((link, j) => (
                  <li key={j} className="text-sm text-gray-600 hover:text-[#005ea8] transition-colors cursor-pointer">
                    <Link href={`/products/${link.toLowerCase().replace(/ /g, '-').normalize("NFD").replace(/[\u0300-\u036f]/g, "")}`}>
                      {link}
                    </Link>
                  </li>
                ))}
             </ul>
           </div>
         ))}
      </div>

      {/* 3. Bestsellers Carousel */}
      <div className="relative group mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">"Elektronika" bölməsində ən çox satılanlar</h2>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => scroll(bestSellerRef, 'left')} 
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#FF5500] hover:bg-white hover:shadow-md rounded-full cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll(bestSellerRef, 'right')} 
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#FF5500] hover:bg-white hover:shadow-md rounded-full cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={bestSellerRef} 
            className="flex gap-4 overflow-x-auto snap-x pb-6 no-scrollbar"
          >
            {BESTSELLERS.map((product) => (
               <div key={product.id} className="min-w-[280px] md:min-w-[300px] flex-none snap-start">
                 <ProductCard product={product} />
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. Deals Carousel */}
      <div className="relative group mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold">"Elektronika" bölməsində təkliflər</h2>
        </div>

        <div className="relative">
          <button 
            onClick={() => scroll(dealsRef, 'left')} 
            className="absolute -left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#FF5500] hover:bg-white hover:shadow-md rounded-full cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={() => scroll(dealsRef, 'right')} 
            className="absolute -right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 text-[#FF5500] hover:bg-white hover:shadow-md rounded-full cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          <div 
            ref={dealsRef} 
            className="flex gap-4 overflow-x-auto snap-x pb-6 no-scrollbar"
          >
            {DEALS.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[300px] flex-none snap-start">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
