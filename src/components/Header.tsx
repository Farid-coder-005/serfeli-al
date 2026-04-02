"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Home",       href: "/" },
  { label: "Search",     href: "/search" },
  { label: "Contact Us", href: "/contact" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled]     = useState(false);

  // Add a subtle shadow elevation when the user scrolls
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes (navigation)
  const handleNavClick = () => setMobileOpen(false);

  return (
    <>
      {/* ─── Fixed Header Bar ─────────────────────────────────── */}
      <header
        className={[
          "fixed top-0 left-0 right-0 z-[9999] bg-white",
          "border-b border-gray-100 transition-shadow duration-300",
          scrolled ? "shadow-md" : "shadow-sm",
        ].join(" ")}
        role="banner"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-3 items-center h-20">

            {/* ── LEFT: Nav links (desktop) / Hamburger (mobile) ── */}
            <nav
              aria-label="Primary navigation"
              className="flex items-center gap-1"
            >
              {/* Desktop nav links */}
              <ul className="hidden md:flex items-center gap-1 list-none m-0 p-0">
                {NAV_LINKS.map(({ label, href }) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className={[
                        "relative px-3 py-2 text-[15px] font-medium tracking-tight",
                        "text-[#1F1F1F] transition-colors duration-200",
                        "hover:text-[#057850]",
                        // Animated underline via pseudo-element via Tailwind arbitrary
                        "after:content-[''] after:absolute after:left-0 after:bottom-0",
                        "after:w-full after:h-[2px] after:bg-[#057850] after:scale-x-0",
                        "after:origin-left after:transition-transform after:duration-250",
                        "hover:after:scale-x-100 rounded-sm",
                      ].join(" ")}
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>

              {/* Mobile hamburger button */}
              <button
                aria-label={mobileOpen ? "Close menu" : "Open menu"}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
                onClick={() => setMobileOpen((v) => !v)}
                className={[
                  "md:hidden flex items-center justify-center",
                  "w-10 h-10 rounded-xl text-[#1F1F1F]",
                  "hover:bg-gray-100 active:bg-gray-200",
                  "transition-colors duration-200 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#057850]/40",
                ].join(" ")}
              >
                {mobileOpen
                  ? <X className="w-5 h-5" strokeWidth={2.2} />
                  : <Menu className="w-5 h-5" strokeWidth={2.2} />
                }
              </button>
            </nav>

            {/* ── CENTER: Logo ───────────────────────────────────── */}
            <div className="flex justify-center">
              <Link
                href="/"
                aria-label="Sərfəli.al – Ana səhifə"
                className={[
                  "text-[22px] sm:text-[24px] font-bold tracking-tight",
                  "text-[#057850] transition-opacity duration-200",
                  "hover:opacity-80 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#057850]/40 rounded-sm",
                ].join(" ")}
              >
                Sərfəli.al
              </Link>
            </div>

            {/* ── RIGHT: Action icons ────────────────────────────── */}
            <div
              className="flex items-center justify-end gap-1"
              aria-label="Actions"
            >
              {/* Search */}
              <Link
                href="/search"
                aria-label="Axtarış"
                className={[
                  "flex items-center justify-center w-10 h-10 rounded-xl",
                  "text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-100",
                  "transition-colors duration-200 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#057850]/40",
                ].join(" ")}
              >
                <Search className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </Link>

              {/* Wishlist */}
              <button
                aria-label="İstək siyahısı"
                className={[
                  "flex items-center justify-center w-10 h-10 rounded-xl",
                  "text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-100",
                  "transition-colors duration-200 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#057850]/40",
                ].join(" ")}
              >
                <Heart className="w-[19px] h-[19px]" strokeWidth={1.8} />
              </button>

              {/* Cart with badge */}
              <button
                aria-label="Səbət (1 məhsul)"
                className={[
                  "relative flex items-center justify-center w-10 h-10 rounded-xl",
                  "text-[#4A4A4A] hover:text-[#057850] hover:bg-gray-100",
                  "transition-colors duration-200 focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-[#057850]/40",
                ].join(" ")}
              >
                <ShoppingCart className="w-[19px] h-[19px]" strokeWidth={1.8} />
                {/* Green badge */}
                <span
                  aria-hidden="true"
                  className={[
                    "absolute -top-0.5 -right-0.5",
                    "min-w-[17px] h-[17px] px-[3px]",
                    "bg-[#057850] text-white rounded-full",
                    "flex items-center justify-center",
                    "text-[10px] font-bold leading-none",
                  ].join(" ")}
                >
                  1
                </span>
              </button>
            </div>

          </div>
        </div>
      </header>

      {/* ─── Mobile Nav Drawer ────────────────────────────────── */}
      {/*  Slides down from under the header when the hamburger is open */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!mobileOpen}
        className={[
          "md:hidden fixed left-0 right-0 z-[9998] bg-white border-b border-gray-100",
          "shadow-lg overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen ? "top-20 max-h-64 opacity-100" : "top-20 max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <ul className="list-none m-0 p-0 px-4 py-3 space-y-1">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                onClick={handleNavClick}
                className={[
                  "block px-4 py-3 rounded-xl text-[15px] font-medium",
                  "text-[#1F1F1F] hover:text-[#057850] hover:bg-gray-50",
                  "transition-colors duration-150",
                ].join(" ")}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* ─── Mobile Backdrop ─────────────────────────────────── */}
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
