"use client";

import React from "react";
import { Wallet, Info, ArrowUpRight, History, Gift } from "lucide-react";
import { useSession } from "next-auth/react";

export default function CashbackPage() {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="min-h-screen bg-[#F9FAFB] font-sans pb-20">
      {/* Page Header / Hero Area */}
      <section className="bg-[#057850] py-12 sm:py-16 relative overflow-hidden border-b border-[#046241]">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.02] pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-4 drop-shadow-sm">
            Cashback Balansınız
          </h1>
          <p className="text-green-50/80 text-lg font-medium max-w-2xl mx-auto leading-relaxed">
            Sərfəli.al ilə alış-verişlərinizdən qazandığınız kəşbək məbləğlərini buradan izləyə bilərsiniz.
          </p>
        </div>
      </section>

      {/* Main Content Container */}
      <main className="max-w-4xl mx-auto px-6 -mt-10 relative z-20">
        <div className="flex flex-col gap-8">
          
          {/* Main Balance Card */}
          <div className="bg-white rounded-[3rem] p-10 sm:p-14 border border-gray-100 shadow-2xl shadow-green-900/5 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#057850]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 transition-transform duration-700 group-hover:scale-110"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="w-20 h-20 bg-[#f0fdf4] rounded-[2rem] flex items-center justify-center text-[#057850] mb-8 shadow-inner border border-green-50">
                <Wallet className="w-10 h-10" strokeWidth={2.5} />
              </div>
              
              <span className="text-[11px] font-black text-gray-400 uppercase tracking-[0.35em] mb-4">Cari Balans</span>
              
              <div className="flex items-baseline gap-2 mb-8">
                <span className="text-7xl sm:text-8xl font-black text-[#057850] tracking-tighter">0.00</span>
                <span className="text-3xl font-bold text-gray-300">AZN</span>
              </div>
              
              <div className="w-full h-px bg-gray-50 mb-8"></div>
              
              <p className="text-gray-500 font-medium leading-relaxed max-w-lg mb-0 text-[15px]">
                serfeli.al vasitəsilə tərəfdaş mağazalardan etdiyiniz hər alış-verişdən kəşbək qazanın. Qazandığınız məbləğlər burada görünəcək.
              </p>
            </div>
          </div>

          {/* Info Grid (Optional but adds to the richness requested) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-xl shadow-green-900/5 flex items-start gap-5">
              <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shrink-0">
                <Info className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-gray-800 mb-2">Necə işləyir?</h3>
                <p className="text-sm text-gray-500 leading-relaxed font-medium">
                  Mağazaya keçid etməzdən əvvəl serfeli.al-a daxil olun və kəşbək təklifini aktivləşdirin.
                </p>
              </div>
            </div>
            
            <div className="bg-[#f0fdf4] rounded-[2.5rem] p-8 border border-[#dcfce7] shadow-xl shadow-green-900/5 flex items-start gap-5 group cursor-pointer hover:bg-[#e4f9eb] transition-colors">
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-[#057850] shrink-0 shadow-sm transition-transform group-hover:scale-110">
                <Gift className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#057850] mb-2">Məbləği çıxar</h3>
                <p className="text-sm text-[#057850]/70 leading-relaxed font-medium">
                  Balansınız 10 AZN-ə çatdıqda istənilən bank kartına və ya mobil nömrəyə çıxarış edə bilərsiniz.
                </p>
              </div>
            </div>
          </div>

          {/* History Placeholder */}
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-green-900/5 p-10 sm:p-12">
            <div className="flex items-center justify-between mb-10">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight flex items-center gap-3">
                <History className="w-6 h-6 text-[#057850]" /> Son Əməliyyatlar
              </h2>
            </div>
            
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40">
              <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                <ArrowUpRight className="w-10 h-10 text-gray-300" />
              </div>
              <p className="text-lg font-bold text-gray-400">Hələ ki, heç bir əməliyyat yoxdur</p>
              <p className="text-sm text-gray-300 mt-2">Alış-veriş etdikcə kəşbəkləriniz burada sıralanacaq</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
