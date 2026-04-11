import Image from "next/image";
import Link from "next/link";
import {
  Smartphone, Sofa, Shirt, Sparkles, ShoppingBag, 
  ArrowRight, TrendingDown, Tag, Laptop,
  Tv, Headset, Watch, Camera, Coffee,
  ChevronRight
} from "lucide-react";
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

  const shortcuts = [
    { label: "Telefonlar", icon: Smartphone, href: "/search?category=elektronika" },
    { label: "Laptoplar", icon: Laptop, href: "/search?category=elektronika" },
    { label: "TV", icon: Tv, href: "/search?category=elektronika" },
    { label: "Saatlar", icon: Watch, href: "/search?category=elektronika" },
    { label: "Qulaqlıqlar", icon: Headset, href: "/search?category=elektronika" },
    { label: "Kameralar", icon: Camera, href: "/search?category=elektronika" },
    { label: "Mətbəx", icon: Coffee, href: "/search?category=ev-bagca" },
  ];

  const relatedCategories = [
    { label: "Smartfonlar", img: "/iphone15pro.png", href: "#" },
    { label: "Qulaqlıqlar", img: "/iphone15pro.png", href: "#" },
    { label: "Planşetlər", img: "/iphone15pro.png", href: "#" },
    { label: "Ağıllı Saatlar", img: "/iphone15pro.png", href: "#" },
  ];

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      
      {/* 1. Block 1: Circular Shortcuts */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <div className="flex items-center justify-between gap-4 overflow-x-auto no-scrollbar pb-2">
            {shortcuts.map((item, idx) => (
              <Link key={idx} href={item.href} className="flex flex-col items-center gap-2 group shrink-0">
                <div className="w-[70px] h-[70px] rounded-full border-2 border-[#FF5500] flex items-center justify-center bg-white overflow-hidden p-3 transition-transform group-hover:scale-105">
                  <item.icon className="w-8 h-8 text-[#222222]" strokeWidth={1.5} />
                </div>
                <span className="text-[12px] font-bold text-[#222222] text-center uppercase tracking-tight">{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Block 2: Populyar məhsullar (Carousel) */}
      <section className="py-10">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-[22px] font-bold text-[#1a1a1a]">Populyar məhsullar</h2>
            <Link href="/search" className="text-[#005ea8] text-[14px] font-semibold hover:underline">Hamısına bax</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-6 no-scrollbar">
            {products.slice(0, 10).map((p) => (
              <div key={p.id} className="min-w-[260px] md:min-w-[280px] flex-shrink-0 snap-start">
                <ProductCard product={p} userFavoriteIds={userFavoriteIds} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Block 3: Sizin üçün təkliflər (Blue Band Carousel) */}
      <section className="py-12 bg-[#E8F0F8]">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tight">Sizin üçün təkliflər</h2>
          <div className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-10 no-scrollbar">
            {products.slice(10, 20).map((p) => (
              <div key={p.id} className="min-w-[260px] md:min-w-[280px] flex-shrink-0 snap-start">
                <ProductCard product={p} userFavoriteIds={userFavoriteIds} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <Link href="/search" className="bg-[#005ea8] text-white px-8 py-3 rounded-sm font-bold text-[15px] hover:bg-[#004b86] transition-colors">
              Bütün təkliflərə bax
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Block 4: Bestsellerləri kəşf edin (New Carousel) */}
      <section className="py-12 border-b border-gray-100">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <div className="flex justify-between items-baseline mb-6">
            <h2 className="text-[22px] font-bold text-[#1a1a1a]">Bestsellerləri kəşf edin</h2>
            <Link href="/search" className="text-[#005ea8] text-[14px] font-semibold hover:underline">Daha çox</Link>
          </div>
          <div className="flex gap-4 overflow-x-auto snap-x scroll-smooth pb-6 no-scrollbar">
            {products.slice(20, 30).map((p) => (
              <div key={p.id} className="min-w-[260px] md:min-w-[280px] flex-shrink-0 snap-start">
                <ProductCard product={p} userFavoriteIds={userFavoriteIds} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Block 5: Related Categories */}
      <section className="py-12">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <h2 className="text-[22px] font-bold text-[#1a1a1a] mb-6 font-primary">Əlaqəli kateqoriyalar</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedCategories.map((cat, idx) => (
              <Link 
                key={idx} 
                href={cat.href} 
                className="bg-gray-100 rounded-md p-4 flex items-center justify-between h-[100px] group overflow-hidden relative"
              >
                <div className="flex flex-col z-10">
                  <span className="text-[15px] font-bold text-[#1a1a1a] group-hover:text-[#005ea8] transition-colors">{cat.label}</span>
                  <div className="mt-1 flex items-center text-[11px] text-[#005ea8] font-bold">
                    Keçid <ChevronRight className="w-3 h-3 ml-0.5" />
                  </div>
                </div>
                <div className="relative w-20 h-20 -right-2 top-2 shrink-0 opacity-80 group-hover:opacity-100 transition-opacity">
                   <Image src={cat.img} alt={cat.label} fill className="object-contain object-right" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}


