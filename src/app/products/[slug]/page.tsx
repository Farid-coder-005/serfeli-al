import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import FilterSidebar from '@/components/FilterSidebar';

// Real generic products with high-quality placeholder URLs
const genericElectronicProducts = [
  { 
    id: 1, 
    name: "Apple iPhone 15 Pro", 
    price: "2489.00", 
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=600&auto=format&fit=crop", 
    specs: "5G, 6.1 inch, 120Hz, 8GB RAM, 256GB Storage", 
    offers: "120 təklif" 
  },
  { 
    id: 2, 
    name: "Samsung Galaxy S24 Ultra", 
    price: "2799.00", 
    image: "https://images.unsplash.com/photo-1707291143890-71172a1e355c?q=80&w=600&auto=format&fit=crop", 
    specs: "5G, 6.8 inch, 120Hz, 12GB RAM, 512GB Storage", 
    offers: "85 təklif" 
    },
  { 
    id: 3, 
    name: "Xiaomi 14 Pro", 
    price: "1899.00", 
    image: "https://images.unsplash.com/photo-1709292817812-7da4eb8bd853?q=80&w=600&auto=format&fit=crop", 
    specs: "5G, 6.7 inch, 120Hz, 12GB RAM, 256GB Storage", 
    offers: "45 təklif" 
    },
  { 
    id: 4, 
    name: "Apple MacBook Pro 14 M3", 
    price: "3650.00", 
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=600&auto=format&fit=crop", 
    specs: "M3 chip, 14.2 inch, 16GB RAM, 512GB SSD", 
    offers: "95 təklif" 
  },
  { 
    id: 5, 
    name: "Dell XPS 15 9530", 
    price: "2999.00", 
    image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?q=80&w=600&auto=format&fit=crop", 
    specs: "Intel i9, 15.6 inch 4K, 32GB RAM, 1TB SSD", 
    offers: "66 təklif" 
  },
  { 
    id: 6, 
    name: "Sony WH-1000XM5", 
    price: "649.00", 
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?q=80&w=600&auto=format&fit=crop", 
    specs: "Noise Cancelling, Bluetooth, 30hr Battery", 
    offers: "110 təklif" 
  }
];

export default function ProductListingPage() {

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8">
      {/* 1. Master Container (Standard 1200px) */}
      <div className="w-full">
         {/* Top Header */}
         <div className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:underline">Ana Səhifə</Link> {'>'} Elektronika {'>'} Məhsullar</div>
         <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-4">
           <h1 className="text-3xl font-bold text-[#222222]">Məhsullar <span className="text-gray-500 text-lg font-normal">({genericElectronicProducts.length})*</span></h1>
           <div className="flex items-center gap-1 text-sm cursor-pointer border-b border-gray-400 pb-1 hover:text-[#FF5500]">
              Ən populyarlar <ChevronDown className="w-4 h-4" />
           </div>
         </div>

         <div className="flex flex-col md:flex-row gap-6">
           <FilterSidebar />

           {/* 3. RIGHT MAIN CONTENT (GRID) - CRITICAL SPACING FIX */}
           <section className="w-full md:w-3/4">
              {/* Standard 3-column static grid with tight spacing (gap-1 max) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-1 border-t border-l border-gray-200">
                 {genericElectronicProducts.map(product => (
                   <div key={product.id} className="border-r border-b border-gray-200 p-3 flex flex-col relative hover:shadow-xl transition-shadow bg-white h-full">
                      {/* Image - object-contain prevents stretching */}
                      <img src={product.image} alt={product.name} className="h-40 w-full object-contain mb-3 mt-1" />
                      
                      <div className="flex flex-col flex-grow">
                         <h3 className="font-bold text-[#222222] text-sm mb-1 hover:underline cursor-pointer leading-tight">{product.name}</h3>
                         <p className="text-xs text-gray-600 mb-4 leading-tight">{product.specs}</p>
                      </div>
                      
                      <div className="mt-auto pt-2 border-t border-gray-100">
                         <div className="text-xs text-gray-500 mb-1">{product.offers}</div>
                         
                         {/* Price & Typography Fix */}
                         <div className="flex items-baseline gap-1 mb-1">
                           <span className="text-xs text-gray-500">from</span>
                           <span className="text-3xl font-extrabold text-[#FF5500] tracking-tight">{product.price} ₼</span>
                         </div>
                         
                         <Link 
                            href={`/product/${product.id}`}
                            className="text-[#005ea8] text-xs font-bold mt-2 flex items-center gap-1 cursor-pointer hover:underline"
                         >
                            <span className="text-sm leading-none">↗</span> Məhsul detalları
                         </Link>
                      </div>
                   </div>
                 ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-end items-stretch mt-0 border-t border-gray-200">
                 <div className="flex items-center text-[#005ea8] text-lg mr-6 gap-5 py-4">
                    <button className="text-3xl hover:text-[#004a87] transition-colors leading-none -mt-1">&#8249;</button>
                    <button className="hover:underline">1</button>
                    <button className="text-[#222222]">2</button>
                    <button className="hover:underline">3</button>
                    <span className="text-[#222222]">...</span>
                    <button className="hover:underline">5</button>
                 </div>
                 <button className="bg-[#005ea8] text-white px-6 hover:bg-[#004a87] transition-colors flex items-center justify-center cursor-pointer">
                    <span className="text-3xl leading-none -mt-1">&#8250;</span>
                 </button>
              </div>
           </section>
         </div>
      </div>
    </main>
  );
}
