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
      <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
        <h1 className="text-3xl font-black text-slate-800 mb-4">Məhsul tapılmadı</h1>
        <p className="text-slate-500 mb-8 font-medium">Axtardığınız məhsul mövcud deyil.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-[#057850] text-white rounded-full text-sm font-bold shadow-lg shadow-green-900/10 hover:-translate-y-0.5 transition-all">
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
      "Kontakt": "https://img.icons8.com/color/96/k.png", // Mock logos for demonstration
      "Baku Electronics": "https://img.icons8.com/color/96/b.png",
      "İrşad": "https://img.icons8.com/color/96/i.png",
      "Soliton": "https://img.icons8.com/color/96/s.png",
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 w-full relative z-10">
        
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-slate-400 mb-8">
          <Link href="/" className="hover:text-[#057850] transition-colors">Ana Səhifə</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/search?category=${product.category}`} className="hover:text-[#057850] transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-slate-600 truncate max-w-[200px]">{product.title}</span>
        </nav>

        {/* Unified Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-10 lg:gap-16 items-start mb-16">
          
          {/* Left Column: Product Visual */}
          <div className="relative group">
            <div className="bg-white rounded-[3.5rem] border border-gray-100 p-8 sm:p-14 shadow-xl shadow-slate-200/20 flex items-center justify-center aspect-square relative overflow-hidden">
               <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-green-50/30 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
               <FavoriteButton productId={product.id} initialFavorited={isFavorited} className="absolute top-10 right-10 z-20" />
               <span className="absolute top-10 left-10 z-10 inline-flex items-center px-4 py-2 rounded-2xl text-[10px] font-black bg-slate-900/5 text-slate-500 uppercase tracking-widest border border-slate-100 backdrop-blur-sm">
                 <ShieldCheck className="w-4 h-4 mr-2 text-[#057850]" /> 
                 Orjinal Məhsul
               </span>
               <Image 
                 src={product.imageUrl || "/iphone15pro.png"} 
                 alt={product.title} 
                 width={700} 
                 height={700} 
                 priority
                 className="relative z-10 object-contain w-full h-full transform group-hover:scale-105 transition-transform duration-700 mix-blend-multiply" 
               />
            </div>
            {/* Gallery Miniatures (Future placeholder) */}
            <div className="flex gap-4 mt-6 justify-center">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-20 h-20 rounded-3xl border-2 border-slate-200 p-2 bg-white cursor-pointer hover:border-[#057850] transition-all">
                   <Image src={product.imageUrl || "/iphone15pro.png"} alt="thumb" width={80} height={80} className="object-contain w-full h-full mix-blend-multiply" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Quick Action Card */}
          <div className="flex flex-col gap-8 sticky top-32">
            <div>
               <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-800 tracking-tight leading-[1.1] mb-4">
                 {product.title}
               </h1>
               <div className="flex items-center gap-4">
                 <div className="flex items-center gap-1.5 px-3 py-1 bg-green-50 text-[#057850] rounded-full text-[10px] font-black uppercase tracking-widest border border-green-100">
                   <Timer className="w-3.5 h-3.5" /> Stokda Var
                 </div>
                 <span className="text-xs font-bold text-slate-400">Model: MYTP3CH/A</span>
               </div>
            </div>

            {/* THE QUICK ACTION CARD */}
            <div className="bg-slate-900 rounded-[3rem] p-10 text-white shadow-2xl shadow-[#057850]/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-[#057850]/20 rounded-full blur-[60px] -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-1000" />
               
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Ən aşağı qiymət tərcihi</p>
               <div className="flex items-baseline gap-3 mb-8">
                 <span className="text-5xl font-black tracking-tighter">{bestPrice} ₼</span>
                 <span className="text-slate-500 line-through text-lg font-bold opacity-50">{Math.floor(bestPrice * 1.15)} ₼</span>
               </div>

               {/* Smart Warning within Card */}
               {!isRealDiscount && (
                 <div className="mb-8 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-start gap-3">
                   <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                   <div>
                     <p className="text-xs font-black uppercase tracking-wider text-red-400 mb-1">DİQQƏT! SÜNİ ENDİRİM</p>
                     <p className="text-[11px] text-slate-400 font-medium leading-relaxed">Bu qiymət son 30 günün ən aşağı qiyməti deyil. Tələsməmək tövsiyə olunur.</p>
                   </div>
                 </div>
               )}

               <a href={cheapestOffer?.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                 className="w-full h-16 bg-[#057850] hover:bg-[#046241] rounded-2xl flex items-center justify-center gap-3 text-sm font-black uppercase tracking-[0.15em] transition-all shadow-lg shadow-black/20 group/btn"
               >
                 Mağazaya Keç
                 <ExternalLink className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
               </a>

               <div className="mt-6 flex items-center justify-center gap-4 text-slate-500 text-[10px] font-black uppercase tracking-widest">
                  <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Təhlükəsiz Keçid</div>
                  <div className="w-1 h-1 bg-slate-700 rounded-full" />
                  <div className="flex items-center gap-1.5"><Info className="w-3.5 h-3.5" /> Rəsmi Mağaza</div>
               </div>
            </div>
          </div>
        </div>

        {/* Price History & Analysis (The Visual Data) */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-1.5 h-8 bg-[#057850] rounded-full" />
             <h2 className="text-3xl font-black text-slate-800 tracking-tight">Qiymət Analizi</h2>
          </div>
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-8 sm:p-14 relative overflow-hidden">
             <div className="grid grid-cols-1 lg:grid-cols-4 gap-16 items-center">
                <div className="lg:col-span-3">
                  <PriceHistoryChart data={product.priceHistory} />
                </div>
                <div className="flex flex-col gap-8">
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">30 Günlük Ən Aşağı</p>
                    <p className="text-3xl font-black text-[#057850] tracking-tighter">{minHistoricalPrice} ₼</p>
                  </div>
                  <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">Status</p>
                    <div className="flex items-center gap-3">
                       <div className={`w-3 h-3 rounded-full ${isRealDiscount ? "bg-green-500" : "bg-red-500"} animate-pulse`} />
                       <span className="text-sm font-black text-slate-700 uppercase">{isRealDiscount ? "Əla Fürsət" : "Süni Artım"}</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
        </section>

        {/* Compact Comparison Table */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-10">
             <div className="w-1.5 h-8 bg-[#057850] rounded-full" />
             <h2 className="text-3xl font-black text-slate-800 tracking-tight">Mağaza Təklifləri</h2>
          </div>
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-xl shadow-slate-200/20 overflow-hidden">
            <div className="overflow-x-auto">
               <table className="w-full text-left border-collapse">
                 <thead className="bg-slate-50 border-b border-slate-100">
                   <tr>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mağaza</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] hidden md:table-cell text-center">Xidmət</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Qiymət</th>
                     <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Keçid</th>
                   </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                   {product.offers.map((offer: any, idx: number) => {
                     const isCheapest = idx === 0;
                     return (
                       <tr key={offer.id} className={`group hover:bg-slate-50/50 transition-all ${isCheapest ? "bg-[#057850]/[0.02]" : ""}`}>
                         <td className="px-10 py-6">
                           <div className="flex items-center gap-4">
                             <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center p-2 transform group-hover:scale-110 transition-transform">
                               <Image src={getStoreLogo(offer.store.name)} alt={offer.store.name} width={40} height={40} className="object-contain filter grayscale group-hover:grayscale-0 transition-all opacity-80 group-hover:opacity-100" />
                             </div>
                             <div>
                               <p className="text-sm font-black text-slate-800">{offer.store.name}</p>
                               <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Təcrübəli Satıcı</p>
                             </div>
                           </div>
                         </td>
                         <td className="px-10 py-6 hidden md:table-cell text-center">
                            <span className="inline-flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-[#057850] bg-green-50 px-3 py-1 rounded-full border border-green-100">
                               Rəsmi Zəmanət
                            </span>
                         </td>
                         <td className="px-10 py-6">
                           <div className="flex flex-col">
                             <span className={`font-black tracking-tighter ${isCheapest ? "text-[#057850] text-2xl scale-110 origin-left" : "text-slate-800 text-xl"}`}>
                               {offer.currentPrice} ₼
                             </span>
                             {isCheapest && (
                               <span className="text-[8px] font-black bg-[#057850] text-white px-2 py-0.5 rounded-full w-max mt-1 uppercase tracking-tighter">Məsləhətli</span>
                             )}
                           </div>
                         </td>
                         <td className="px-10 py-6 text-right">
                            <a href={offer.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                              className={`inline-flex items-center gap-2 px-6 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-sm ${
                                isCheapest ? "bg-[#057850] text-white hover:bg-[#046241]" : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                              }`}
                            >
                              Sifariş Et
                              <ExternalLink className="w-3 h-3" />
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

        {/* Product Accordions (Details) */}
        <section className="mb-20">
           <ProductAccordions description={product.description} />
        </section>

      </div>
    </div>
  );
}

