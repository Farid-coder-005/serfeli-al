import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Tag, ShieldCheck, MapPin, ExternalLink, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { FavoriteButton } from "@/components/FavoriteButton";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import { TrendingDown, AlertTriangle, History } from "lucide-react";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!id) {
    return notFound();
  }

  // Fetch product from DB including all active offers
  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      offers: {
        include: { store: true },
        orderBy: { currentPrice: 'asc' }, // Order by cheapest first
      },
      priceHistory: {
        orderBy: { recordedAt: 'asc' }
      }
    }
  });

  const session = await getServerSession(authOptions);
  let isFavorited = false;
  if (session?.user && (session.user as any).id && product) {
    const fave = await prisma.favorite.findUnique({
      where: {
        userId_productId: {
          userId: (session.user as any).id,
          productId: product.id
        }
      }
    });
    isFavorited = !!fave;
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-3xl font-black text-[#1E3A8A] mb-4">Məhsul tapılmadı</h1>
        <p className="text-gray-500 mb-8 font-medium">Axtardığınız məhsul mövcud deyil və ya sistemdən silinib.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#057850] text-white rounded-full text-sm font-bold shadow-lg shadow-green-900/10 hover:-translate-y-0.5 transition-all">
          <ArrowLeft className="w-4 h-4" /> Ana Səhifəyə Qayıt
        </Link>
      </div>
    );
  }

  // Determine top price details based on cheapest offer
  const cheapestOffer = product.offers.length > 0 ? product.offers[0] : null;
  const bestPrice = cheapestOffer?.currentPrice || 0;
  const oldPrice = bestPrice > 0 ? Math.floor(bestPrice * 1.15) : 0;

  // Smart Price Analysis
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const recentHistory = product.priceHistory.filter(h => new Date(h.recordedAt) >= thirtyDaysAgo);
  const minHistoricalPrice = recentHistory.length > 0 
    ? Math.min(...recentHistory.map(h => h.price)) 
    : bestPrice;

  // Logic: "Real" if current price is <= the 30-day low.
  // "Fake" if there was a lower price in the last 30 days.
  const isRealDiscount = bestPrice <= minHistoricalPrice;
  const priceDiff = minHistoricalPrice - bestPrice;

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-96px)] bg-[#F8FAFC]">
      {/* Background blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(5,120,80,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
        <div className="absolute -bottom-40 -left-20 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full relative z-10">
        
        {/* Breadcrumb / Back Link */}
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#057850] transition-colors mb-8 sm:mb-12 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Axtarışa qayıt
        </Link>

        {/* Top Product Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start mb-16">
          
          {/* Left: Product Image */}
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 sm:p-12 shadow-sm flex items-center justify-center aspect-square relative group">
            {cheapestOffer && (
              <span className="absolute top-6 left-6 z-10 inline-flex items-center px-4 py-2 rounded-full text-[11px] font-black bg-[#EA580C] text-white shadow-lg shadow-orange-500/20 uppercase tracking-wider overflow-hidden">
                <Tag className="w-4 h-4 mr-2 relative z-10" /> 
                <span className="relative z-10">Ən Ucuz Seçim</span>
              </span>
            )}
            <FavoriteButton productId={product.id} initialFavorited={isFavorited} className="absolute top-6 right-6" />
            <Image 
              src={product.imageUrl || "/iphone15pro.png"} 
              alt={product.title} 
              width={600} 
              height={600} 
              priority
              className="object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
            />
          </div>

          {/* Right: Product Detail Snippet */}
          <div className="flex flex-col h-full justify-center">
            <span className="inline-block px-3 py-1 bg-[#1E3A8A]/5 text-[#1E3A8A] rounded-full text-[11px] font-black uppercase tracking-widest mb-6 w-max">
              {product.category || "Elektronika"}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1E3A8A] tracking-tight leading-[1.1] mb-6">
              {product.title}
            </h1>
            
            {product.description && (
              <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed mb-8 max-w-lg">
                {product.description}
              </p>
            )}

            {/* Price Preview Block */}
            {bestPrice > 0 ? (
              <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 shadow-sm">
                <p className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-2">Başlanğıc qiymət</p>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[#EA580C] font-black text-4xl sm:text-5xl tracking-tighter">{bestPrice} ₼</span>
                  <span className="text-gray-300 line-through text-lg sm:text-xl font-bold mb-1.5">{oldPrice} ₼</span>
                </div>

                {/* Smart Badge */}
                <div className="mb-6">
                  {isRealDiscount ? (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-[#057850] rounded-2xl border border-green-100 shadow-sm transition-all hover:shadow-md cursor-default">
                      <TrendingDown className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-wider">Əla Fürsət! (Real Endirim)</span>
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-2xl border border-red-100 shadow-sm transition-all hover:shadow-md cursor-default">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-black uppercase tracking-wider">Diqqət! (Süni Endirim)</span>
                    </div>
                  )}
                </div>
                {/* Store Preview tag */}
                <div className="flex items-center gap-3 text-sm font-semibold text-gray-500">
                  <div className="flex items-center justify-center p-2 rounded-xl bg-gray-50 border border-gray-100">
                    <MapPin className="w-4 h-4 text-[#057850]" />
                  </div>
                  {product.offers.length} fərqli mağaza təklifi
                </div>
              </div>
            ) : (
             <div className="bg-orange-50 rounded-3xl border border-orange-100 p-6">
               <p className="text-orange-600 font-bold">Hazırda aktiv təklif yoxdur.</p>
             </div>
            )}
          </div>
        </div>

        {/* Store Offers Board */}
        <div className="mb-20">
          <div className="flex items-end justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A8A] tracking-tight flex items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-[#057850]" />
              Qiymət Müqayisəsi
            </h2>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="overflow-x-auto min-w-full">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-6 sm:px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Təklifçi / Mağaza</th>
                    <th className="px-6 sm:px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap hidden sm:table-cell">Mövcudluq</th>
                    <th className="px-6 sm:px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap">Qiymət</th>
                    <th className="px-6 sm:px-8 py-5 text-[11px] font-black text-gray-400 uppercase tracking-widest whitespace-nowrap text-right">Fəaliyyət</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50/80">
                  {product.offers.length > 0 ? (
                     product.offers.map((offer: any, idx: number) => {
                       const isCheapest = idx === 0;
                       
                       return (
                         <tr key={offer.id} className="hover:bg-gray-50/40 transition-colors group">
                           {/* Store Info */}
                           <td className="px-6 sm:px-8 py-6">
                             <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center justify-center shrink-0">
                                 {/* Wait, we don't have logoUrl for dummy seeded stores, use store name initial */}
                                 <span className="text-[#1E3A8A] font-black text-lg">
                                   {offer.store.name.charAt(0)}
                                 </span>
                               </div>
                               <div>
                                 <p className="text-sm font-black text-[#1E3A8A] mb-0.5">{offer.store.name}</p>
                                 <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider flex items-center gap-1.5">
                                   Rəsmi Tərəfdaş
                                 </p>
                               </div>
                             </div>
                           </td>

                           {/* Availability */}
                           <td className="px-6 sm:px-8 py-6 hidden sm:table-cell">
                             {offer.isAvailable ? (
                               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 text-[#057850] text-[11px] font-black uppercase tracking-widest border border-green-100">
                                 Anbarda var
                               </span>
                             ) : (
                               <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-100 text-gray-500 text-[11px] font-black uppercase tracking-widest border border-gray-200">
                                 Bitib
                               </span>
                             )}
                           </td>

                           {/* Price Context */}
                           <td className="px-6 sm:px-8 py-6">
                             <div className="flex flex-col">
                               <span className={`font-black tracking-tighter ${isCheapest ? "text-[#EA580C] text-2xl" : "text-[#1E3A8A] text-xl"}`}>
                                 {offer.currentPrice} ₼
                               </span>
                               {isCheapest && (
                                  <span className="text-[10px] text-orange-500 font-bold tracking-widest uppercase mt-0.5">
                                    Ən yaxşı seçim
                                  </span>
                               )}
                             </div>
                           </td>

                           {/* CTA Button */}
                           <td className="px-6 sm:px-8 py-6 text-right">
                              <a href={offer.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                                className={[
                                  "inline-flex items-center justify-center gap-2 px-5 sm:px-7 py-3 rounded-2xl text-[12px] font-black uppercase tracking-widest transition-all shadow-sm group-hover:shadow-md",
                                  isCheapest ? "bg-[#057850] text-white hover:bg-green-800" : "bg-white border border-gray-200 text-[#1E3A8A] hover:border-gray-300"
                                ].join(" ")}
                              >
                                Mağazaya Keç
                                <ExternalLink className={`w-3.5 h-3.5 ${isCheapest ? "text-green-200" : "text-gray-400"}`} />
                              </a>
                           </td>
                         </tr>
                       );
                     })
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-8 py-16 text-center text-gray-400 font-medium text-sm">
                        Bu məhsul üçün qeydiyyatdan keçmiş heç bir tərəfdaş təklifi tapılmadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Price History & Analysis Section */}
        <div className="mb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-black text-[#1E3A8A] tracking-tight flex items-center gap-3">
              <History className="w-8 h-8 text-[#057850]" />
              Qiymət Analizi & Tarixçə
            </h2>
            <div className="hidden sm:flex items-center gap-2 text-[10px] font-black text-gray-400 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
              <span className="w-2 h-2 rounded-full bg-[#057850]"></span> Son 30 Gün
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-green-50/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>
            
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-12 items-center">
              {/* Chart Area */}
              <div className="lg:col-span-3">
                <PriceHistoryChart data={product.priceHistory} />
              </div>
              
              {/* Insight Sidebar */}
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">30 Günlük Ən Aşağı</p>
                  <p className="text-2xl font-black text-[#057850]">{minHistoricalPrice} ₼</p>
                </div>
                <div className="p-6 bg-gray-50/50 rounded-3xl border border-gray-50">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Cari Qiymət</p>
                  <p className="text-2xl font-black text-[#EA580C]">{bestPrice} ₼</p>
                </div>
                <div className="mt-2">
                  <p className="text-sm font-medium text-gray-500 leading-relaxed">
                    Qiymət analizimiz göstərir ki, bu məhsul hazırda {bestPrice <= minHistoricalPrice ? "optimal" : "yüksək"} səviyyədədir.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
