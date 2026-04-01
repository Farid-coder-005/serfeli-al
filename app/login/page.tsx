"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  ShieldCheck, 
  Globe,
  User,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function LoginPage() {
  const { login } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      login(email || "ferid@example.al");
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#1E3A8A]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#EA580C]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        {/* Logo / Branding */}
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <h1 className="text-4xl font-black text-[#1E3A8A] tracking-tighter mb-2 group-hover:scale-105 transition-transform">
              Serfeli<span className="text-[#EA580C]">.al</span>
            </h1>
          </Link>
          <p className="text-gray-500 font-medium">Ağıllı alış-verişə xoş gəldiniz</p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-[#1E3A8A]/5 p-10 sm:p-12">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#1E3A8A] tracking-tight mb-2">Daxil Olun</h2>
            <p className="text-sm text-gray-400 font-medium">Hesabınıza daxil olmaq üçün məlumatları doldurun</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest ml-1">E-poçt ünvanı</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300 group-focus-within:text-[#1E3A8A] transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  placeholder="nümunə@mail.com"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#1E3A8A]/5 focus:border-[#1E3A8A] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between ml-1">
                <label className="text-[10px] font-black text-[#1E3A8A] uppercase tracking-widest">Şifrə</label>
                <Link href="#" className="text-[10px] font-black text-[#EA580C] uppercase tracking-widest hover:underline">Şifrəni unutmusunuz?</Link>
              </div>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300 group-focus-within:text-[#1E3A8A] transition-colors" />
                </div>
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#1E3A8A]/5 focus:border-[#1E3A8A] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 py-2">
              <input 
                type="checkbox" 
                id="remember"
                className="w-5 h-5 rounded-lg border-gray-100 text-[#1E3A8A] focus:ring-[#1E3A8A]"
              />
              <label htmlFor="remember" className="text-sm font-bold text-gray-500 cursor-pointer select-none">Məni xatırla</label>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 bg-[#1E3A8A] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#1a3275] shadow-xl shadow-blue-500/10 transition-all flex items-center justify-center gap-3 group active:scale-95 disabled:opacity-70 disabled:cursor-wait"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Daxil Ol <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="relative my-10">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-100"></div>
            </div>
            <div className="relative flex justify-center text-[10px] font-black uppercase tracking-[0.2em]">
              <span className="bg-white px-4 text-gray-300">Və ya daxil olun</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center py-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all group">
              <Globe className="w-5 h-5 text-gray-400 group-hover:text-[#1E3A8A] transition-colors" />
            </button>
            <button className="flex items-center justify-center py-4 bg-gray-50 border border-gray-100 rounded-2xl hover:bg-white hover:border-gray-200 hover:shadow-lg transition-all group">
              <User className="w-5 h-5 text-gray-400 group-hover:text-[#EA580C] transition-colors" />
            </button>
          </div>
        </div>

        {/* Footer Link */}
        <p className="text-center mt-10 text-sm font-bold text-gray-400">
          Hesabınız yoxdur? <Link href="#" className="text-[#EA580C] font-black hover:underline">Qeydiyyatdan keçin</Link>
        </p>

        {/* Security Badge */}
        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-100 mx-auto w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-green-500" /> 256-bit SSL Təhlükəsizlik
        </div>
      </div>
    </div>
  );
}
