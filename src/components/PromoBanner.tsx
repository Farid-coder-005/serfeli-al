"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PromoBannerProps {
  variant?: "right" | "left";
}

export function PromoBanner({ variant = "right" }: PromoBannerProps) {
  const { t } = useLanguage();

  return (
    <div className="promo-banner-card group relative overflow-hidden rounded-2xl w-full h-full min-h-[380px] cursor-pointer shadow-xl hover:shadow-2xl transition-shadow duration-500">
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
      <div
        className="absolute inset-0 z-[2] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 45%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.08) 55%, transparent 60%)",
          backgroundSize: "200% 100%",
          animation: "shimmer 2s infinite linear",
        }}
      />
      {/* Content */}
      <div className="absolute inset-0 z-[3] flex flex-col justify-end p-6 lg:p-7">
        {/* Small Badge */}
        <div className="mb-auto pt-2">
          <span
            className="inline-flex items-center gap-1.5 bg-[#FF6B00]/90 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-[0.15em] px-3 py-1.5 rounded-full shadow-lg"
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
  );
}
