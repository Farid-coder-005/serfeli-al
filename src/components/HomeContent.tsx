"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Smartphone, Sofa, Shirt, Sparkles, ShoppingBag,
  TrendingDown, Tag, Laptop,
  Tv, Headset, Watch, Camera, Coffee,
  ChevronRight
} from "lucide-react";
import { ProductCarousel } from "@/components/ProductCarousel";
import { PromoBanner } from "@/components/PromoBanner";
import { useLanguage } from "@/context/LanguageContext";
import { TranslationKey } from "@/lib/translations";

interface HomeContentProps {
  products: any[];
  userFavoriteIds: string[];
}

export function HomeContent({ products, userFavoriteIds }: HomeContentProps) {
  const { t } = useLanguage();

  const shortcuts = [
    { label: t("categoryPhones"), icon: Smartphone, href: "/category/smartfonlar" },
    { label: t("categoryLaptops"), icon: Laptop, href: "/category/noutbuklar" },
    { label: t("categoryTv"), icon: Tv, href: "/category/elektronika" },
    { label: t("categoryWatches"), icon: Watch, href: "/category/elektronika" },
    { label: t("categoryHeadphones"), icon: Headset, href: "/category/qulaqliqlar" },
    { label: t("categoryCameras"), icon: Camera, href: "/category/elektronika" },
    { label: t("categoryKitchen"), icon: Coffee, href: "/category/metbex" },
  ];

  const relatedCategories = [
    { label: t("categorySmartphones"), img: "/iphone15pro.png", href: "/category/smartfonlar" },
    { label: t("categoryHeadphones"), img: "/iphone15pro.png", href: "/category/qulaqliqlar" },
    { label: t("categoryTablets"), img: "/iphone15pro.png", href: "/category/plansetler" },
    { label: t("categoryConsoles"), img: "/iphone15pro.png", href: "/category/konsollar" },
  ];

  // Guarantee data even if database is small
  const populars = products.slice(0, 10);
  const deals = products.length > 10 ? products.slice(10, 20) : [...products].reverse();
  const bestsellers = products.length > 4 ? products.slice(0, 8) : products;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      
      {/* Section 1: Circular Categories */}
      <section className="py-8 border-b border-gray-100">
        <div className="max-w-[1440px] mx-auto w-full px-4 font-sans">
          <div className="flex items-center justify-between gap-6 overflow-x-auto no-scrollbar py-4 px-2">
            {shortcuts.map((item, idx) => (
              <Link key={idx} href={item.href} className="flex flex-col items-center gap-3 group shrink-0 transition-all active:scale-95">
                <div className="w-[72px] h-[72px] rounded-full border-2 border-[#FF6B00] flex items-center justify-center bg-white p-3 transition-transform group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-[#FF6B00]/20">
                  <item.icon className="w-8 h-8 text-[#222222]" strokeWidth={1.5} />
                </div>
                <span className="text-[11px] font-black text-[#222222] text-center uppercase tracking-wider group-hover:text-[#FF6B00] transition-colors">
                  {item.label}
                </span>
              </Link>
            ))}
            <div className="w-4 shrink-0 md:hidden"></div>
          </div>
        </div>
      </section>

      {/* Section 2: Populyar məhsullar + Promo Banner */}
      <section className="max-w-[1440px] mx-auto w-full px-4 py-10">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-[22px] font-bold text-[#1a1a1a]">{t("popularProducts")}</h2>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-6 items-start">
          {/* Left Column: Product Carousel */}
          <div className="min-w-0">
            <ProductCarousel products={populars} userFavoriteIds={userFavoriteIds} />
            <div className="flex justify-center mt-8">
              <Link href="/search" className="bg-[#002B55] text-white px-10 py-3 rounded-full font-bold text-[15px] hover:bg-[#004b86] transition-all duration-300 shadow-lg shadow-[#002B55]/20">
                {t("viewAllProducts")}
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Promo Banner */}
          <PromoBanner variant="right" />
        </div>
      </section>

      {/* Section 3: Sizin üçün təkliflər — Banner as FIRST item in scroll row */}
      <section className="w-full bg-[#E8F0F8] py-12">
        <div className="max-w-[1440px] mx-auto w-full px-4">
          <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tight">{t("offersForYou")}</h2>
          <ProductCarousel
            products={deals}
            userFavoriteIds={userFavoriteIds}
            beforeItems={
              <div className="flex-none w-[260px] md:w-[280px] snap-start hidden md:block">
                <PromoBanner variant="left" />
              </div>
            }
          />
          <div className="flex justify-center mt-8">
            <Link href="/search" className="bg-[#002B55] text-white px-10 py-3 rounded-full font-bold text-[15px] hover:bg-[#004b86] transition-all duration-300 shadow-lg shadow-[#002B55]/20">
              {t("viewAllOffers")}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Bestsellerləri kəşf edin — Banner as LAST item in scroll row */}
      <section className="max-w-[1440px] mx-auto w-full px-4 py-12 border-t border-gray-100">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-[#222222]">{t("discoverBestsellers")}</h2>
        </div>
        <ProductCarousel
          products={bestsellers}
          userFavoriteIds={userFavoriteIds}
          afterItems={
            <div className="flex-none w-[260px] md:w-[280px] snap-start hidden md:block">
              <PromoBanner variant="right" />
            </div>
          }
        />
        <div className="flex justify-center mt-8">
          <Link href="/search" className="bg-[#002B55] text-white px-10 py-3 rounded-full font-bold text-[15px] hover:bg-[#004b86] transition-all duration-300 shadow-lg shadow-[#002B55]/20">
            {t("viewAllProducts")}
          </Link>
        </div>
      </section>

      {/* Section 5: Əlaqəli kateqoriyalar */}
      <section className="max-w-[1440px] mx-auto w-full px-4 py-12">
        <h2 className="text-[22px] font-bold text-[#1a1a1a] mb-6 font-primary">{t("relatedCategories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {relatedCategories.map((cat, idx) => (
            <Link 
              key={idx} 
              href={cat.href} 
              className="bg-gray-100 rounded-md p-4 flex items-center justify-between h-[100px] group overflow-hidden relative"
            >
              <div className="flex flex-col z-10">
                <span className="text-[15px] font-bold text-[#1a1a1a] group-hover:text-[#002B55] transition-colors">{cat.label}</span>
                <div className="mt-1 flex items-center text-[11px] text-[#002B55] font-bold">
                  {t("transition")} <ChevronRight className="w-3 h-3 ml-0.5" />
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
