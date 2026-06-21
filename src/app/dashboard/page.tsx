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
  Copy,
  Store,
  Calendar,
  Tag,
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
            <UserCircle className="w-10 h-10 text-[#1E293B]" />
          </div>
          <h2 className="text-2xl font-black text-[#002B55] mb-4">Giriş edilməyib</h2>
          <p className="text-[#1E293B] mb-8">Dashboard-u görmək üçün zəhmət olmasa daxil olun.</p>
          <Link href="/login" className="inline-flex items-center justify-center w-full py-4 px-6 bg-[#FF6B00] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#E64D00] transition-all shadow-lg active:scale-95">
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
      <section className="bg-gradient-to-br from-[#26496B] to-[#002B55] py-20 relative border-b border-slate-800">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="flex items-center gap-8">
              <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-[2.5rem] bg-white border-4 border-white/20 p-1 shadow-2xl flex items-center justify-center text-4xl sm:text-5xl font-black text-[#002B55] group relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-gray-50 to-white"></div>
                <span className="relative z-10 group-hover:scale-110 transition-transform duration-500">{user.name?.[0] || "U"}</span>
              </div>
              <div className="flex flex-col text-left">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                    {user.name || "İstifadəçi"}
                  </h1>
                  <span className="px-3 py-1 bg-[#FF6B00] text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-orange-500/20 leading-none">PREMIUM</span>
                </div>
                <p className="text-[#1E293B] font-medium flex items-center gap-2">
                  <UserCircle className="w-4 h-4 text-[#1E293B]" /> {user.email || ""}
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <button className="px-8 py-3.5 border border-slate-700 bg-slate-800/50 hover:bg-slate-700 text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all flex items-center gap-2">
                 <Settings className="w-4 h-4" /> Kökləmələr
              </button>
              <button 
                onClick={logout}
                className="px-8 py-3.5 bg-[#FF6B00] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:bg-[#E64D00] shadow-xl shadow-orange-500/20 transition-all flex items-center gap-2 active:scale-95"
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
              <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-inner group-hover:rotate-12 transition-transform">
                    <Wallet className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-[#FF6B00] bg-orange-50 px-3 py-1.5 rounded-full tracking-widest">+12% Ay/Ay</span>
                </div>
                <p className="text-[10px] font-black text-[#1E293B] uppercase tracking-[0.25em] mb-2">Kəşbək Balansı</p>
                <h3 className="text-5xl font-black text-[#002B55] tracking-tighter mb-6">
                  {(user.balance || 45.20).toFixed(2)} <span className="text-2xl ml-1 text-[#1E293B] font-bold">₼</span>
                </h3>
                <Link href="/coupon-store" className="block w-full py-4 bg-[#FF6B00] text-white rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-[#E64D00] transition-all text-center shadow-lg shadow-orange-500/20 active:scale-95">
                  Kupon Mağazası
                </Link>
              </div>

              <div className="group bg-white rounded-[2.5rem] p-10 border border-gray-100 shadow-xl shadow-slate-900/5 hover:shadow-2xl hover:shadow-slate-900/10 transition-all relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF6B00]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
                <div className="flex items-center justify-between mb-8">
                  <div className="w-14 h-14 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF6B00] shadow-inner group-hover:-rotate-12 transition-transform">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-black text-[#FF6B00] bg-orange-50 px-3 py-1.5 rounded-full tracking-widest">Real qənaət</span>
                </div>
                <p className="text-[10px] font-black text-[#1E293B] uppercase tracking-[0.25em] mb-2">Ümumi Qənaət</p>
                <h3 className="text-5xl font-black text-[#002B55] tracking-tighter">
                  452.40 <span className="text-2xl ml-1 text-[#1E293B] font-bold">₼</span>
                </h3>
              </div>
            </div>

            {/* Quick Actions / Recent Activity */}
            <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-slate-900/5 p-8 lg:p-12">
              <div className="flex items-center justify-between mb-12">
                <h2 className="text-2xl font-black text-[#002B55] tracking-tight flex items-center gap-3">
                  <Clock className="w-6 h-6 text-[#FF6B00]" /> Son Əməliyyatlar
                </h2>
                <button className="text-sm font-black text-[#002B55] hover:text-[#26496B] transition-colors uppercase tracking-widest">Hamısı</button>
              </div>

              <div className="space-y-6">
                {[
                  { store: "Kontakt Home", item: "iPhone 15 Pro Max", amount: "+45.20 ₼", status: "Tamamlanıb", date: "Bugün, 14:20" },
                  { store: "Baku Electronics", item: "Samsung S24 Ultra", amount: "+38.40 ₼", status: "Gözləmədə", date: "Dünən, 18:45" },
                  { store: "İrşad", item: "Xiaomi Pad 6", amount: "+12.10 ₼", status: "Tamamlanıb", date: "24 Apr, 11:30" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-6 bg-gray-50/50 rounded-[2rem] border border-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-lg transition-all group cursor-pointer">
                    <div className="flex items-center gap-5">
                      <div className="w-14 h-14 bg-white rounded-2xl border border-gray-100 flex items-center justify-center font-black text-[#FF6B00] shadow-sm transform group-hover:scale-110 transition-transform">
                        {item.store[0]}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-black text-[#002B55] mb-0.5">{item.store}</span>
                        <span className="text-xs font-bold text-[#1E293B]">{item.item}</span>
                        <span className="text-[10px] text-[#1E293B] mt-1 font-medium">{item.date}</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-2">
                      <span className="text-lg font-black text-[#002B55]">{item.amount}</span>
                      <span className={`text-[9px] font-black uppercase tracking-[0.2em] px-3 py-1 rounded-lg ${item.status === 'Tamamlanıb' ? 'bg-orange-50 text-[#FF6B00] border border-orange-100' : 'bg-slate-100 text-[#002B55] border border-slate-200'}`}>
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
            {/* Active Coupons */}
            <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-900/5 p-10 flex flex-col">
              <h3 className="text-xl font-black text-[#002B55] mb-8 uppercase tracking-widest text-left" style={{ fontFamily: "'Montserrat', sans-serif" }}>Aktiv Kuponlarım</h3>
              <div className="flex flex-col gap-4">
                {[
                  { store: "Kontakt Home", value: "50 AZN", code: "KNTKT50", expires: "15 İyul, 2026", logo: "K" },
                  { store: "Baku Electronics", value: "30 AZN", code: "BAKU30", expires: "01 Avg, 2026", logo: "B" },
                  { store: "İrşad", value: "20 AZN", code: "IRSHD20", expires: "20 İyun, 2026", logo: "İ" },
                ].map((coupon, i) => (
                  <div key={i} className="flex items-center gap-4 p-5 bg-gray-50/50 rounded-[1.5rem] border border-gray-50 hover:bg-white hover:border-gray-100 hover:shadow-lg transition-all group">
                    <div className="w-12 h-12 bg-white rounded-xl border border-gray-100 flex items-center justify-center font-black text-[#FF6B00] shadow-sm shrink-0 group-hover:scale-110 transition-transform" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                      {coupon.logo}
                    </div>
                    <div className="flex-1 min-w-0 text-left">
                      <div className="flex items-center gap-2 mb-1">
                        <Tag className="w-3 h-3 text-[#FF6B00]" />
                        <span className="text-sm font-black text-[#002B55]" style={{ fontFamily: "'Montserrat', sans-serif" }}>{coupon.value}</span>
                        <span className="text-xs font-bold text-[#1E293B]">— {coupon.store}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3 h-3 text-[#1E293B]/50" />
                        <span className="text-[10px] text-[#1E293B] font-medium" style={{ fontFamily: "'Nunito', sans-serif" }}>Bitiş: {coupon.expires}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => navigator.clipboard.writeText(coupon.code)}
                      className="shrink-0 px-4 py-2.5 bg-gray-100 hover:bg-[#FF6B00] hover:text-white text-[#002B55] rounded-xl text-[10px] font-black uppercase tracking-widest transition-all flex items-center gap-2 active:scale-95"
                      style={{ fontFamily: "'Montserrat', sans-serif" }}
                    >
                      <Copy className="w-3.5 h-3.5" /> Kopyala
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Refer a Friend card */}
            <div className="bg-gradient-to-br from-[#26496B] to-[#002B55] rounded-[2.5rem] p-10 text-white shadow-2xl shadow-slate-900/20 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700"></div>
              <h3 className="text-2xl font-black mb-4 tracking-tight text-left text-white" style={{ fontFamily: "'Montserrat', sans-serif" }}>Dostunu dəvət et, <br/>20 AZN qazanın!</h3>
              <p className="text-slate-200 text-sm font-medium mb-4 leading-relaxed text-left" style={{ fontFamily: "'Nunito', sans-serif" }}>Hər dəvət etdiyiniz dost üçün <span className="text-[#FF6B00] font-black">20 AZN</span> kəşbək qazanın.</p>
              <p className="text-[10px] text-slate-300 font-medium mb-8 leading-relaxed text-left border-t border-white/10 pt-4" style={{ fontFamily: "'Nunito', sans-serif" }}>Şərt: Dəvət olunan dost 90 gün ərzində minimum 20 AZN dəyərində alış-veriş etməlidir. Təsdiqdən sonra hər iki tərəfə 20 AZN kəşbək balansı təyin olunacaq.</p>
              <button className="w-full py-4 bg-white text-[#002B55] rounded-2xl text-[11px] font-black uppercase tracking-[0.2em] hover:bg-slate-50 shadow-lg shadow-black/10 transition-all flex items-center justify-center gap-3" style={{ fontFamily: "'Montserrat', sans-serif" }}>
                 <CreditCard className="w-4 h-4 text-[#FF6B00]" /> Linki Kopyala
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


