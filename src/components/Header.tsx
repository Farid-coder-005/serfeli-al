"use client";

import Link from 'next/link';
import { Logo } from './Logo';
import { Search, Menu, UserCircle } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export function Header() {
  const { user, isLoggedIn } = useAuth();

  return (
    <header className="fixed top-0 left-0 w-full z-[9999] bg-white border-b border-gray-100 shadow-sm transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main row: Logo | Search | User/Menu */}
        <div className="flex items-center justify-between gap-8 h-24 transition-all">
          
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Logo />
          </div>

          {/* Desktop & Tablet Search */}
          <div className="hidden sm:flex flex-1 items-center max-w-2xl px-4">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-[#1E3A8A] transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-12 pr-4 py-3 border border-gray-100 rounded-2xl leading-5 bg-gray-50/50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] sm:text-sm transition-all shadow-sm"
                placeholder="Məhsul, marka və ya mağaza axtarın..."
              />
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Mobile: magnifying glass icon only */}
            <button className="sm:hidden p-2.5 rounded-xl text-gray-500 hover:text-[#1E3A8A] hover:bg-gray-50 transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {isLoggedIn ? (
              <Link href="/dashboard" className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-2xl bg-white border border-gray-100 hover:border-[#1E3A8A]/30 hover:shadow-lg hover:shadow-[#1E3A8A]/5 transition-all group">
                <div className="w-9 h-9 rounded-full bg-[#1E3A8A] flex items-center justify-center text-white font-bold group-hover:rotate-6 transition-transform">
                  {user?.name[0]}
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-bold text-[#1E3A8A]">{user?.name}</span>
                  <span className="text-xs font-black text-[#EA580C]">{user?.balance.toFixed(2)} ₼</span>
                </div>
              </Link>
            ) : (
              <Link href="/login" className="hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-2xl bg-[#1E3A8A] text-white font-bold text-sm hover:bg-[#1e3271] hover:shadow-xl hover:shadow-[#1E3A8A]/20 transition-all active:scale-[0.98]">
                <UserCircle className="w-4 h-4" />
                Giriş / Qeydiyyat
              </Link>
            )}

            {/* Mobile: hamburger */}
            <button className="sm:hidden p-2.5 rounded-xl text-gray-500 hover:text-[#1E3A8A] hover:bg-gray-50 transition-colors">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Search Bar wrapper */}
      <div className="sm:hidden px-4 pb-4 border-t border-gray-100/50 pt-2">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-3 border border-gray-100 rounded-2xl bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#1E3A8A]/20 focus:border-[#1E3A8A] text-sm transition-all shadow-sm"
            placeholder="Axtarış..."
          />
        </div>
      </div>
    </header>
  );
}

