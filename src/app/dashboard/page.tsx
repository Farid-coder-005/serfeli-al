"use client";

import React from "react";
import Link from "next/link";
import {
  Wallet,
  Clock,
  TrendingUp,
  Settings,
  LogOut,
  UserCircle,
  CreditCard,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import { useSession, signOut } from "next-auth/react";

export default function DashboardPage() {
  const { data: session } = useSession();
  const user = session?.user as any;
  const logout = () => signOut();

  // If not logged in, this page should ideally redirect, but for mock purposes we show a fallback
  if (!user) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center p-4">
        <div className="bg-white rounded-[3rem] border border-gray-100 p-12 text-center shadow-xl max-w-md w-full">
          <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <UserCircle className="w-10 h-10 text-gray-300" />
          </div>
          <h2 className="text-2xl font-black text-[#057850] mb-4">Giriş edilməyib</h2>
          <p className="text-gray-500 mb-8">Dashboard-u görmək üçün zəhmət olmasa daxil olun.</p>
          <Link href="/login" className="inline-flex items-center justify-center w-full py-4 px-6 bg-[#057850] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#046241] transition-all shadow-lg active:scale-95">
            Giriş səhifəsinə keç
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-20 relative">
      {/* Global dot-grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

      {/* Hero / Header Section */}
      <section className="bg-gradient-to-br from-[#057850] to-[#046241] py-20 relative border-b border-[#057850]/10">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-white border-4 border-white/20 p-1 shadow-2xl flex items-center justify-center text-4xl sm:text-5xl font-black text-[#057850] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white"></div>
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">{user.name?.[0] || "U"}</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {user.name || "İstifadəçi"}
                  </h1>
                  <span className="px-3 py-1 bg-[#EA580C] text-white text-[10px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-orange-500/20 leading-none">PREMIUM</span>
                </div>
                <p className="text-gray-300 font-medium flex items-center gap-2">
                  <UserCircle className="w-4 h-4 opacity-50" /> {user.email || ""}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3.5 bg-white/10 backdrop-blur-md border border-white/20 text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-white/20 transition-all flex items-center gap-2">
                 <Settings className="w-4 h-4" /> Kökləmələr
              </button>
              <button 
                onClick={logout}
                className="px-8 py-3.5 bg-[#EA580C] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#d94e0b] shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 active:scale-95"
              >
                <LogOut className="w-4 h-4" /> Çıxış
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-left">
          
          {/* Main Dashboard Info */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Balance Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-[#057850]/5 hover:shadow-2xl hover:shadow-[#057850]/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#057850]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-green-50 rounded-2xl flex items-center justify-center text-[#057850] shadow-inner group-hover:rotate-12 transition-transform">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-[#057850] bg-green-50 px-3 py-1.5 rounded-full tracking-widest">+12% Ay/Ay</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Kəşbək Balansı</p>
                <h3 className="text-5xl font-black text-[#057850] tracking-tighter">
                  {(user.balance || 45.20).toFixed(2)} <span className="text-2xl ml-1 text-gray-300 font-bold">₼</span>
                </h3>
              </div>

              <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-[#057850]/5 hover:shadow-2xl hover:shadow-[#057850]/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA580C]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#EA580C] shadow-inner group-hover:-rotate-12 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-[#EA580C] bg-orange-50 px-3 py-1.5 rounded-full tracking-widest">Real qənaət</span>
                </div>
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.25em] mb-2">Ümumi Qənaət</p>
                <h3 className="text-5xl font-black text-[#057850] tracking-tighter">
                  452.40 <span className="text-2xl ml-1 text-gray-300 font-bold">₼</span>
                </h3>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-[#057850]/5 p-8 lg:p-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black text-[#057850] tracking-tight flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#057850]" /> Son Əməliyyatlar
                </h2>
                <button className="text-sm font-black text-[#057850] hover:text-[#046241] transition-colors uppercase tracking-widest">Hamısı</button>
              </div>

              <div className="space-y-6">
                {[
                  { store: "Kontakt Home", item: "iPhone 15 Pro Max", amount: "+45.20 ₼", status: "Tamamlanıb", date: "Bugün, 14:20" },
                  { store: "Baku Electronics", item: "Samsung S24 Ultra", amount: "+38.40 ₼", status: "Gözləmədə", date: "Dünən, 18:45" },
                  { store: "İrşad", item: "Xiaomi Pad 6", amount: "+12.10 ₼", status: "Tamamlanıb", date: "24 Apr, 11:30" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2rem] border border-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center font-black text-[#057850] shadow-sm transform group-hover:scale-110 transition-transform">
                        {item.store[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#057850] mb-0.5">{item.store}</span>
                        <span className="text-xs font-bold text-gray-400">{item.item}</span>
                        <span className="text-[10px] text-gray-300 mt-1 font-medium">{item.date}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-lg font-black text-[#057850]">{item.amount}</span>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${item.status === 'Tamamlanıb' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Info */}
          <div className="flex flex-col gap-8 text-center">
            {/* Profile Progress */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-[#057850]/5 p-10 flex flex-col items-center">
              <h3 className="text-xl font-black text-[#057850] mb-8 uppercase tracking-widest">Profil Səviyyəsi</h3>
              <div className="relative w-48 h-48 mb-8 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90">
                  <circle cx="96" cy="96" r="88" strokeWidth="12" stroke="#F9FAFB" fill="transparent" className="rounded-full" />
                  <circle cx="96" cy="96" r="88" strokeWidth="12" stroke="#057850" strokeDasharray="552.92" strokeDashoffset="138.23" fill="transparent" strokeLinecap="round" className="transition-all duration-1000 ease-out" />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-5xl font-black text-[#057850] tracking-tighter">75%</span>
                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">Xallar</span>
                </div>
              </div>
              <p className="text-sm text-gray-500 font-medium mb-8 leading-relaxed px-4">
                Növbəti seviyyə üçün <span className="text-[#057850] font-black">250 AZN</span> dəyərində alış lazımdır.
              </p>
              <button className="w-full py-5 bg-gray-50 border border-gray-100 rounded-2xl text-[11px] font-black text-[#057850] hover:bg-white hover:border-[#057850]/20 hover:shadow-lg transition-all uppercase tracking-[0.2em]">
                Səviyyəni Yoxla
              </button>
            </div>

            {/* Refer a Friend card */}
            <div className="bg-gradient-to-br from-[#057850] to-[#046241] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-[#057850]/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-2xl font-black mb-6 tracking-tight text-left">Dostlarını gətir, <br/>pulu bölüşün!</h3>
              <p className="text-green-50/80 text-sm font-medium mb-10 leading-relaxed text-left">Hər dəvət etdiyiniz dost üçün 5 AZN kəşbək qazanın.</p>
              <button className="w-full py-4 bg-white text-[#057850] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-green-50 shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-3">
                 <CreditCard className="w-4 h-4" /> Linki Kopyala
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


