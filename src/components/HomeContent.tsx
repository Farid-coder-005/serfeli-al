"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Smartphone, Sofa, Shirt, Sparkles, ShoppingBag, 
  ArrowRight, TrendingDown, Tag, Laptop,
  Tv, Headset, Watch, Camera, Coffee,
  ChevronRight
} from "lucide-react";
import { ProductCarousel } from "@/components/ProductCarousel";
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
          <div className="promo-banner-card group relative overflow-hidden rounded-2xl w-full h-[420px] lg:h-full lg:min-h-[420px] cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500">
            {/* Background Image */}
            <Image
              src="/promo-banner-bg.png"
              alt="Promo Banner"
              fill
              sizes="(max-width: 1024px) 100vw, 340px"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#001a35]/95 via-[#002B55]/60 to-transparent z-[1]" />
            {/* Shimmer Effect */}
            <div className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
              style={{
                background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 2s infinite linear',
              }}
            />
            {/* Content */}
            <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 lg:p-7">
              {/* Small Badge */}
              <div className="mb-auto pt-2">
                <span className="inline-flex items-center gap-1.5 bg-[#FF6B00]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-lg"
                  style={{ fontFamily: "'Montserrat', sans-serif" }}
                >
                  <Sparkles className="w-3 h-3" />
                  serfeli.al
                </span>
              </div>
              {/* Title */}
              <h3
                className="text-[28px] lg:text-[26px] xl:text-[30px] font-extrabold text-white leading-[1.15] mb-2 drop-shadow-lg"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t("promoTitle")}
              </h3>
              {/* Subtitle */}
              <p
                className="text-[14px] text-white/80 leading-relaxed mb-5 max-w-[280px]"
                style={{ fontFamily: "'Nunito', sans-serif" }}
              >
                {t("promoSubtitle")}
              </p>
              {/* CTA Button */}
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 bg-[#FF6B00] hover:bg-[#ff8533] text-white text-[13px] font-bold uppercase tracking-wider px-6 py-3 rounded-full transition-all duration-300 shadow-lg shadow-[#FF6B00]/30 hover:shadow-xl hover:shadow-[#FF6B00]/40 hover:-translate-y-0.5 active:scale-95 w-fit"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {t("promoButton")}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Sizin üçün təkliflər (Blue Band) */}
      <section className="w-full bg-[#E8F0F8] py-12">
        <div className="max-w-[1440px] mx-auto w-full px-4">
          <h2 className="text-[24px] font-bold text-[#1a1a1a] mb-8 text-center uppercase tracking-tight">{t("offersForYou")}</h2>
          <ProductCarousel products={deals} userFavoriteIds={userFavoriteIds} />
          <div className="flex justify-center mt-8">
            <Link href="/search" className="bg-[#002B55] text-white px-10 py-3 rounded-full font-bold text-[15px] hover:bg-[#004b86] transition-all duration-300 shadow-lg shadow-[#002B55]/20">
              {t("viewAllOffers")}
            </Link>
          </div>
        </div>
      </section>

      {/* Section 4: Bestsellerləri kəşf edin */}
      <section className="max-w-[1440px] mx-auto w-full px-4 py-12 border-t border-gray-100">
        <div className="flex justify-between items-baseline mb-6">
          <h2 className="text-2xl font-bold text-[#222222]">{t("discoverBestsellers")}</h2>
        </div>
        <ProductCarousel products={bestsellers} userFavoriteIds={userFavoriteIds} />
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
