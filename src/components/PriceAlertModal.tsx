"use client";

import React, { useState, useEffect } from "react";
import { X, Bell, Mail, Info, TrendingDown, AlertCircle, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

interface PriceAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: string;
    name: string;
    currentPrice: number;
    historicalMin?: number;
  };
  userEmail?: string;
}

export default function PriceAlertModal({
  isOpen,
  onClose,
  product,
  userEmail = "",
}: PriceAlertModalProps) {
  const { t } = useLanguage();
  const [targetPrice, setTargetPrice] = useState<string>(
    (product.currentPrice * 0.9).toFixed(2)
  );
  const [email, setEmail] = useState(userEmail);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Update email if userEmail changes (e.g., after login)
  useEffect(() => {
    if (userEmail) setEmail(userEmail);
  }, [userEmail]);

  if (!isOpen) return null;

  const currentPrice = product.currentPrice;
  const targetVal = parseFloat(targetPrice) || 0;
  const historicalMin = product.historicalMin || currentPrice * 0.8; // Fallback

  // Gauge Logic
  const getFeasibility = () => {
    if (targetVal >= currentPrice) return { label: t("alreadyAtPrice"), color: "bg-gray-400", text: "text-[#1E293B]", percent: 100 };
    
    const dropPercent = ((currentPrice - targetVal) / currentPrice) * 100;
    
    if (targetVal >= historicalMin) {
      return { 
        label: t("feasibilityProbable"), 
        color: "bg-[#1da661]", 
        text: "text-[#1da661]", 
        percent: Math.max(70, 100 - dropPercent),
        info: t("feasibleInfo")
      };
    } else if (targetVal >= historicalMin * 0.85) {
      return { 
        label: t("feasibilityDifficult"), 
        color: "bg-orange-500", 
        text: "text-orange-500", 
        percent: 40,
        info: t("difficultInfo")
      };
    } else {
      return { 
        label: t("feasibilityUnlikely"), 
        color: "bg-red-500", 
        text: "text-red-500", 
        percent: 15,
        info: t("unlikelyInfo")
      };
    }
  };

  const feasibility = getFeasibility();

  const handleSave = async () => {
    if (!product.id) {
      setStatus("error");
      setMessage(t("productIdNotFound"));
      return;
    }

    if (!email || !targetPrice) {
      setStatus("error");
      setMessage(t("fillAllFields"));
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch("/api/price-alerts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          productId: product.id,
          productName: product.name,
          targetPrice: targetVal,
          currentPriceAtAlert: currentPrice,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Xəta baş verdi");
      }

      setStatus("success");
      setMessage(t("alertSaved"));
      setTimeout(() => {
        onClose();
        setStatus("idle");
      }, 2000);
    } catch (err) {
      setStatus("error");
      setMessage(t("alertError"));
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2rem] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="relative p-8 bg-[#002B55] text-white">
          <button 
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-white/10 rounded-2xl">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight leading-tight">{t("priceAlertTitle")}</h2>
              <p className="text-white/70 text-xs font-medium uppercase tracking-widest mt-0.5">{t("alertsTracks")}</p>
            </div>
          </div>
          
          <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">
            <div className="text-sm font-medium opacity-80">{t("currentPriceLabel")}</div>
            <div className="text-2xl font-black">{currentPrice.toFixed(2)} ₼</div>
          </div>
        </div>

        {/* Body */}
        <div className="p-8">
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-10 h-10 text-[#1da661]" />
              </div>
              <h3 className="text-xl font-black text-slate-800 mb-2">{t("successTitle")}</h3>
              <p className="text-[#1E293B] font-medium">{message}</p>
            </div>
          ) : (
            <>
              {/* Target Price Input */}
              <div className="mb-8">
                <label className="block text-xs font-black text-[#1E293B] uppercase tracking-widest mb-3">
                  {t("desiredPrice")}
                </label>
                <div className="relative">
                  <input
                    type="number"
                    value={targetPrice}
                    onChange={(e) => setTargetPrice(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 text-3xl font-black text-slate-800 focus:border-[#002B55] focus:ring-4 focus:ring-blue-50 outline-none transition-all"
                    placeholder="0.00"
                  />
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 text-xl font-bold text-[#1E293B]">₼</span>
                </div>
              </div>

              {/* Feasibility Gauge */}
              <div className="mb-8 p-5 bg-slate-50 rounded-2xl border border-slate-100">
                <div className="flex justify-between items-center mb-3">
                  <span className="text-xs font-bold text-[#1E293B]">{t("feasibilityCheck")}</span>
                  <span className={`text-xs font-black uppercase tracking-wider ${feasibility.text}`}>
                    {feasibility.label}
                  </span>
                </div>
                <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden mb-3">
                  <div 
                    className={`h-full ${feasibility.color} transition-all duration-500`}
                    style={{ width: `${feasibility.percent}%` }}
                  />
                </div>
                {feasibility.info && (
                  <div className="flex gap-2 items-start text-[11px] text-[#1E293B] leading-tight">
                    <Info size={14} className="shrink-0 mt-0.5" />
                    {feasibility.info}
                  </div>
                )}
              </div>

              {/* Email Input */}
              <div className="mb-8">
                <label className="block text-xs font-black text-[#1E293B] uppercase tracking-widest mb-3">
                  {t("emailForAlert")}
                </label>
                <div className="relative">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1E293B] w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-slate-800 focus:border-[#002B55] outline-none transition-all"
                    placeholder={t("emailPlaceholder")}
                  />
                </div>
              </div>

              {status === "error" && (
                <div className="mb-6 p-4 bg-red-50 border border-red-100 rounded-xl flex items-center gap-3 text-red-600 text-xs font-bold">
                  <AlertCircle size={16} />
                  {message}
                </div>
              )}

              {/* Save Button */}
              <button
                onClick={handleSave}
                disabled={status === "loading"}
                className={`w-full py-4 rounded-2xl bg-[#002B55] text-white font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-200 hover:bg-[#004a85] hover:-translate-y-0.5 active:translate-y-0 ${
                  status === "loading" ? "opacity-70 cursor-not-allowed" : ""
                }`}
              >
                {status === "loading" ? t("saving") : t("saveAlert")}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
