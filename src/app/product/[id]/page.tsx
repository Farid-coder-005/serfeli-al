import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, ExternalLink, Timer, AlertTriangle, History, Info, ChevronRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { FavoriteButton } from "@/components/FavoriteButton";
import { PriceHistoryChart } from "@/components/PriceHistoryChart";
import ProductStickyBar from "@/components/ProductStickyBar";
import ProductAccordions from "@/components/ProductAccordions";
import ProductSpecsGrid from "@/components/ProductSpecsGrid";

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  if (!id) {
    return notFound();
  }

  const product = await prisma.product.findUnique({
    where: { id },
    include: {
      offers: {
        include: { store: true },
        orderBy: { currentPrice: 'asc' },
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
      <div className="flex flex-col items-center justify-center min-h-[40vh] text-center px-4">
        <h1 className="text-2xl font-black text-slate-800 mb-2">Məhsul tapılmadı</h1>
        <p className="text-slate-500 mb-6 font-medium">Axtardığınız məhsul mövcud deyil.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#057850] text-white rounded-full text-xs font-bold shadow-lg shadow-green-900/10 hover:-translate-y-0.5 transition-all">
          <ArrowLeft className="w-4 h-4" /> Ana Səhifəyə Qayıt
        </Link>
      </div>
    );
  }

  const cheapestOffer = product.offers.length > 0 ? product.offers[0] : null;
  const bestPrice = cheapestOffer?.currentPrice || 0;
  
  const thirtyDaysAgo = new Date();
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
  const recentHistory = product.priceHistory.filter(h => new Date(h.recordedAt) >= thirtyDaysAgo);
  const minHistoricalPrice = recentHistory.length > 0 
    ? Math.min(...recentHistory.map(h => h.price)) 
    : bestPrice;

  const isRealDiscount = bestPrice <= minHistoricalPrice;

  // Store Logo Mapping for premium look
  const getStoreLogo = (name: string) => {
    const logos: Record<string, string> = {
      "Kontakt": "https://img.icons8.com/color/48/k.png",
      "Baku Electronics": "https://img.icons8.com/color/48/b.png",
      "İrşad": "https://img.icons8.com/color/48/i.png",
      "Soliton": "https://img.icons8.com/color/48/s.png",
    };
    return logos[name] || `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=057850&color=fff&bold=true`;
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#F8FAFC]">
      {/* Sticky Top Bar (Scroll-triggered) */}
      <ProductStickyBar 
        productName={product.title} 
        productImage={product.imageUrl || "/iphone15pro.png"} 
        price={bestPrice} 
        ctaUrl={cheapestOffer?.productUrl || "#"} 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 w-full relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[9px] font-black uppercase tracking-widest text-slate-400 mb-6">
          <Link href="/" className="hover:text-[#057850] transition-colors">Ana Səhifə</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/search?category=${product.category}`} className="hover:text-[#057850] transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 truncate max-w-[150px]">{product.title}</span>
        </nav>

        {/* Unified Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start mb-12">
          
          {/* Left Column: Product Visual & Specs */}
          <div className="flex flex-col">
            <div className="bg-white rounded-[2.5rem] border border-gray-100 p-6 sm:p-10 shadow-xl shadow-slate-200/10 flex items-center justify-center aspect-square relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-green-50/20 rounded-full blur-[80px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
               <FavoriteButton productId={product.id} initialFavorited={isFavorited} className="absolute top-8 right-8 z-20 scale-90" />
               <span className="absolute top-8 left-8 z-10 inline-flex items-center px-3 py-1.5 rounded-xl text-[9px] font-black bg-slate-900/5 text-slate-500 uppercase tracking-widest border border-slate-100 backdrop-blur-sm">
                 <ShieldCheck className="w-3.5 h-3.5 mr-1.5 text-[#057850]" /> 
                 Orjinal
               </span>
               <Image 
                 src={product.imageUrl || "/iphone15pro.png"} 
                 alt={product.title} 
                 width={600} 
                 height={600} 
                 priority
                 className="relative z-10 object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
               />
            </div>
            {/* Gallery Miniatures */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-14 h-14 rounded-2xl border-2 border-slate-200 p-1.5 bg-white cursor-pointer hover:border-[#057850] transition-all">
                   <Image src={product.imageUrl || "/iphone15pro.png"} alt="thumb" width={60} height={60} className="object-contain w-full h-full mix-blend-multiply" />
                </div>
              ))}
            </div>

            {/* REPOSITIONED SPECS: Now under the image */}
            <ProductSpecsGrid />
          </div>

          {/* Right Column: Quick Action Card */}
          <div className="flex flex-col gap-6 sticky top-28">
            <div>
               <h1 className="text-2xl sm:text-3xl font-black text-slate-800 tracking-tight leading-[1.2] mb-3">
                 {product.title}
               </h1>
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 px-2.5 py-1 bg-green-50 text-[#057850] rounded-lg text-[9px] font-black uppercase tracking-widest border border-green-100">
                   <Timer className="w-3 h-3" /> Stokda Var
                 </div>
                 <span className="text-[10px] font-bold text-slate-400">Model: MYTP3CH/A</span>
               </div>
            </div>

            {/* THE QUICK ACTION CARD - Tighter */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-[#057850]/15 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-24 h-24 bg-[#057850]/20 rounded-full blur-[50px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
               
               <p className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Ən aşağı qiymət tərcihi</p>
               <div className="flex items-baseline gap-2.5 mb-6">
                 <span className="text-4xl font-black tracking-tighter">{bestPrice} ₼</span>
                 <span className="text-slate-500 line-through text-base font-bold opacity-40">{Math.floor(bestPrice * 1.15)} ₼</span>
               </div>

               {/* Smart Warning within Card */}
               {!isRealDiscount && (
                 <div className="mb-6 p-3.5 bg-red-500/10 border border-red-500/20 rounded-xl flex items-start gap-2.5">
                   <AlertTriangle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                   <div>
                     <p className="text-[9px] font-black uppercase tracking-wider text-red-400 mb-0.5">DİQQƏT! SÜNİ ENDİRİM</p>
                     <p className="text-[10px] text-slate-400 font-medium leading-tight">Bu qiymət son 30 günün ən aşağı qiyməti deyil.</p>
                   </div>
                 </div>
               )}

               <a href={cheapestOffer?.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                 className="w-full h-14 bg-[#057850] hover:bg-[#046241] rounded-xl flex items-center justify-center gap-2.5 text-xs font-black uppercase tracking-[0.1em] transition-all shadow-lg shadow-black/20 group/btn"
               >
                 Mağazaya Keç
                 <ExternalLink className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
               </a>

               <div className="mt-5 flex items-center justify-center gap-3 text-slate-500 text-[9px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Təhlükəsiz</div>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1.5"><Info className="w-3 h-3" /> Rəsmi</div>
               </div>
            </div>
          </div>
        </div>

        {/* Price History & Analysis */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-6">
             <div className="w-1 h-6 bg-[#057850] rounded-full" />
             <h2 className="text-xl font-black text-slate-800 tracking-tight">Qiymət Analizi</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-6 sm:p-10 relative overflow-visible max-w-5xl">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
                <div className="lg:col-span-3">
                  <PriceHistoryChart data={product.priceHistory} />
                </div>
                <div className="flex flex-col gap-6">
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] mb-2">30 Günlük Ən Aşağı</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">{minHistoricalPrice} ₼</p>
                  </div>
                  <div className="p-6 bg-slate-50 rounded-[2rem] border border-slate-100 shadow-sm">
                    <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.2em] mb-2">Status</p>
                    <div className="flex items-center gap-2.5">
                       <div className={`w-2.5 h-2.5 rounded-full ${isRealDiscount ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                       <span className="text-[11px] font-black text-slate-700 uppercase">{isRealDiscount ? "Əla Fürsət" : "Süni Artım"}</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Compact Comparison Table */}
        <section className="mb-12">
          <div className="flex items-center gap-2.5 mb-6">
             <div className="w-1 h-6 bg-[#057850] rounded-full" />
             <h2 className="text-xl font-black text-slate-800 tracking-tight">Mağaza Təklifləri</h2>
          </div>
          <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-xl shadow-slate-200/10 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 border-b border-slate-50">
                   <tr>
                     <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Mağaza</th>
                     <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] hidden md:table-cell text-center">Zəmanət</th>
                     <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em]">Qiymət</th>
                     <th className="px-8 py-4 text-[9px] font-black text-slate-400 uppercase tracking-[0.15em] text-right">Keçid</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {product.offers.map((offer: any, idx: number) => {
                     const isCheapest = idx === 0;
                     return (
                       <tr key={offer.id} className={`group hover:bg-slate-50/50 transition-all ${isCheapest ? "bg-[#057850]/[0.01]" : ""}`}>
                         <td className="px-8 py-4">
                           <div className="flex items-center gap-3">
                             <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-1.5 transform group-hover:scale-105 transition-transform">
                               <Image src={getStoreLogo(offer.store.name)} alt={offer.store.name} width={24} height={24} className="object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                             </div>
                             <div>
                               <p className="text-xs font-black text-slate-700">{offer.store.name}</p>
                               <p className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Tərəfdaş</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-8 py-4 hidden md:table-cell text-center">
                            <span className="inline-flex items-center gap-1 text-[8px] font-black uppercase tracking-widest text-[#057850] bg-green-50 px-2 py-0.5 rounded-lg border border-green-100">
                               Rəsmi
                            </span>
                         </td>
                         <td className="px-8 py-4">
                           <div className="flex flex-col">
                             <span className={`font-black tracking-tighter ${isCheapest ? "text-[#057850] text-xl" : "text-slate-700 text-lg"}`}>
                               {offer.currentPrice} ₼
                             </span>
                             {isCheapest && (
                               <span className="text-[7px] font-black bg-[#057850] text-white px-1.5 py-0.5 rounded-md w-max mt-0.5 uppercase">Məsləhətli</span>
                             )}
                           </div>
                         </td>
                         <td className="px-8 py-4 text-right">
                            <a href={offer.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                              className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all shadow-sm ${
                                isCheapest ? "bg-[#057850] text-white hover:bg-[#046241]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              Sifariş
                              <ExternalLink className="w-2.5 h-2.5" />
                            </a>
                         </td>
                       </tr>
                     );
                   })}
                 </tbody>
               </table>
            </div>
          </div>
        </section>

        {/* Product Details - Compact Accordions */}
        <section className="mb-12">
           <ProductAccordions description={product.description} />
        </section>

      </div>
    </div>
  );
}


