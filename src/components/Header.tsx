"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import {
  Heart, Coins, User, Menu, X,
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
      <header role="banner" className="bg-white sticky top-0 z-[9999] border-b border-gray-200 py-3">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-6">
            
            {/* Logo */}
            <Link href="/" className="shrink-0 flex items-center">
              <Image
                src="/logo.png"
                alt="Sərfəli.al"
                width={160}
                height={40}
                className="h-[35px] sm:h-[45px] w-auto object-contain"
                priority
              />
            </Link>

            {/* Search Bar */}
            <div className="flex-1 max-w-[600px] hidden md:block">
              <SearchBar />
            </div>

            {/* User Actions */}
            <div className="flex items-center gap-6 shrink-0">
              <Link href="/wishlist" className="flex flex-col items-center text-[#222222] hover:text-[#FF5500] transition-colors group">
                <Heart className="w-6 h-6 stroke-[1.5] group-hover:fill-[#FF5500]/10" />
                <span className="text-[10px] sm:text-[11px] mt-1 font-bold">Merkzettel</span>
              </Link>
              {isLoggedIn ? (
                <Link href="/dashboard" className="flex flex-col items-center text-[#222222] hover:text-[#FF5500] transition-colors group">
                  <User className="w-6 h-6 stroke-[1.5] group-hover:stroke-[#FF5500]" />
                  <span className="text-[10px] sm:text-[11px] mt-1 font-bold">Mein Sərfəli</span>
                </Link>
              ) : (
                <Link href="/login" className="flex flex-col items-center text-[#222222] hover:text-[#FF5500] transition-colors group">
                  <User className="w-6 h-6 stroke-[1.5] group-hover:stroke-[#FF5500]" />
                  <span className="text-[10px] sm:text-[11px] mt-1 font-bold">Mein Sərfəli</span>
                </Link>
              )}
              {/* Mobile menu button */}
              <button
                className="md:hidden flex flex-col items-center text-[#222222] transition-colors"
                onClick={() => setMobileOpen(true)}
              >
                <Menu className="w-6 h-6 stroke-[1.5]" />
                <span className="text-[10px] mt-1 font-bold">Menü</span>
              </button>
            </div>
          </div>
          
          {/* Mobile Search */}
          <div className="mt-3 md:hidden">
            <SearchBar />
          </div>
        </div>
      </header>

      {/* Second Row (Sub-nav) */}
      <nav className="bg-white hidden md:block border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex items-center gap-8 overflow-x-auto no-scrollbar py-3">
            {CATEGORIES.map(({ label, icon: Icon, href }) => {
              const isActive = pathname === href;
              return (
                <li key={label} className="shrink-0">
                  <Link 
                    href={href} 
                    className={`flex items-center gap-2 text-[13px] transition-colors font-bold ${isActive ? 'text-[#FF5500]' : 'text-[#222222] hover:text-[#FF5500]'}`}
                  >
                    <Icon className="w-4 h-4 stroke-[2]" />
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <div
        id="mobile-nav"
        role="navigation"
        aria-hidden={!mobileOpen}
        className={[
          "fixed left-0 right-0 z-[9998] bg-white shadow-xl",
          "overflow-y-auto transition-all duration-300 ease-in-out",
          mobileOpen ? "top-[120px] max-h-[calc(100vh-120px)] opacity-100" : "top-[120px] max-h-0 opacity-0 pointer-events-none",
        ].join(" ")}
      >
        <div className="px-6 py-6 space-y-2">
          <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
            <span className="font-bold text-lg text-[#222222]">Kategorien</span>
            <button onClick={() => setMobileOpen(false)} className="p-2 text-gray-500 hover:text-red-500">
               <X className="w-6 h-6" />
            </button>
          </div>
          {CATEGORIES.map(({ label, icon: Icon, href }) => (
            <Link
              key={label}
              href={href}
              className="flex items-center gap-4 py-3 text-[15px] font-bold text-[#222222] hover:text-[#FF5500]"
              onClick={() => setMobileOpen(false)}
            >
              <Icon className="w-5 h-5" />
              {label}
            </Link>
          ))}
          <div className="pt-6 mt-6 border-t border-gray-100">
             {isLoggedIn ? (
               <button
                  onClick={() => { signOut(); setMobileOpen(false); }}
                  className="w-full text-left py-3 text-[15px] font-bold text-red-600"
               >
                 Çıxış
               </button>
             ) : (
                <Link
                  href="/login"
                  className="block w-full py-3 text-[15px] font-bold text-[#FF5500]"
                  onClick={() => setMobileOpen(false)}
                >
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
          className="fixed inset-0 z-[9997] bg-black/50 transition-opacity"
        />
      )}
    </div>
  );
}
