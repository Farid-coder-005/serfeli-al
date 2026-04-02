"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Search, Heart, ShoppingCart,
  Menu, X, UserCircle, Percent, User,
  LayoutDashboard,
} from "lucide-react";

// ─── Nav links ────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Search",     href: "/search" },
  { label: "Contact Us", href: "/contact" },
];

// ─── Shared icon-button classes ────────────────────────────────
const iconBtn = [
  "relative flex items-center justify-center w-9 h-9 rounded-xl",
  "text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-100",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#057850]/40",
].join(" ");

export function Header() {
  const pathname              = usePathname();
  const { data: session, status } = useSession();
  const isLoggedIn = status === "authenticated";
  const user = session?.user;
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Scroll-reactive shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ══════════════ FIXED HEADER ══════════════════════════ */}
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-[9999] bg-white",
          "border-b border-gray-100 transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-24">

            {/* ── LEFT: Nav (desktop) / Hamburger (mobile) ──── */}
            <nav aria-label="Primary navigation" className="flex items-center">

              {/* Desktop nav links */}
              <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {NAV_LINKS.map(({ label, href }) => {
                  const active = isActive(href);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        aria-current={active ? "page" : undefined}
                        className={[
                          "relative px-3 py-2 text-[14px] font-medium tracking-tight rounded-sm",
                          "transition-colors duration-200",
                          "after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3",
                          "after:h-[2px] after:rounded-full after:transition-transform after:duration-200",
                          active
                            ? "text-[#057850] after:bg-[#057850] after:scale-x-100"
                            : "text-[#4A4A4A] hover:text-[#057850] after:bg-[#057850] after:scale-x-0 hover:after:scale-x-100",
                        ].join(" ")}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile hamburger */}
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#1F1F1F] hover:bg-gray-100 active:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#057850]/40"
              >
                {mobileOpen
                  ? <X    className="w-5 h-5" strokeWidth={2.2} />
                  : <Menu className="w-5 h-5" strokeWidth={2.2} />
                }
              </button>
            </nav>

            {/* ── CENTER: Logo ──────────────────────────────── */}
            <div className="flex justify-center items-center">
              <Link href="/" aria-label="Sərfəli.al – Ana səhifə">
                <Image
                  src="/logo.png"
                  alt="Sərfəli.al"
                  width={220}
                  height={55}
                  className="h-[40px] sm:h-[55px] w-auto object-contain"
                  style={{ width: "auto", maxWidth: "none", maxHeight: "none" }}
                  priority
                />
              </Link>
            </div>

            {/* ── RIGHT: Cashback · Icons · Auth ────────────── */}
            <div className="flex items-center justify-end gap-4 lg:gap-6">
              
              {/* A) Cashback Badge (New) */}
              <Link href="/cashback-info" className="hidden md:flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold border border-green-200 hover:bg-green-100 transition">
                <Percent className="w-4 h-4" /> Cashback
              </Link>

              {/* B) Existing Action Icons */}
              <div className="flex items-center gap-1 sm:gap-2">
                <Link href="/search" aria-label="Axtar" className={`hidden sm:flex ${iconBtn}`}>
                  <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </Link>

                <Link href="/wishlist" aria-label="İstək siyahısı" className={`hidden sm:flex ${iconBtn}`}>
                  <Heart className="w-[18px] h-[18px]" strokeWidth={1.8} />
                </Link>

                <Link href="/cart" aria-label="Səbət (1 məhsul)" className={iconBtn}>
                  <ShoppingCart className="w-[18px] h-[18px]" strokeWidth={1.8} />
                  <span
                    aria-hidden="true"
                    className="absolute -top-0.5 -right-0.5 min-w-[16px] h-[16px] px-[3px] bg-[#057850] text-white rounded-full flex items-center justify-center text-[9px] font-black leading-none pointer-events-none"
                  >
                    1
                  </span>
                </Link>
              </div>

              {/* C) Login / Register Button (New) */}
              {isLoggedIn ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/dashboard" className="flex items-center bg-gray-100 text-[#1F1F1F] px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-200 transition">
                    <User className="w-4 h-4 mr-2" /> {user?.name}
                  </Link>
                  <button onClick={() => signOut()} className="flex items-center text-red-500 font-medium text-sm hover:text-red-700 px-2">
                    Çıxış
                  </button>
                </div>
              ) : (
                <Link href="/login" className="hidden md:flex items-center bg-[#057850] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#046241] transition">
                  <User className="w-4 h-4 mr-2" /> Giriş / Qeydiyyat
                </Link>
              )}
            </div>

          </div>
        </div>
      </header>

      {/* ══════════════ MOBILE DRAWER ════════════════════════ */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={[
          "md:hidden fixed left-0 right-0 z-[9998] bg-white border-b border-gray-100 shadow-xl",
          "overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "top-24 max-h-[32rem] opacity-100" : "top-24 max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-4 py-4 space-y-1">

          {/* Nav links */}
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <Link
                key={label}
                href={href}
                aria-current={active ? "page" : undefined}
                className={[
                  "flex items-center px-4 py-3 rounded-2xl text-[15px] font-semibold transition-colors duration-150",
                  active
                    ? "text-[#057850] bg-[#057850]/5"
                    : "text-[#1F1F1F] hover:text-[#057850] hover:bg-gray-50",
                ].join(" ")}
              >
                {label}
              </Link>
            );
          })}

          <div className="pt-3 border-t border-gray-100 space-y-2">

            {/* Cashback link in mobile drawer */}
            <Link
              href="/cashback-info"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-semibold text-[#057850] hover:bg-[#057850]/5 transition-colors"
            >
              <Percent className="w-4 h-4" />
              Kəşbək Proqramı
            </Link>

            {/* Search in drawer */}
            <Link
              href="/search"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-semibold text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-50 transition-colors"
            >
              <Search className="w-4 h-4" />
              Axtarış
            </Link>

            {/* Wishlist in drawer */}
            <Link
              href="/wishlist"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-[15px] font-semibold text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-50 transition-colors"
            >
              <Heart className="w-4 h-4" />
              İstək Siyahısı
            </Link>
          </div>

          {/* Auth button in mobile drawer */}
          <div className="pt-3 pb-2">
            {isLoggedIn ? (
              <div className="space-y-2">
                <Link
                  href="/dashboard"
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#057850] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[#057850]/20 transition-all active:scale-[0.98]"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-red-50 text-red-600 font-black text-sm uppercase tracking-widest transition-all active:scale-[0.98]"
                >
                  Çıxış
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl bg-[#057850] text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-[#057850]/20 transition-all active:scale-[0.98]"
              >
                <UserCircle className="w-4 h-4" />
                Giriş / Qeydiyyat
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* ══════════════ MOBILE BACKDROP ══════════════════════ */}
      {mobileOpen && (
        <div
          aria-hidden="true"
          onClick={() => setMobileOpen(false)}
          className="md:hidden fixed inset-0 z-[9997] bg-black/10 backdrop-blur-[2px]"
        />
      )}
    </>
  );
}
