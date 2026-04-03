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

const CATEGORIES = [
  { name: "Elektronika", slug: "elektronika", icon: Smartphone },
  { name: "Mebel & Ev", slug: "mebel", icon: Sofa },
  { name: "Geyim", slug: "geyim", icon: Shirt },
  { name: "Parfumeriya", slug: "parfumeriya", icon: Sparkles },
  { name: "Supermarket", slug: "supermarket", icon: ShoppingBag },
];

const PARTNERS = ["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery", "Optimal"];

import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";

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
      {/* Hero Section (Aesthetic Reconstruction: Ultra-Compact & Elegant) */}
      <section className="bg-[#f0fdf4] py-8 sm:py-12 relative overflow-hidden border-b border-green-100/40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none mix-blend-multiply"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-5xl sm:text-7xl md:text-9xl font-black text-white tracking-tighter mb-4 leading-[1.02] drop-shadow-[0_15px_15px_rgba(5,120,80,0.3)] select-none">
            Azərbaycanın ən ağıllı <br className="hidden sm:block" /> alış platforması
          </h1>
          <p className="text-lg sm:text-2xl md:text-3xl text-white mb-0 max-w-4xl mx-auto font-black leading-tight tracking-tight drop-shadow-[0_8px_8px_rgba(5,120,80,0.2)]">
            Milyonlarla məhsul arasından ən ucuzunu tapın. Real endirimləri kəşf edin və hər alışdan kəşbək qazanın.
          </p>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-black text-[#1E3A8A] mb-8 uppercase tracking-[0.2em]">Populyar Kateqoriyalar</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Link key={idx} href={`/search?category=${category.slug}`} className="group flex flex-col items-center justify-center p-8 bg-[#FFFFFF] rounded-3xl border border-gray-100 shadow-sm hover:border-[#1E3A8A]/10 hover:shadow-2xl hover:shadow-[#1E3A8A]/5 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#166534] mb-5 shadow-inner group-hover:bg-[#166534] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center tracking-tight">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Endirimler (Featured Deals) */}
      <section className="py-20 relative z-10 border-y border-gray-100/50 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-[#1E3A8A] flex items-center gap-3 tracking-tight">
                <TrendingDown className="w-8 h-8 text-[#EA580C]" />
                Günlük Təkliflər
              </h2>
              <p className="text-gray-500 mt-2 font-medium">Süni intellekt tərəfindən təsdiqlənmiş real endirimlər</p>
            </div>
            <Link href="/search" className="hidden sm:flex text-[#166534] font-bold items-center hover:text-[#1E3A8A] transition-colors group">
              Hamısına bax <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product: any, idx: number) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                userFavoriteIds={userFavoriteIds} 
                priority={idx === 0} 
              />
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Link href="/search" className="inline-flex items-center justify-center w-full py-4 px-6 border border-gray-200 rounded-2xl text-sm font-bold text-[#1E3A8A] bg-white hover:bg-gray-50 shadow-sm transition-all">
              Hamısına bax
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Stores */}
      <section className="py-20 relative z-10 bg-[#F9FAFB]/50 border-t border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-black text-[#1E3A8A] mb-12 uppercase tracking-[0.3em]">Etibarlı Tərəfdaşlarımız</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="text-xl sm:text-3xl font-black text-gray-400 hover:text-[#1E3A8A] transition-all cursor-pointer select-none">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
