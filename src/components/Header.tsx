"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";

// ─── Navigation link definitions ──────────────────────────────
const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Search",     href: "/search" },
  { label: "Contact Us", href: "/contact" },
];

// ─── Icon button base classes (DRY helper) ─────────────────────
const iconBtn = [
  "relative flex items-center justify-center w-10 h-10 rounded-xl",
  "text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-100",
  "transition-colors duration-200",
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#057850]/40",
].join(" ");

export function Header() {
  const pathname   = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled,   setScrolled]   = useState(false);

  // Scroll-reactive shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Helper: is this link the active route?
  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      {/* ════════════════ FIXED HEADER BAR ════════════════════ */}
      <header
        role="banner"
        className={[
          "fixed top-0 left-0 right-0 z-[9999]",
          "bg-white border-b border-gray-100",
          "transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm",
        ].join(" ")}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-24">

            {/* ── LEFT: Nav links (desktop) / Hamburger (mobile) ── */}
            <nav aria-label="Primary navigation" className="flex items-center">

              {/* Desktop nav */}
              <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {NAV_LINKS.map(({ label, href }) => {
                  const active = isActive(href);
                  return (
                    <li key={label}>
                      <Link
                        href={href}
                        className={[
                          "relative px-3 py-2 text-[15px] font-medium tracking-tight",
                          "rounded-sm transition-colors duration-200",
                          "after:content-[''] after:absolute after:bottom-0 after:left-3 after:right-3",
                          "after:h-[2px] after:rounded-full after:transition-transform after:duration-200",
                          active
                            ? "text-[#057850] after:bg-[#057850] after:scale-x-100"
                            : "text-[#4A4A4A] hover:text-[#057850] after:bg-[#057850] after:scale-x-0 hover:after:scale-x-100",
                        ].join(" ")}
                        aria-current={active ? "page" : undefined}
                      >
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              {/* Mobile: hamburger / close */}
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-xl text-[#1F1F1F] hover:bg-gray-100 active:bg-gray-200 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#057850]/40"
              >
                {mobileOpen
                  ? <X     className="w-5 h-5" strokeWidth={2.2} />
                  : <Menu  className="w-5 h-5" strokeWidth={2.2} />
                }
              </button>
            </nav>

            {/* ── CENTER: Logo ──────────────────────────────────── */}
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

            {/* ── RIGHT: Action icons ───────────────────────────── */}
            <div
              role="toolbar"
              aria-label="Actions"
              className="flex items-center justify-end gap-0.5 sm:gap-1"
            >
              {/* Search icon → /search */}
              <Link
                href="/search"
                aria-label="Axtar"
                className={iconBtn}
              >
                <Search className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </Link>

              {/* Wishlist → /wishlist */}
              <Link
                href="/wishlist"
                aria-label="İstək siyahısı"
                className={iconBtn}
              >
                <Heart className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </Link>

              {/* Cart → /cart with badge */}
              <Link
                href="/cart"
                aria-label="Səbət (1 məhsul)"
                className={iconBtn}
              >
                <ShoppingCart className="w-[19px] h-[19px]" strokeWidth={1.8} />
                {/* Notification badge */}
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 -right-0.5 min-w-[17px] h-[17px] px-[3px] bg-[#057850] text-white rounded-full flex items-center justify-center text-[10px] font-bold leading-none pointer-events-none"
                >
                  1
                </span>
              </Link>
            </div>

          </div>
        </div>
      </header>

      {/* ════════════════ MOBILE NAV DRAWER ═══════════════════ */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={[
          "md:hidden fixed left-0 right-0 z-[9998]",
          "bg-white border-b border-gray-100 shadow-lg",
          "overflow-hidden transition-all duration-300 ease-in-out",
          // top must match header height (h-24 = 96px)
          mobileOpen
            ? "top-24 max-h-64 opacity-100"
            : "top-24 max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ul className="list-none m-0 p-0 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ label, href }) => {
            const active = isActive(href);
            return (
              <li key={label}>
                <Link
                  href={href}
                  aria-current={active ? "page" : undefined}
                  className={[
                    "block px-4 py-3 rounded-xl text-[15px] font-medium transition-colors duration-150",
                    active
                      ? "text-[#057850] bg-[#057850]/5 font-semibold"
                      : "text-[#1F1F1F] hover:text-[#057850] hover:bg-gray-50",
                  ].join(" ")}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      {/* ════════════════ MOBILE BACKDROP ═════════════════════ */}
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
