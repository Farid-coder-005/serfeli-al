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
          <Link href="/" className="hover:text-brand-green transition-colors">Ana Səhifə</Link>
          <ChevronRight className="w-3 h-3" />
          <Link href={`/search?category=${product.category}`} className="hover:text-brand-green transition-colors">{product.category}</Link>
          <ChevronRight className="w-3 h-3" />
          <span className="text-brand-navy truncate max-w-[150px]">{product.title}</span>
        </nav>

        {/* Unified Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-[450px_1fr] gap-8 lg:gap-12 items-start mb-12">
          
          {/* Left Column: Product Visual & Specs */}
          <div className="flex flex-col">
            <div className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-10 shadow-sm flex items-center justify-center aspect-square relative overflow-hidden group">
               <FavoriteButton productId={product.id} initialFavorited={isFavorited} className="absolute top-4 right-4 z-20 scale-90" />
               <Image 
                 src={product.imageUrl || "/iphone15pro.png"} 
                 alt={product.title} 
                 width={600} 
                 height={600} 
                 priority
                 className="relative z-10 object-contain w-full h-full mix-blend-multiply" 
               />
            </div>
            {/* Gallery Miniatures */}
            <div className="flex gap-3 mt-4 justify-center">
              {[1, 2, 3].map(i => (
                <div key={i} className="w-14 h-14 rounded-xl border border-gray-200 p-1.5 bg-white cursor-pointer hover:border-[#FF5500] transition-all">
                   <Image src={product.imageUrl || "/iphone15pro.png"} alt="thumb" width={60} height={60} className="object-contain w-full h-full mix-blend-multiply" />
                </div>
              ))}
            </div>

            <ProductSpecsGrid />
          </div>

          {/* Right Column: Title & Table */}
          <div className="flex flex-col gap-6">
            <div>
               <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-normal leading-[1.2] mb-3">
                 {product.title}
               </h1>
               <div className="flex items-center gap-3">
                 <div className="flex items-center gap-1 text-[#222222] text-[11px] font-bold">
                   <Timer className="w-3.5 h-3.5" /> Stokda Var
                 </div>
                 <span className="text-[11px] font-medium text-gray-500">Model: MYTP3CH/A</span>
               </div>
            </div>

            {/* Smart Warning within Header Area */}
            {!isRealDiscount && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[11px] font-bold text-[#FF5500] mb-0.5">Süni Artım Ola Bilər</p>
                  <p className="text-[11px] text-gray-600 font-medium leading-tight">Bu qiymət son 30 günün ən aşağı qiyməti deyil.</p>
                </div>
              </div>
            )}

            {/* Compact Comparison Table */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden flex-1">
              <div className="overflow-x-auto">
                 <table className="w-full text-left border-collapse">
                   <thead className="bg-[#F4F4F4] border-b border-gray-200">
                     <tr>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Mağaza</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider hidden md:table-cell text-center">Zəmanət</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider">Qiymət</th>
                       <th className="px-6 py-4 text-[10px] font-bold text-gray-500 uppercase tracking-wider text-right">Keçid</th>
                     </tr>
                   </thead>
                   <tbody className="divide-y divide-gray-100">
                     {product.offers.map((offer: any, idx: number) => {
                       const isCheapest = idx === 0;
                       return (
                         <tr key={offer.id} className={`group hover:bg-orange-50/20 transition-all`}>
                           <td className="px-6 py-5">
                             <div className="flex items-center gap-3">
                               <div className="w-12 h-12 rounded-lg bg-white border border-gray-100 shadow-sm flex items-center justify-center p-2">
                                 <Image src={getStoreLogo(offer.store.name)} alt={offer.store.name} width={32} height={32} className="object-contain opacity-90 group-hover:opacity-100" />
                               </div>
                               <div>
                                 <p className="text-xs font-bold text-[#222222]">{offer.store.name}</p>
                                 <div className="flex items-center gap-1 mt-1 text-[10px] font-medium text-gray-500">
                                  <ShieldCheck className="w-3 h-3 text-gray-400" /> Tərəfdaş
                                 </div>
                               </div>
                             </div>
                           </td>
                           <td className="px-6 py-5 hidden md:table-cell text-center">
                              <span className="inline-flex items-center gap-1 text-[10px] font-medium text-gray-600 bg-gray-100 px-2.5 py-1 rounded-md border border-gray-200">
                                Rəsmi
                              </span>
                           </td>
                           <td className="px-6 py-5">
                             <div className="flex flex-col">
                               <span className={`font-black tracking-tighter ${isCheapest ? "text-[#222222] text-xl" : "text-gray-700 text-lg"}`}>
                                 {offer.currentPrice} ₼
                               </span>
                               {isCheapest && (
                                 <span className="text-[10px] font-bold text-[#FF5500] mt-0.5">Top Təklif</span>
                               )}
                             </div>
                           </td>
                           <td className="px-6 py-5 text-right">
                              <a href={offer.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                                className={`inline-flex items-center justify-center min-w-[120px] gap-1.5 px-6 py-3 rounded-xl text-[12px] font-bold transition-all shadow-sm ${
                                  isCheapest ? "bg-[#FF5500] text-white hover:bg-[#E04A00]" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                                }`}
                              >
                                {isCheapest ? "Mağazaya keç" : "Mağazaya keç"}
                                <ChevronRight className="w-3.5 h-3.5" />
                              </a>
                           </td>
                         </tr>
                       );
                     })}
                   </tbody>
                 </table>
              </div>
            </div>
          </div>
        </div>

        {/* Price History & Analysis */}
        <section className="mb-12 bg-white rounded-2xl p-6 sm:p-10 border border-gray-200 shadow-sm relative overflow-visible max-w-7xl">
           <div className="grid grid-cols-1 lg:grid-cols-4 gap-10 items-start">
              <div className="lg:col-span-3">
                <PriceHistoryChart data={product.priceHistory} />
              </div>
              <div className="flex flex-col gap-6">
                <div className="p-6 bg-[#F4F4F4] rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">30 Günlük Ən Aşağı</p>
                  <p className="text-2xl font-black text-[#222222] tracking-tighter">{minHistoricalPrice} ₼</p>
                </div>
                <div className="p-6 bg-[#F4F4F4] rounded-2xl border border-gray-200">
                  <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider mb-2">Status</p>
                  <div className="flex items-center gap-2.5">
                     <div className={`w-2.5 h-2.5 rounded-full ${isRealDiscount ? "bg-green-500" : "bg-[#FF5500]"}`} />
                     <span className="text-[12px] font-bold text-[#222222]">{isRealDiscount ? "Əla Fürsət" : "Süni Artım"}</span>
                  </div>
                </div>
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


