"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, ArrowLeft, Send, CheckCircle2, AlertCircle } from "lucide-react";
import { Logo } from "@/components/Logo";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setStatus("idle");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message);
      } else {
        setStatus("error");
        setMessage(data.error || "Xəta baş verdi");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Serverlə əlaqə kəsildi");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB] flex flex-col items-center justify-center p-4 relative font-sans overflow-hidden">
      {/* Decorative Blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FF5500]/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-10">
          <div className="w-full flex justify-center mb-2">
            <Logo 
              variant="dark" 
              className="items-center" 
            />
          </div>
          <p className="text-gray-500 font-medium">Şifrə bərpası</p>
        </div>

        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl p-10 sm:p-12 transition-all">
          <div className="mb-8">
            <h2 className="text-2xl font-black text-[#1F1F1F] tracking-tight mb-2">Şifrəni Sıfırla</h2>
            <p className="text-sm text-gray-400 font-medium leading-relaxed">
              Email ünvanınızı daxil edin, biz sizə şifrə sıfırlama linki göndərəcəyik.
            </p>
          </div>

          {status === "success" ? (
            <div className="space-y-6 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10 text-green-500" />
              </div>
              <p className="text-green-600 font-bold bg-green-50 p-4 rounded-xl border border-green-100">
                {message}
              </p>
              <Link 
                href="/login" 
                className="inline-flex items-center gap-2 text-sm font-black text-[#FF5500] hover:underline"
              >
                <ArrowLeft size={16} /> GİRİŞ SƏHİFƏSİNƏ QAYIT
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {status === "error" && (
                <div className="bg-red-50 text-red-600 p-4 rounded-xl text-xs font-bold border border-red-100 flex items-center gap-3 animate-in slide-in-from-top-2">
                  <AlertCircle size={16} /> {message}
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

              <button 
                type="submit"
                disabled={isLoading}
                className="w-full py-4 bg-[#FF5500] text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all hover:bg-[#E64D00] active:scale-[0.98] disabled:opacity-70 uppercase tracking-widest shadow-lg shadow-[#FF5500]/20"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>LİNKİ GÖNDƏR <Send size={18} /></>
                )}
              </button>

              <Link 
                href="/login" 
                className="block text-center text-xs font-black text-gray-400 hover:text-[#FF5500] transition-colors uppercase tracking-widest"
              >
                Geri qayıt
              </Link>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
