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

        {/* Unified Layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_400px] gap-8 items-start mb-12">
          
          {/* Left Column: Title & Massive Product Visual */}
          <div className="flex flex-col gap-6">
            <div>
               <h1 className="text-2xl sm:text-3xl font-bold text-[#222222] tracking-normal leading-[1.2]">
                 {product.title}
               </h1>
            </div>

            <div className="bg-white rounded-sm border border-gray-200 p-6 sm:p-10 shadow-sm flex flex-col items-center justify-center relative group min-h-[500px]">
               <FavoriteButton productId={product.id} initialFavorited={isFavorited} className="absolute top-4 right-4 z-20 scale-100" />
               <div className="relative w-full h-[400px]">
                 <Image 
                   src={product.imageUrl || "/iphone15pro.png"} 
                   alt={product.title} 
                   fill
                   sizes="(max-width: 768px) 100vw, 60vw"
                   priority
                   className="object-contain mix-blend-multiply flex-1" 
                 />
               </div>
               
               {/* Gallery Miniatures */}
               <div className="flex gap-3 mt-8 justify-center w-full">
                 {[1, 2, 3].map(i => (
                   <div key={i} className="w-16 h-16 rounded-sm border border-gray-200 p-1.5 bg-white cursor-pointer hover:border-[#FF5500] transition-all relative">
                      <Image src={product.imageUrl || "/iphone15pro.png"} alt="thumb" fill className="object-contain mix-blend-multiply p-1" />
                   </div>
                 ))}
               </div>
            </div>
            
            <ProductSpecsGrid />
          </div>

          {/* Right Column: The Comparison Table Block */}
          <div className="flex flex-col gap-4">
            {/* Smart Warning */}
            {!isRealDiscount && (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-sm flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-[#FF5500] shrink-0 mt-0.5" />
                <div>
                  <p className="text-[12px] font-bold text-[#FF5500] mb-0.5">Qiymət Xəbərdarlığı</p>
                  <p className="text-[11px] text-[#222222]">Bu təklif son 30 günün minimumundan yuxarıdır.</p>
                </div>
              </div>
            )}

            <div className="bg-white rounded-sm border border-gray-200 shadow-sm overflow-hidden flex flex-col">
              <div className="px-5 py-4 bg-[#F4F4F4] border-b border-gray-200 flex justify-between items-center">
                 <span className="text-[14px] font-bold text-[#222222]">Təkliflər ({product.offers.length})</span>
              </div>
              <div className="flex flex-col divide-y divide-gray-100">
                {product.offers.map((offer: any, idx: number) => {
                  const isCheapest = idx === 0;
                  return (
                    <div key={offer.id} className="p-5 flex flex-col gap-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-center gap-4">
                        {/* Shop Logo */}
                        <div className="w-14 h-14 rounded-sm border border-gray-200 bg-white flex items-center justify-center p-2 shrink-0">
                          <Image src={getStoreLogo(offer.store.name)} alt={offer.store.name} width={40} height={40} className="object-contain mix-blend-multiply" />
                        </div>
                        <div className="flex flex-col flex-1">
                          <span className="text-[13px] font-bold text-[#222222]">{offer.store.name}</span>
                          <span className="text-[11px] text-gray-500 mt-0.5 flex items-center gap-1">
                            <Timer className="w-3 h-3" /> Hazırda Stokda
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-end justify-between mt-2">
                        {/* Price */}
                        <div className="flex flex-col">
                          {isCheapest && <span className="text-[10px] font-bold text-[#FF5500] mb-0.5 uppercase tracking-widest">Ən Yaxşı Təklif</span>}
                          <span className="text-[22px] font-black text-[#222222] tracking-tighter leading-none">{offer.currentPrice} ₼</span>
                        </div>
                        {/* CTA */}
                        <a href={offer.productUrl || "#"} target="_blank" rel="noopener noreferrer" 
                          className={`flex items-center justify-center gap-2 px-6 py-2.5 rounded-sm text-[13px] font-bold transition-all ${
                            isCheapest ? "bg-[#FF5500] text-white hover:bg-[#E04A00]" : "bg-gray-200 text-[#222222] hover:bg-gray-300"
                          }`}
                        >
                          Zum Shop <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>
                  );
                })}
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


