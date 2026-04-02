"use client";

import Link from "next/link";
import { Mail, Phone, MapPin, ArrowLeft, Send } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-96px)] bg-[#F8FAFC] relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(5,120,80,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%)", filter: "blur(70px)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">

        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#057850] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Ana səhifəyə qayıt
        </Link>

        {/* Heading */}
        <div className="mb-14 text-center">
          <span className="inline-block text-[11px] font-black text-[#057850] tracking-[0.25em] uppercase mb-4">
            Dəstək Mərkəzi
          </span>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1E3A8A] tracking-tight mb-4">
            Bizimlə Əlaqə
          </h1>
          <p className="text-gray-500 text-lg max-w-xl mx-auto font-medium">
            Sualınız, təklifiniz və ya probleminiz var? Komandamız sizə kömək etməyə hazırdır.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">

          {/* Contact info cards */}
          <div className="lg:col-span-2 flex flex-col gap-5">
            {[
              {
                icon: Mail, label: "E-poçt", value: "info@serfeli.al",
                sub: "24 saat ərzində cavab veririk",
                color: "bg-blue-50 text-blue-600",
              },
              {
                icon: Phone, label: "Telefon", value: "+994 12 000 00 00",
                sub: "B.e – Cümə, 09:00 – 18:00",
                color: "bg-green-50 text-[#057850]",
              },
              {
                icon: MapPin, label: "Ünvan", value: "Bakı, Azərbaycan",
                sub: "Nizami küçəsi 203",
                color: "bg-orange-50 text-orange-500",
              },
            ].map(({ icon: Icon, label, value, sub, color }) => (
              <div key={label}
                className="flex items-start gap-5 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm hover:shadow-lg transition-shadow">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{label}</p>
                  <p className="text-base font-bold text-[#1E3A8A]">{value}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{sub}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form
            className="lg:col-span-3 bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-sm space-y-6"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  Ad Soyad
                </label>
                <input
                  type="text"
                  placeholder="Adınız..."
                  className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#057850]/20 focus:border-[#057850] focus:bg-white transition-all"
                />
              </div>
              <div>
                <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                  E-poçt
                </label>
                <input
                  type="email"
                  placeholder="email@example.az"
                  className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#057850]/20 focus:border-[#057850] focus:bg-white transition-all"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Mövzu
              </label>
              <input
                type="text"
                placeholder="Mesajınızın mövzusu..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#057850]/20 focus:border-[#057850] focus:bg-white transition-all"
              />
            </div>
            <div>
              <label className="block text-[11px] font-black text-gray-400 uppercase tracking-widest mb-2">
                Mesaj
              </label>
              <textarea
                rows={5}
                placeholder="Mesajınızı buraya yazın..."
                className="w-full px-4 py-3 rounded-2xl border border-gray-100 bg-gray-50 text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#057850]/20 focus:border-[#057850] focus:bg-white transition-all resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full flex items-center justify-center gap-3 bg-[#057850] hover:bg-[#046b47] text-white font-black text-sm uppercase tracking-widest py-4 rounded-2xl shadow-lg shadow-green-900/10 transition-all active:scale-[0.98]"
            >
              <Send className="w-4 h-4" />
              Göndər
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
