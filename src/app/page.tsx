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
    <div className="flex flex-col w-full relative">
      {/* Global dot-grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-40" />
      {/* Global mesh gradient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 -right-48 w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(15,23,70,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="absolute -bottom-32 left-1/3 w-[360px] h-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      {/* Hero Section */}
      <section className="bg-white py-12 sm:py-20 relative border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black text-[#222222] tracking-tighter mb-4 leading-[1.1] select-none">
            Azərbaycanın ən ağıllı <br className="hidden sm:block" /> alış platforması
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-500 mb-0 max-w-4xl mx-auto font-bold leading-relaxed tracking-tight">
            Milyonlarla məhsul arasından ən ucuzunu tapın. Real endirimləri kəşf edin və hər alışdan kəşbək qazanın.
          </p>
        </div>
      </section>

      {/* Section 1: Trend Olan Axtarışlar */}
      <section className="py-12 relative z-10 border-b border-gray-100 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <span className="text-[13px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Trend Axtarışlar:</span>
            <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-2 sm:pb-0 w-full">
              {TRENDING_SEARCHES.map((tag) => (
                <Link 
                  key={tag} 
                  href={`/search?q=${encodeURIComponent(tag)}`}
                  className="px-5 py-2.5 bg-gray-100 hover:bg-[#FF5500] hover:text-white text-gray-600 text-[13px] font-bold rounded-full transition-all duration-300 whitespace-nowrap shadow-sm hover:shadow-md active:scale-95"
                >
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Günün Real Endirimləri */}
      <section className="py-24 relative z-10 bg-[#F8FAFC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-16">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-50 rounded-full">
                <Tag className="w-4 h-4 text-[#FF5500]" />
                <span className="text-[11px] font-black text-[#FF5500] uppercase tracking-widest leading-none">Məhdud Təkliflər</span>
              </div>
              <h2 className="text-4xl sm:text-5xl font-black text-[#222222] tracking-tight">
                🔥 Günün <span className="text-[#FF5500]">Real</span> Endirimləri
              </h2>
              <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-2xl">
                Platformamız tərəfindən təsdiqlənmiş, qiyməti son 24 saatda ən çox düşən təkrarolunmaz təkliflər.
              </p>
            </div>
            <Link href="/search" className="hidden lg:flex items-center gap-3 px-8 py-4 bg-white border border-gray-200 rounded-2xl text-[13px] font-black text-[#222222] hover:bg-gray-50 transition-all shadow-sm hover:shadow-lg group">
              Hamısına bax <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
 
          <ProductGrid products={products.slice(0, 4)} userFavoriteIds={userFavoriteIds} />
 
          <div className="mt-16 text-center lg:hidden">
            <Link href="/search" className="inline-flex items-center justify-center w-full py-5 px-8 bg-white border border-gray-200 rounded-[2rem] text-sm font-black text-[#222222] shadow-sm active:scale-95 transition-all">
              Bütün endirimləri gör
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Stores */}
      <section className="py-20 relative z-10 bg-[#F9FAFB]/50 border-t border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-black text-gray-500 mb-12 uppercase tracking-[0.3em]">Etibarlı Tərəfdaşlarımız</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="text-xl sm:text-3xl font-black text-gray-400 hover:text-[#222222] transition-all cursor-pointer select-none">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
