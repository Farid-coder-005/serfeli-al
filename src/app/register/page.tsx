"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    try {
      const resp = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await resp.json();
      
      if (!resp.ok) {
        throw new Error(data.message || "Qeydiyyat zamanı xəta baş verdi");
      }

      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
      });
    } catch (err: any) {
      setErrorMsg(err.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden w-full">
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />
      
      <div className="w-full max-w-md relative z-10 my-10">
        <div className="text-center mb-10">
          <Link href="/" className="inline-block group">
            <h1 className="text-4xl font-black text-[#09233f] tracking-tighter mb-2 group-hover:scale-105 transition-transform">
              Sərfəli<span className="text-[#FF5500]">.al</span>
            </h1>
          </Link>
          <p className="text-gray-500 font-medium">Bizə qoşulun, qazanın</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-[#FF5500]/5 p-10 sm:p-12">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight mb-2">Qeydiyyat</h2>
            <p className="text-sm text-gray-400 font-medium">Yeni hesab yaratmaq üçün məlumatları daxil edin</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-100 text-center">
                {errorMsg}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1F1F1F] uppercase tracking-widest ml-1">Ad və Soyad</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-300 group-focus-within:text-[#FF5500] transition-colors" />
                </div>
                <input 
                  type="text" 
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Məs: Əli Əliyev"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#FF5500]/10 focus:border-[#FF5500] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1F1F1F] uppercase tracking-widest ml-1">E-poçt ünvanı</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-300 group-focus-within:text-[#FF5500] transition-colors" />
                </div>
                <input 
                  type="email" 
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nümunə@mail.com"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#FF5500]/10 focus:border-[#FF5500] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black text-[#1F1F1F] uppercase tracking-widest ml-1">Şifrə</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-300 group-focus-within:text-[#FF5500] transition-colors" />
                </div>
                <input 
                  type="password" 
                  required
                  minLength={6}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#FF5500]/10 focus:border-[#FF5500] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-[#FF5500] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#E64D00] active:scale-[0.98] disabled:opacity-70 disabled:cursor-wait uppercase tracking-widest"
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>QEYDİYYATDAN KEÇ <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-sm font-bold text-gray-400">
          Artıq hesabınız var? <Link href="/login" className="text-[#FF5500] font-black hover:underline">Daxil olun</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-100 mx-auto w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF5500]" /> 256-bit SSL Təhlükəsizlik
        </div>
      </div>
    </div>
  );
}
