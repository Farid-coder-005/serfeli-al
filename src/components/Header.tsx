"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Heart, Coins, User, Menu, X, Bell,
  Smartphone, Dumbbell, Baby, Home,
  Apple, Gamepad2, HeartPulse, Car, Shirt,
  PawPrint, Plane, Tag, UserCircle, LayoutDashboard,
  Leaf, Clock, Percent, Globe, GraduationCap, Shield
} from "lucide-react";
import SearchBar from "./SearchBar";
import { Logo } from "./Logo";
import { useLanguage } from "@/context/LanguageContext";
import { Language, TranslationKey } from "@/lib/translations";


/* ─── Top Bar links ───────────────────────────────────────── */
const TOP_LINKS = [
  { label: "ALIŞ-VERİŞ", href: "/", id: "shopping" },
];

/* ─── Category bar items ──────────────────────────────────── */
const CATEGORIES = [
  { label: "Təkliflər", icon: Tag, href: "/category/teklifler" },
  { label: "Elektronika", icon: Smartphone, href: "/category/elektronika" },
  { label: "İdman", icon: Dumbbell, href: "/category/idman" },
  { label: "Uşaq", icon: Baby, href: "/category/usaq" },
  { label: "Ev və Bağça", icon: Home, href: "/category/ev-ve-bagca" },
  { label: "Qida", icon: Apple, href: "/category/qida" },
  { label: "Oyunlar", icon: Gamepad2, href: "/category/oyunlar" },
  { label: "Sağlamlıq", icon: HeartPulse, href: "/category/saglamliq" },
  { label: "Avtomobil", icon: Car, href: "/category/avtomobil" },
  { label: "Moda", icon: Shirt, href: "/category/moda" },
  { label: "Heyvanlar", icon: PawPrint, href: "/category/heyvanlar" },
  { label: "Reyslər", icon: Plane, href: "#" },
  { label: "Təhsil", icon: GraduationCap, href: "/category/tehsil" },
  { label: "Sığorta", icon: Shield, href: "/category/sigorta" },
];

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("shopping");
  const { language, setLanguage, t } = useLanguage();
  const [dropdownOpen, setDropdownOpen] = useState(false);
 
  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);
 
  return (
    <div className="z-[9999] relative">
      <header role="banner" className="bg-[#002B55] sticky top-0 z-[9999] text-white flex flex-col">
        
        {/* 1. Top Strip */}
        <div className="bg-[#002B55] text-sm hidden md:flex items-center border-b border-white/5">
          <div className="max-w-[1440px] mx-auto w-full px-4 py-2 flex items-center justify-between">
            <nav className="flex items-center gap-6">
              <Link 
                href="/" 
                onClick={() => setActiveTab('shopping')}
                className={`font-bold pb-0.5 text-[13px] transition-all ${
                  activeTab === 'shopping' 
                  ? 'border-b-2 border-[#FF6B00] text-white' 
                  : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
              >
                {t("shopping")}
              </Link>
              <button 
                onClick={() => setActiveTab('flights')}
                className={`font-bold pb-0.5 text-[13px] transition-all cursor-pointer ${
                  activeTab === 'flights' 
                  ? 'border-b-2 border-[#FF6B00] text-white' 
                  : 'text-white/70 hover:text-white border-b-2 border-transparent'
                }`}
              >
                {t("flights")}
              </button>
            </nav>
            <div className="flex items-center gap-2 text-white hover:text-white cursor-pointer transition-colors group">
                <span className="text-white/70 font-medium">{t("sustainability")}</span>
              <Leaf className="w-3.5 h-3.5 text-[#FF6B00] group-hover:scale-110 transition-transform" />
            </div>
          </div>
        </div>

        {/* 2. Main Row */}
        <div className="bg-[#002B55] py-3">
          <div className="max-w-[1440px] mx-auto w-full px-4 flex items-center">
            {/* Mobile Hamburger */}
            <button onClick={() => setMobileOpen(true)} className="md:hidden text-white flex shrink-0 transition-colors hover:text-[#FF6B00] mr-4">
              <Menu className="w-6 h-6" strokeWidth={2} />
            </button>
            
            <Logo 
              onClick={() => setActiveTab('shopping')}
              className="md:pr-4"
            />

            {/* Search Bar */}
            <div className="flex-1 mx-8 hidden md:block">
              <SearchBar />
            </div>

            {/* Right User Actions */}
            <div className="flex items-center gap-4 sm:gap-6 ml-auto shrink-0 pt-1">
              <Link href="/wishlist" className="flex flex-col items-center group text-white hover:text-[#FF6B00] transition-colors">
                <Heart className="w-6 h-6 stroke-[1.5]" />
                <span className="text-white/70 mt-1 font-medium hidden sm:block">{t("myNotes")}</span>
              </Link>
              <Link href="/dashboard/price-alerts" className="flex flex-col items-center group text-white hover:text-[#FF6B00] transition-colors">
                <Bell className="w-6 h-6 stroke-[1.5]" />
                <span className="text-white/70 mt-1 font-medium hidden sm:block">{t("priceAlert")}</span>
              </Link>
              
              {/* Language Switcher */}
              <div className="relative flex flex-col items-center premium-lang-switcher">
                <button
                  id="language-switcher-btn"
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex flex-col items-center group text-white hover:text-[#FF6B00] transition-colors focus:outline-none cursor-pointer"
                  aria-haspopup="true"
                  aria-expanded={dropdownOpen}
                >
                  <Globe className="w-6 h-6 stroke-[1.5]" />
                  <span className="text-white/70 mt-1 font-medium hidden sm:block uppercase tracking-wider text-[14px]">
                    {language.toUpperCase()}
                  </span>
                </button>

                {dropdownOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40 cursor-default" 
                      onClick={() => setDropdownOpen(false)}
                    />
                    <div className="absolute top-full right-1/2 translate-x-1/2 sm:right-0 sm:translate-x-0 w-44 bg-white rounded-xl shadow-xl border border-gray-100 py-2.5 z-50 premium-dropdown-animate">
                      <div className="px-4 py-1.5 text-[10px] font-black text-gray-400 tracking-wider uppercase border-b border-gray-100/50 pb-2 mb-1">
                        Dil seçin / Select Language
                      </div>
                      {[
                        { code: "AZ", label: "Azerbaijani", flag: "🇦🇿" },
                        { code: "EN", label: "English", flag: "🇬🇧" },
                        { code: "RU", label: "Russian", flag: "🇷🇺" },
                      ].map((item) => {
                        const isActive = language.toUpperCase() === item.code;
                        return (
                          <button
                            key={item.code}
                            onClick={() => {
                              setLanguage(item.code.toLowerCase() as Language);
                              setDropdownOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2 text-left text-sm font-semibold transition-all duration-150 cursor-pointer ${
                              isActive 
                                ? "bg-[#FF6B00]/10 text-[#FF6B00]" 
                                : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                          >
                            <span className="text-base leading-none">{item.flag}</span>
                            <span className="flex-1">{item.label}</span>
                            {isActive && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}
              </div>

              <Link href={isLoggedIn ? "/dashboard" : "/login"} className="flex flex-col items-center group text-white hover:text-[#FF6B00] transition-colors">
                <User className="w-6 h-6 stroke-[1.5]" />
                <span className="text-white/70 mt-1 font-medium hidden sm:block">{t("profile")}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="px-4 pb-3 md:hidden w-full">
          <SearchBar />
        </div>

        {/* 3. Category Strip */}
        <nav className="bg-[#26496B] py-3 hidden md:block w-full">
          <div className="max-w-[1440px] mx-auto w-full px-4 flex justify-between items-start overflow-x-auto no-scrollbar">
            {CATEGORIES.map(({ label, icon: Icon, href }, idx) => {
              const translationKeyMap: Record<string, TranslationKey> = {
                "Təkliflər": "categoryOffers",
                "Elektronika": "categoryElectronics",
                "İdman": "categorySports",
                "Uşaq": "categoryKids",
                "Ev və Bağça": "categoryHomeGarden",
                "Qida": "categoryFood",
                "Oyunlar": "categoryGames",
                "Sağlamlıq": "categoryHealth",
                "Avtomobil": "categoryAutomobil",
                "Moda": "categoryFashion",
                "Heyvanlar": "categoryPets",
                "Reyslər": "categoryFlights",
                "Təhsil": "categoryEducation",
                "Sığorta": "categoryInsurance"
              };
              const displayLabel = translationKeyMap[label] ? t(translationKeyMap[label]) : label;
              if (idx === 0) {
                return (
                  <div key={label} className="shrink-0 mt-1">
                    <Link href={href} className="flex flex-col items-center text-white hover:text-[#FF6B00] transition-colors gap-1.5">
                      <div className="w-[26px] h-[26px] bg-[#FF6B00] rounded-[3px] flex items-center justify-center">
                        <Percent className="w-4 h-4 text-white" strokeWidth={3} />
                      </div>
                      <span className="text-[11px] font-medium tracking-wide text-white">{displayLabel}</span>
                    </Link>
                  </div>
                );
              }
              return (
                <div key={label} className="shrink-0 mt-1">
                  <Link href={href} className="flex flex-col items-center text-white hover:text-[#FF6B00] transition-colors gap-1.5">
                    <Icon className="w-[26px] h-[26px] stroke-[1.5]" />
                    <span className="text-[11px] font-medium tracking-wide text-white">{displayLabel}</span>
                  </Link>
                </div>
              );
            })}
          </div>
        </nav>
      </header>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-hidden={!mobileOpen}
        className={[
          "fixed left-0 right-0 z-[9998] bg-[#002B55] text-white shadow-xl",
          "overflow-y-auto transition-all duration-300 ease-in-out",
          mobileOpen ? "top-[115px] max-h-[calc(100vh-115px)] opacity-100" : "top-[115px] max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-6 py-6 space-y-2">
          <div className="flex justify-between items-center mb-6 border-b border-white/10 pb-4">
            <span className="font-bold text-lg">{t("categories")}</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-[#1E293B] hover:text-white transition-colors">
               <X className="w-6 h-6" />
            </button>
          </div>
          {CATEGORIES.map(({ label, icon: Icon, href }, idx) => {
            const translationKeyMap: Record<string, TranslationKey> = {
              "Təkliflər": "categoryOffers",
              "Elektronika": "categoryElectronics",
              "İdman": "categorySports",
              "Uşaq": "categoryKids",
              "Ev və Bağça": "categoryHomeGarden",
              "Qida": "categoryFood",
              "Oyunlar": "categoryGames",
              "Sağlamlıq": "categoryHealth",
              "Avtomobil": "categoryAutomobil",
              "Moda": "categoryFashion",
              "Heyvanlar": "categoryPets",
              "Reyslər": "categoryFlights",
              "Təhsil": "categoryEducation",
              "Sığorta": "categoryInsurance"
            };
            const displayLabel = translationKeyMap[label] ? t(translationKeyMap[label]) : label;
            return (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-4 py-3 text-[15px] font-bold text-gray-200 hover:text-[#FF6B00] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {idx === 0 ? (
                  <div className="w-6 h-6 bg-[#FF6B00] rounded-sm flex items-center justify-center">
                    <Percent className="w-4 h-4 text-white" strokeWidth={2.5} />
                  </div>
                ) : (
                  <Icon className="w-6 h-6" />
                )}
                {displayLabel}
              </Link>
            );
          })}
          <div className="pt-6 mt-6 border-t border-white/10">
             {isLoggedIn ? (
               <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="w-full text-left py-3 text-[15px] font-bold text-red-500"
               >
                 {t("signOut")}
               </button>
             ) : (
                <Link
                  href="/login"
                  className="block w-full py-3 text-[15px] font-bold text-[#FF6B00]"
                  onClick={() => setMobileOpen(false)}
                >
                  {t("loginRegister")}
                </Link>
             )}
          </div>
        </div>
      </div>
      
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[9997] bg-black/60 transition-opacity"
        />
      )}
    </div>
  );
}
