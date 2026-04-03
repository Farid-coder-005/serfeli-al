"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Heart, Clock, User, Menu, X,
  Leaf, Smartphone, Dumbbell, Baby, Home,
  Apple, Gamepad2, HeartPulse, Car, Shirt,
  PawPrint, Plane, Tag, UserCircle, LayoutDashboard,
} from "lucide-react";
import SearchBar from "./SearchBar";

/* ─── Top Bar links ───────────────────────────────────────── */
const TOP_LINKS = [
  { label: "ALIŞ-VERİŞ", href: "/", id: "shopping" },
  { label: "REYS", href: "#", id: "flights" },
  { label: "JURNAL", href: "#", id: "magazine" },
];

/* ─── Category bar items ──────────────────────────────────── */
const CATEGORIES = [
  { label: "Təkliflər", icon: Tag, href: "/search?category=teklifler" },
  { label: "Elektronika", icon: Smartphone, href: "/search?category=elektronika" },
  { label: "İdman", icon: Dumbbell, href: "/search?category=idman" },
  { label: "Uşaq", icon: Baby, href: "/search?category=usaq" },
  { label: "Ev və Bağça", icon: Home, href: "/search?category=ev-bagca" },
  { label: "Qida", icon: Apple, href: "/search?category=qida" },
  { label: "Oyunlar", icon: Gamepad2, href: "/search?category=oyunlar" },
  { label: "Sağlamlıq", icon: HeartPulse, href: "/search?category=saglamliq" },
  { label: "Avtomobil", icon: Car, href: "/search?category=avtomobil" },
  { label: "Moda", icon: Shirt, href: "/search?category=moda" },
  { label: "Heyvanlar", icon: PawPrint, href: "/search?category=heyvanlar" },
  { label: "Reyslər", icon: Plane, href: "#" },
];

/* ─── Brand Colors ────────────────────────────────────────── */
const BRAND_GREEN = "#057850";
const BRAND_GREEN_DARK = "#046241";

export function Header() {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeTopLink, setActiveTopLink] = useState("shopping");

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  return (
    <div className="z-[9999] relative">
      {/* ════════════════════════════════════════════════════════
          BAR A — Top Utility Bar (hidden on mobile)
          ════════════════════════════════════════════════════════ */}
      <div className="hidden md:block bg-[#046241] text-white text-[11px] font-semibold tracking-wide">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-8">
          <div className="w-32 hidden lg:block" />
          <nav aria-label="Top navigation" className="flex items-center gap-0">
            {TOP_LINKS.map(({ label, href, id }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setActiveTopLink(id)}
                className={[
                  "px-4 py-1 transition-colors relative h-8 flex items-center",
                  activeTopLink === id
                    ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-4 after:right-4 after:h-[2px] after:bg-white after:rounded-full"
                    : "text-white/60 hover:text-white",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 text-white/80 hover:text-white transition-colors cursor-pointer ml-auto md:ml-0">
            <Leaf className="w-3.5 h-3.5" strokeWidth={2.5} />
            <span className="text-[10px] uppercase font-black tracking-widest">Davamlı gələcək</span>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BAR B — Main Header Bar (White Bar Refined)
          ════════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className="bg-white sticky top-0 z-[9999] border-b border-gray-100 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 sm:gap-6 lg:gap-10 h-20 sm:h-24">

            {/* ── Hamburger & Logo Container ── */}
            <div className="flex items-center gap-1 sm:gap-4 shrink-0">
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex items-center justify-center w-10 h-10 rounded-xl text-gray-800 hover:bg-gray-100 active:bg-gray-200 transition-colors shrink-0"
              >
                {mobileOpen
                  ? <X className="w-6 h-6" strokeWidth={2.5} />
                  : <Menu className="w-7 h-7" strokeWidth={2.5} />
                }
              </button>

              <Link href="/" aria-label="Sərfəli.al – Ana səhifə" className="shrink-0 relative group py-2">
                <Image
                  src="/logo.png"
                  alt="Sərfəli.al"
                  width={150}
                  height={45}
                  className="h-[32px] sm:h-[45px] w-auto object-contain"
                  style={{ width: "auto" }}
                  priority
                />
                <div
                  className="absolute -bottom-1 left-0 right-0 h-[4px] rounded-full bg-[#FF6600]"
                />
              </Link>
            </div>

            {/* ── Search Bar (Central area) ── */}
            <div className="flex-1 hidden md:block">
              <SearchBar />
            </div>

            {/* ── Right functional icons ── */}
            <div className="flex items-center gap-1 sm:gap-4 md:gap-5 lg:gap-8 ml-auto md:ml-0 shrink-0">

              <Link
                href="/wishlist"
                className="flex flex-col items-center justify-center text-gray-700 hover:text-[#057850] transition-colors group px-1"
                aria-label="Qeydlərim"
              >
                <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[9px] mt-1.5 hidden md:block font-bold tracking-widest text-[#94a3b8] uppercase">Qeydlərim</span>
              </Link>

              <Link
                href="#"
                className="hidden sm:flex flex-col items-center justify-center text-gray-700 hover:text-[#057850] transition-colors group px-1"
                aria-label="Xəbərdarlıq"
              >
                <Clock className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[9px] mt-1.5 hidden md:block font-bold tracking-widest text-[#94a3b8] uppercase">Xəbərdarlıq</span>
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center gap-2 group">
                  <Link
                    href="/dashboard"
                    className="flex flex-col items-center justify-center text-gray-700 hover:text-[#057850] transition-colors px-1"
                  >
                    <User className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    <span className="text-[9px] mt-1.5 hidden md:block font-bold tracking-widest text-[#94a3b8] uppercase">Profilim</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="hidden lg:block text-red-500 hover:text-red-700 text-[8px] font-black uppercase tracking-[0.2em] px-1 ml-1"
                  >
                    Çıxış
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex flex-col items-center justify-center text-gray-700 hover:text-[#057850] transition-colors group px-1"
                  aria-label="Profilim"
                >
                  <User className="w-6 h-6 group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="text-[9px] mt-1.5 hidden md:block font-bold tracking-widest text-[#94a3b8] uppercase">Profilim</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden pb-4">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          BAR C — Category List (Green Bar Refined)
          ════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Category navigation"
        className="bg-[#057850] hidden md:block h-10 border-t border-[#046241]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <ul className="flex items-center gap-1 overflow-x-auto no-scrollbar list-none m-0 p-0 h-full scroll-smooth">
            {CATEGORIES.map(({ label, icon: Icon, href }) => (
              <li key={label} className="h-full flex shrink-0">
                <Link
                  href={href}
                  className="flex items-center gap-2 px-3 mx-0.5 text-[12px] font-bold text-white/90 hover:text-white hover:bg-white/10 transition-all whitespace-nowrap h-full"
                >
                  <Icon className="w-3.5 h-3.5 shrink-0" strokeWidth={2} />
                  <span className="tracking-tight">{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ════════════════════════════════════════════════════════
          MOBILE DRAWER
          ════════════════════════════════════════════════════════ */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={[
          "fixed left-0 right-0 z-[9998] bg-white shadow-2xl",
          "overflow-y-auto transition-all duration-300 ease-in-out",
          mobileOpen ? "top-[144px] max-h-[calc(100vh-144px)] opacity-100" : "top-[144px] max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-5 py-6 space-y-2">
          <p className="text-[11px] font-black text-[#057850] uppercase tracking-[0.2em] px-2 pb-3 border-b border-gray-100 mb-4">Kateqoriyalar</p>
          
          <div className="grid grid-cols-1 gap-1">
            {CATEGORIES.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[15px] font-bold text-gray-800 hover:bg-[#057850]/5"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#057850]" strokeWidth={2} />
                </div>
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-8 pt-6 border-t border-gray-100 space-y-2">
             <Link
                href="/wishlist"
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[15px] font-bold text-gray-800 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="w-5 h-5 text-red-500" />
                Qeydlərim
              </Link>
              <Link
                href="#"
                className="flex items-center gap-4 px-4 py-3.5 rounded-xl text-[15px] font-bold text-gray-800 hover:bg-gray-50"
                onClick={() => setMobileOpen(false)}
              >
                <Clock className="w-5 h-5 text-[#057850]" />
                Qiymət xəbərdarlığı
              </Link>
          </div>

          <div className="mt-6">
            {isLoggedIn ? (
              <div className="space-y-3">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#057850] text-white font-black text-sm uppercase tracking-widest shadow-lg transition-all active:scale-[0.98]"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Profilim
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-red-50 text-red-600 font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
                >
                  Çıxış
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-3 w-full py-4 rounded-2xl bg-[#057850] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[#057850]/20 transition-all active:scale-[0.98]"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle className="w-5 h-5" />
                Giriş / Qeydiyyat
              </Link>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 z-[9997] bg-black/40 backdrop-blur-sm transition-opacity"
        />
      )}
    </div>
  );
}
