"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Bell, 
  Trash2, 
  TrendingDown, 
  ArrowRight, 
  Search, 
  Calendar,
  AlertCircle,
  PackageSearch
} from "lucide-react";
import { useSession } from "next-auth/react";

export default function PriceAlertsPage() {
  const { data: session, status } = useSession();
  const [alerts, setAlerts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/price-alerts");
        if (res.ok) {
          const data = await res.json();
          setAlerts(data);
        } else {
          console.error("Non-OK response from API:", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch alerts:", error);
      } finally {
        setLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchAlerts();
    } else if (status === "unauthenticated") {
      setLoading(false);
    }
  }, [status]);

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      const res = await fetch(`/api/price-alerts/${id}`, { method: "DELETE" });
      if (res.ok) {
        setAlerts(alerts.filter(a => a.id !== id));
      }
    } catch (error) {
      alert("Silmək mümkün olmadı.");
    } finally {
      setDeletingId(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F9FAFB] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-[#FF5500] border-t-transparent rounded-full animate-spin"></div>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">Yüklənir...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9FAFB] pb-20">
      <section className="bg-gradient-to-br from-[#1E293B] to-[#0F172A] py-16 relative border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col items-start gap-4">
             <div className="flex items-center gap-4">
                <div className="p-4 bg-[#FF5500] rounded-3xl shadow-xl shadow-orange-500/20">
                  <Bell className="w-8 h-8 text-white" />
                </div>
                <div>
                   <h1 className="text-3xl font-black text-white tracking-tight">Mənim Qiymət Bildirişlərim</h1>
                   <p className="text-slate-400 font-medium">İzlədiyiniz məhsulların qiymət dəyişikliklərini idarə edin.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {alerts.length === 0 ? (
          <div className="bg-white rounded-[3.5rem] p-20 text-center border border-gray-100 shadow-2xl">
             <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
               <PackageSearch className="w-10 h-10 text-slate-300" />
             </div>
             <h2 className="text-2xl font-black text-[#0F172A] mb-4">Hələ ki, heç bir bildirişiniz yoxdur</h2>
             <p className="text-slate-500 max-w-sm mx-auto mb-10 font-medium">
               Bəyəndiyiniz məhsulun qiyməti düşəndə xəbər tutmaq üçün məhsul səhifəsindən zəng ikonuna klikləyərək bildiriş qura bilərsiniz.
             </p>
             <Link href="/" className="inline-flex items-center gap-3 px-10 py-5 bg-[#0F172A] text-white rounded-2xl font-black uppercase tracking-widest hover:bg-[#FF5500] transition-all shadow-xl active:scale-95 group">
                Məhsullara Bax <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
             </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {alerts.map((alert) => {
              const currentPrice = alert.product.offers?.[0]?.currentPrice || 0;
              const isTargetMet = currentPrice <= alert.targetPrice;

              return (
                <div key={alert.id} className="group bg-white rounded-[2.5rem] border border-gray-100 shadow-xl overflow-hidden hover:shadow-2xl transition-all h-full flex flex-col">
                  {/* Status Badge */}
                  <div className="p-6 pb-0 flex justify-between items-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                      alert.isActive 
                        ? 'bg-blue-50 text-blue-600' 
                        : 'bg-green-50 text-[#1da661]'
                    }`}>
                      {alert.isActive ? 'Aktiv İzləmə' : 'Tamamlanıb'}
                    </span>
                    <button 
                      onClick={() => handleDelete(alert.id)}
                      disabled={deletingId === alert.id}
                      className="p-3 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-2xl transition-all disabled:opacity-50"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  <div className="p-8 flex-1">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 bg-slate-50 rounded-2xl p-2 flex items-center justify-center shrink-0 border border-slate-100">
                        <img 
                          src={alert.product.imageUrl || "/placeholder-product.png"} 
                          alt={alert.productName} 
                          className="max-h-full object-contain mix-blend-multiply"
                        />
                      </div>
                      <div className="min-w-0">
                        <h3 className="font-black text-slate-800 text-sm line-clamp-2 leading-tight hover:text-[#FF5500] transition-colors">
                          <Link href={`/product/${alert.productId}`}>{alert.productName}</Link>
                        </h3>
                        <div className="flex items-center gap-2 mt-2 text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                          <Calendar size={12} />
                          {new Date(alert.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-slate-50 rounded-2xl">
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Hədəf</p>
                         <p className="text-xl font-black text-[#0F172A]">{alert.targetPrice.toFixed(2)} ₼</p>
                      </div>
                      <div className={`p-4 rounded-2xl ${isTargetMet ? 'bg-green-50' : 'bg-slate-50'}`}>
                         <p className="text-[9px] font-black text-slate-400 uppercase mb-1">Cari</p>
                         <p className={`text-xl font-black ${isTargetMet ? 'text-[#1da661]' : 'text-[#FF5500]'}`}>
                            {currentPrice.toFixed(2)} ₼
                         </p>
                      </div>
                    </div>

                    {isTargetMet && (
                      <div className="mt-6 p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 text-[#1da661] text-[11px] font-bold">
                        <TrendingDown size={14} />
                        Hədəf qiymətə çatıldı!
                      </div>
                    )}
                  </div>

                  <div className="p-6 bg-slate-50/50 border-t border-slate-50">
                    <Link 
                      href={`/product/${alert.productId}`}
                      className="w-full py-4 bg-white border border-slate-200 text-[#0F172A] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:border-[#FF5500] hover:text-[#FF5500] transition-all flex items-center justify-center gap-2 group"
                    >
                      Məhsula Bax <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
