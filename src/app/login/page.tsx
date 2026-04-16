"use client";

import React, { useState, Suspense } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import { Mail, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/Logo";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg("");
    
    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (res?.error) {
      setErrorMsg(res.error);
      setIsLoading(false);
    } else {
      // Explicitly redirect to dashboard as requested, or fallback to callbackUrl
      const destination = callbackUrl && callbackUrl !== "/login" ? callbackUrl : "/dashboard";
      router.push(destination);
      router.refresh();
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] bg-[#F9FAFB] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden w-full">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
      
      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <Logo 
            variant="dark" 
            className="items-center" 
          />
          <p className="text-gray-500 font-medium">Ağıllı alış-verişə xoş gəldiniz</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-[#FF5500]/5 p-10 sm:p-12">
          <div className="mb-10">
            <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight mb-2">Daxil Olun</h2>
            <p className="text-sm text-gray-400 font-medium">Hesabınıza daxil olmaq üçün məlumatları doldurun</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {errorMsg && (
              <div className="bg-red-50 text-red-600 p-3 rounded-xl text-sm font-semibold border border-red-100 text-center">
                {errorMsg}
              </div>
            )}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="block w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl text-sm font-medium focus:ring-4 focus:ring-[#FF5500]/10 focus:border-[#FF5500] outline-none transition-all placeholder:text-gray-300"
                />
              </div>
              <div className="text-center pt-2">
                <Link 
                  href="/auth/forgot-password" 
                  className="text-[10px] font-black text-gray-400 hover:text-[#FF5500] transition-colors uppercase tracking-widest"
                >
                  Şifrəni unutmusunuz?
                </Link>
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
                <>DAXİL OL <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" /></>
              )}
            </button>
          </form>
        </div>

        <p className="text-center mt-10 text-sm font-bold text-gray-400">
          Hesabınız yoxdur? <Link href="/register" className="text-[#FF5500] font-black hover:underline">Qeydiyyatdan keçin</Link>
        </p>

        <div className="mt-12 flex items-center justify-center gap-2 text-[10px] font-black text-gray-300 uppercase tracking-widest bg-white/50 backdrop-blur-sm px-6 py-3 rounded-full border border-gray-100 mx-auto w-fit">
          <ShieldCheck className="w-3.5 h-3.5 text-[#FF5500]" /> 256-bit SSL Təhlükəsizlik
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center">Yüklənir...</div>}>
      <LoginForm />
    </Suspense>
  );
}
