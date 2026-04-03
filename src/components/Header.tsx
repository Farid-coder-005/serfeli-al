"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Heart, Clock, User, Menu, X,
  Smartphone, Dumbbell, Baby, Home,
  Apple, Gamepad2, HeartPulse, Car, Shirt,
  PawPrint, Plane, Tag, UserCircle, LayoutDashboard,
} from "lucide-react";
import SearchBar from "./SearchBar";

/* ─── Top Bar links ───────────────────────────────────────── */
const TOP_LINKS = [
  { label: "ALIŞ-VERİŞ", href: "/", id: "shopping" },
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
          BAR A — Top Utility (Utility: Airy Light Green Theme)
          ════════════════════════════════════════════════════════ */}
      <div className="hidden md:block bg-[#dcfce7] text-white text-[11px] font-bold tracking-[0.15em] border-b border-green-100/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center h-8">
          <nav aria-label="Top navigation" className="flex items-center gap-0">
            {TOP_LINKS.map(({ label, href, id }) => (
              <Link
                key={id}
                href={href}
                onClick={() => setActiveTopLink(id)}
                className={[
                  "px-8 py-1 transition-all relative h-8 flex items-center drop-shadow-[0_1.5px_1.5px_rgba(0,0,0,0.35)]",
                  activeTopLink === id
                    ? "text-white after:content-[''] after:absolute after:bottom-0 after:left-8 after:right-8 after:h-[2px] after:bg-white after:rounded-full"
                    : "text-white hover:opacity-80 scale-100 active:scale-95",
                ].join(" ")}
              >
                {label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════
          BAR B — Main Header (Refined: Ultra-prominent Logo)
          ════════════════════════════════════════════════════════ */}
      <header
        role="banner"
        className="bg-white sticky top-0 z-[9999] border-b border-gray-100"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-8 sm:gap-10 lg:gap-20 h-28 sm:h-32">

            {/* ── Hamburger & Logo Container ── */}
            <div className="flex items-center gap-6 sm:gap-10 shrink-0">
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="flex items-center justify-center w-12 h-12 rounded-2xl text-[#046241] hover:bg-gray-50 active:bg-gray-100 transition-all shrink-0"
              >
                {mobileOpen
                  ? <X className="w-8 h-8" strokeWidth={2.5} />
                  : <Menu className="w-9 h-9" strokeWidth={2.5} />
                }
              </button>

              <Link href="/" aria-label="Sərfəli.al – Ana səhifə" className="shrink-0 relative group py-2 flex items-center">
                <Image
                  src="/logo.png"
                  alt="Sərfəli.al"
                  width={280}
                  height={80}
                  className="h-[55px] sm:h-[80px] w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                  style={{ width: "auto" }}
                  priority
                />
                <div
                  className="absolute -bottom-1 left-0 right-0 h-[6px] rounded-full bg-[#FF6600]"
                />
              </Link>
            </div>

            {/* ── Search Bar (Central area) ── */}
            <div className="flex-1 hidden md:block max-w-3xl">
              <SearchBar />
            </div>

            {/* ── Right functional icons ── */}
            <div className="flex items-center gap-3 sm:gap-8 lg:gap-12 ml-auto md:ml-0 shrink-0">

              <Link
                href="/wishlist"
                className="flex flex-col items-center justify-center text-[#1e293b] hover:text-[#057850] transition-all group px-2"
                aria-label="Qeydlərim"
              >
                <Heart className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[10px] mt-2 hidden md:block font-extrabold tracking-[0.2em] uppercase text-[#64748b]">Qeydlərim</span>
              </Link>

              <Link
                href="#"
                className="hidden sm:flex flex-col items-center justify-center text-[#1e293b] hover:text-[#057850] transition-all group px-2"
                aria-label="Xəbərdarlıq"
              >
                <Clock className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={2} />
                <span className="text-[10px] mt-2 hidden md:block font-extrabold tracking-[0.2em] uppercase text-[#64748b]">Xəbərdarlıq</span>
              </Link>

              {isLoggedIn ? (
                <div className="flex items-center gap-3 group">
                  <Link
                    href="/dashboard"
                    className="flex flex-col items-center justify-center text-[#1e293b] hover:text-[#057850] transition-all px-2"
                  >
                    <User className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={2} />
                    <span className="text-[10px] mt-2 hidden md:block font-extrabold tracking-[0.2em] uppercase text-[#64748b]">Profilim</span>
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="hidden lg:block text-red-500 hover:text-red-700 text-[10px] font-black uppercase tracking-[0.25em] px-2 ml-2"
                  >
                    Çıxış
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="flex flex-col items-center justify-center text-[#1e293b] hover:text-[#057850] transition-all group px-2"
                  aria-label="Profilim"
                >
                  <User className="w-8 h-8 group-hover:scale-110 transition-transform" strokeWidth={2} />
                  <span className="text-[10px] mt-2 hidden md:block font-extrabold tracking-[0.2em] uppercase text-[#64748b]">Profilim</span>
                </Link>
              )}
            </div>
          </div>

          <div className="md:hidden pb-6">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* ════════════════════════════════════════════════════════
          BAR C — Categories (Refined: Perfectly Centered on White)
          ════════════════════════════════════════════════════════ */}
      <nav
        aria-label="Category navigation"
        className="bg-white hidden md:block h-14 border-b border-gray-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <ul className="flex items-center gap-2 overflow-x-auto no-scrollbar list-none m-0 p-0 h-full scroll-smooth">
            {CATEGORIES.map(({ label, icon: Icon, href }) => (
              <li key={label} className="h-full flex shrink-0">
                <Link
                  href={href}
                  className="flex items-center gap-3 px-5 mx-0.5 text-[14px] font-bold text-[#64748b] hover:text-[#057850] hover:bg-[#f0fdf4]/50 transition-all whitespace-nowrap h-full border-b-[3px] border-transparent hover:border-[#057850]"
                >
                  <Icon className="w-5 h-5 shrink-0 text-[#057850]/60" strokeWidth={2} />
                  <span className="tracking-tight uppercase">{label}</span>
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
          mobileOpen ? "top-[184px] max-h-[calc(100vh-184px)] opacity-100" : "top-[184px] max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-8 py-10 space-y-5">
          <p className="text-[13px] font-black text-[#057850] uppercase tracking-[0.35em] px-2 pb-5 border-b border-gray-100 mb-8 font-sans">KATEQORIYALAR</p>
          
          <div className="grid grid-cols-1 gap-2.5">
            {CATEGORIES.map(({ label, icon: Icon, href }) => (
              <Link
                key={label}
                href={href}
                className="flex items-center gap-6 px-6 py-4.5 rounded-3xl text-[17px] font-bold text-gray-800 hover:bg-[#057850]/5 active:bg-[#057850]/10 transition-all border border-transparent active:border-[#057850]/20"
                onClick={() => setMobileOpen(false)}
              >
                <div className="w-12 h-12 rounded-2xl bg-[#f0fdf4] flex items-center justify-center">
                  <Icon className="w-6 h-6 text-[#057850]" strokeWidth={2} />
                </div>
                {label}
              </Link>
            ))}
          </div>

          <div className="mt-12 pt-10 border-t border-gray-100 space-y-5">
             <Link
                href="/wishlist"
                className="flex items-center gap-6 px-6 py-4.5 rounded-3xl text-[17px] font-bold text-gray-800 hover:bg-gray-50 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <Heart className="w-7 h-7 text-red-500" />
                Qeydlərim
              </Link>
              <Link
                href="#"
                className="flex items-center gap-6 px-6 py-4.5 rounded-3xl text-[17px] font-bold text-gray-800 hover:bg-gray-50 transition-all"
                onClick={() => setMobileOpen(false)}
              >
                <Clock className="w-7 h-7 text-[#057850]" />
                Xəbərdarlıq
              </Link>
          </div>

          <div className="mt-10">
            {isLoggedIn ? (
              <div className="space-y-5">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-5 w-full py-6 rounded-[2rem] bg-[#057850] text-white font-black text-sm uppercase tracking-[0.35em] shadow-2xl shadow-[#057850]/25 transition-all active:scale-[0.97]"
                  onClick={() => setMobileOpen(false)}
                >
                  <LayoutDashboard className="w-7 h-7" />
                  Profilim
                </Link>
                <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="flex items-center justify-center gap-5 w-full py-6 rounded-[2rem] bg-red-50 text-red-600 font-black text-sm uppercase tracking-[0.35em] transition-all active:scale-[0.97]"
                >
                  Çıxış
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-5 w-full py-6 rounded-[2rem] bg-[#057850] text-white font-black text-sm uppercase tracking-[0.35em] shadow-2xl shadow-[#057850]/25 transition-all active:scale-[0.97]"
                onClick={() => setMobileOpen(false)}
              >
                <UserCircle className="w-7 h-7" />
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
          className="fixed inset-0 z-[9997] bg-black/60 backdrop-blur-xl transition-opacity animate-in fade-in duration-500"
        />
      )}
    </div>
  );
}
