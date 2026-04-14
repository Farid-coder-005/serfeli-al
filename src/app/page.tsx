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
import { ProductCarousel } from "@/components/ProductCarousel";

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
    { label: "Telefonlar", icon: Smartphone, href: "/category/smartfonlar" },
    { label: "Laptoplar", icon: Laptop, href: "/category/noutbuklar" },
    { label: "TV", icon: Tv, href: "/category/elektronika" },
    { label: "Saatlar", icon: Watch, href: "/category/elektronika" },
    { label: "Qulaqlıqlar", icon: Headset, href: "/category/qulaqliqlar" },
    { label: "Kameralar", icon: Camera, href: "/category/elektronika" },
    { label: "Mətbəx", icon: Coffee, href: "/category/metbex" },
  ];

  const relatedCategories = [
    { label: "Smartfonlar", img: "/iphone15pro.png", href: "/category/smartfonlar" },
    { label: "Qulaqlıqlar", img: "/iphone15pro.png", href: "/category/qulaqliqlar" },
    { label: "Planşetlər", img: "/iphone15pro.png", href: "/category/plansetler" },
    { label: "Oyun Konsolları", img: "/iphone15pro.png", href: "/category/konsollar" },
  ];

  // Guarantee data even if database is small
  const populars = products.slice(0, 10);
  const deals = products.length > 10 ? products.slice(10, 20) : [...products].reverse();
  const bestsellers = products.length > 4 ? products.slice(0, 8) : products;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      
      {/* Section 1: Circular Categories */}
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

      {/* Section 2: Populyar məhsullar */}
      <section className="max-w-[1200px] mx-auto w-full px-4 py-10">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[22px] font-bold text-[#1a1a1a]">Populyar məhsullar</h2>
          <Link href="/search" className="text-[#005ea8] text-[14px] font-semibold hover:underline">Hamısına bax</Link>
        </div>
        <ProductCarousel products={populars} userFavoriteIds={userFavoriteIds} />
      </section>

      {/* Section 3: Sizin üçün təkliflər (Blue Band) */}
      <section className="w-full bg-[#E8F0F8] py-12">
        <div className="max-w-[1200px] mx-auto w-full px-4">
          <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tight">Sizin üçün təkliflər</h2>
          <ProductCarousel products={deals} userFavoriteIds={userFavoriteIds} />
          <div className="flex justify-center mt-4">
            <Link href="/search" className="bg-[#005ea8] text-white px-8 py-3 rounded-sm font-bold text-[15px] hover:bg-[#004b86] transition-colors">
              Bütün təkliflərə bax
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Bestsellerləri kəşf edin */}
      <section className="max-w-[1200px] mx-auto w-full px-4 py-12 border-b border-gray-100">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-[#222222]">Bestsellerləri kəşf edin</h2>
          <Link href="/search" className="text-[#005ea8] text-[14px] font-semibold hover:underline">Daha çox</Link>
        </div>
        <ProductCarousel products={bestsellers} userFavoriteIds={userFavoriteIds} />
      </section>

      {/* Section 5: Əlaqəli kateqoriyalar */}
      <section className="max-w-[1200px] mx-auto w-full px-4 py-12">
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
      </section>

    </div>
  );
}



