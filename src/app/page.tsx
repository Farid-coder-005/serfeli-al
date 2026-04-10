import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Sofa,
  Shirt,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  TrendingDown,
  Tag
} from "lucide-react";

const TRENDING_SEARCHES = [
  "iPhone 15 Pro", "Kondisionerlər", "PlayStation 5", "Dyson Saç Qurudan", "AirPods Pro"
];

const PARTNERS = ["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery", "Optimal"];

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";

export default async function Page() {
  const products = await prisma.product.findMany({ 
    include: { offers: { include: { store: true } } } 
  });
  
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }
  return (
    <div className="flex flex-col w-full bg-[#F4F4F4] min-h-screen">
      {/* Category Grid Section */}
      <section className="pt-8 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl sm:text-3xl font-black text-[#222222] mb-6 sm:mb-8">Kategoriyaları kəşf et</h1>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link href="/search?category=elektronika" className="bg-white p-6 rounded-sm border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all flex flex-col items-center text-center gap-3 group">
              <Smartphone className="w-10 h-10 text-[#222222] group-hover:text-[#FF5500] transition-colors" strokeWidth={1.5} />
              <span className="font-bold text-[15px] text-[#222222] group-hover:underline">Elektronika & Texnologiya</span>
            </Link>
            <Link href="/search?category=ev-bagca" className="bg-white p-6 rounded-sm border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all flex flex-col items-center text-center gap-3 group">
              <Sofa className="w-10 h-10 text-[#222222] group-hover:text-[#FF5500] transition-colors" strokeWidth={1.5} />
              <span className="font-bold text-[15px] text-[#222222] group-hover:underline">Ev və Bağça</span>
            </Link>
            <Link href="/search?category=moda" className="bg-white p-6 rounded-sm border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all flex flex-col items-center text-center gap-3 group">
              <Shirt className="w-10 h-10 text-[#222222] group-hover:text-[#FF5500] transition-colors" strokeWidth={1.5} />
              <span className="font-bold text-[15px] text-[#222222] group-hover:underline">Geyim və Moda</span>
            </Link>
            <Link href="/search?category=idman" className="bg-white p-6 rounded-sm border border-gray-200 hover:shadow-sm hover:border-gray-300 transition-all flex flex-col items-center text-center gap-3 group">
              <TrendingDown className="w-10 h-10 text-[#222222] group-hover:text-[#FF5500] transition-colors" strokeWidth={1.5} />
              <span className="font-bold text-[15px] text-[#222222] group-hover:underline">Top Deals & Təkliflər</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Top Deals Section */}
      <section className="py-12 bg-white border-y border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
             <h2 className="text-2xl font-black text-[#222222]">Aktual Endirimlər</h2>
             <Link href="/search" className="text-[#005ea8] font-bold hover:underline flex items-center gap-1 text-[15px]">
               Bütün endirimlər <ArrowRight className="w-4 h-4" />
             </Link>
          </div>
          <ProductGrid products={products.slice(0, 4)} userFavoriteIds={userFavoriteIds} />
        </div>
      </section>

      {/* Trending Searches */}
      <section className="py-10 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-lg font-bold text-[#222222] mb-4">Ən çox axtarılanlar</h3>
          <div className="flex flex-wrap gap-2">
            {TRENDING_SEARCHES.map((tag) => (
              <Link 
                key={tag} 
                href={`/search?q=${encodeURIComponent(tag)}`}
                className="px-4 py-2 bg-white border border-gray-200 text-[#005ea8] text-[13px] hover:underline hover:border-gray-300 transition-all"
              >
                {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Stores */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-sm font-bold text-gray-400 mb-8 uppercase tracking-widest">Mağazalarımız</h2>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12 grayscale opacity-60">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="text-lg sm:text-2xl font-black text-gray-800 select-none">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
