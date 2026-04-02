import Image from "next/image";
import Link from "next/link";
import {
  Smartphone,
  Sofa,
  Shirt,
  Sparkles,
  ShoppingBag,
  ArrowRight,
  TrendingDown,
  Tag
} from "lucide-react";

const CATEGORIES = [
  { name: "Elektronika", slug: "elektronika", icon: Smartphone },
  { name: "Mebel & Ev", slug: "mebel", icon: Sofa },
  { name: "Geyim", slug: "geyim", icon: Shirt },
  { name: "Parfumeriya", slug: "parfumeriya", icon: Sparkles },
  { name: "Supermarket", slug: "supermarket", icon: ShoppingBag },
];

const FEATURED_DEALS = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro, 256GB, Natural Titanium",
    image: "/iphone15pro.png",
    oldPrice: "2899",
    newPrice: "2499",
    store: "Kontakt",
    realDiscount: true,
  },
  {
    id: 2,
    title: "Sony PlayStation 5 Console",
    image: "/iphone15pro.png",
    oldPrice: "1250",
    newPrice: "999",
    store: "İrşad",
    realDiscount: true,
  },
  {
    id: 3,
    title: "Dyson V15 Detect Absolute",
    image: "/iphone15pro.png",
    oldPrice: "1899",
    newPrice: "1650",
    store: "Baku Electronics",
    realDiscount: true,
  },
  {
    id: 4,
    title: "Samsung Galaxy S24 Ultra, 512GB",
    image: "/iphone15pro.png",
    oldPrice: "3199",
    newPrice: "2799",
    store: "Soliton",
    realDiscount: false, // fake/inflated discount for demo
  },
];

const PARTNERS = ["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery", "Optimal"];

export default function Page() {
  return (
    <div className="flex flex-col w-full relative">
      {/* Global dot-grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-40" />
      {/* Global mesh gradient blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute top-1/2 -right-48 w-[420px] h-[420px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(15,23,70,0.05) 0%, transparent 70%)', filter: 'blur(70px)' }} />
        <div className="absolute -bottom-32 left-1/3 w-[360px] h-[360px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(22,163,74,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
      </div>
      {/* Hero Section */}
      <section className="bg-[#166534] py-20 sm:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none mix-blend-overlay"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8 drop-shadow-xl">
            Azərbaycanın ən ağıllı <br className="hidden sm:block" /> alış platforması
          </h1>
          <p className="text-lg sm:text-2xl text-green-50/90 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Milyonlarla məhsul arasından ən ucuzunu tapın. Real endirimləri kəşf edin və hər alışdan kəşbək qazanın.
          </p>
          
          {/* Main Search Bar (Hero) */}
          <div className="w-full max-w-3xl mx-auto bg-white p-2.5 rounded-3xl shadow-2xl flex items-center border border-white/20 backdrop-blur-sm">
            <div className="flex-1 lg:pl-6 pl-3">
              <input 
                type="text"
                placeholder="Nə axtarırsınız? (məs. iPhone 15 Pro)"
                className="w-full h-12 md:h-16 outline-none text-gray-800 placeholder-gray-400 text-lg bg-transparent"
              />
            </div>
            <button className="bg-[#1E3A8A] hover:bg-[#1a3275] text-white font-black uppercase tracking-widest h-12 md:h-16 px-10 rounded-2xl transition-all shadow-lg flex items-center justify-center active:scale-[0.98]">
              Axtar
            </button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm font-black text-[#1E3A8A] mb-8 uppercase tracking-[0.2em]">Populyar Kateqoriyalar</h2>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
            {CATEGORIES.map((category, idx) => {
              const Icon = category.icon;
              return (
                <Link key={idx} href={`/search?category=${category.slug}`} className="group flex flex-col items-center justify-center p-8 bg-[#FFFFFF] rounded-3xl border border-gray-100 shadow-sm hover:border-[#1E3A8A]/10 hover:shadow-2xl hover:shadow-[#1E3A8A]/5 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer">
                  <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-[#166534] mb-5 shadow-inner group-hover:bg-[#166534] group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-sm font-bold text-gray-900 text-center tracking-tight">{category.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Real Endirimler (Featured Deals) */}
      <section className="py-20 relative z-10 border-y border-gray-100/50 bg-[#F1F5F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-black text-[#1E3A8A] flex items-center gap-3 tracking-tight">
                <TrendingDown className="w-8 h-8 text-[#EA580C]" />
                Günlük Təkliflər
              </h2>
              <p className="text-gray-500 mt-2 font-medium">Süni intellekt tərəfindən təsdiqlənmiş real endirimlər</p>
            </div>
            <Link href="/search" className="hidden sm:flex text-[#166534] font-bold items-center hover:text-[#1E3A8A] transition-colors group">
              Hamısına bax <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURED_DEALS.map((deal) => (
              <Link 
                href={`/product/${deal.id}`}
                key={deal.id} 
                className="bg-[#FFFFFF] rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden hover:shadow-2xl hover:shadow-[#1E3A8A]/10 hover:border-[#1E3A8A]/10 hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col cursor-pointer relative"
              >
                {/* Image & Badge */}
                <div className="relative aspect-square overflow-hidden bg-gray-50/50 flex items-center justify-center p-8">
                  <div className="absolute top-4 left-4 z-10">
                    {deal.realDiscount ? (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black bg-[#EA580C] text-white shadow-lg shadow-orange-500/30 uppercase tracking-wider">
                        <Tag className="w-3 h-3 mr-1.5" /> Real Endirim
                      </span>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[10px] font-black bg-gray-900 text-white uppercase tracking-wider">
                         Süni Endirim
                      </span>
                    )}
                  </div>
                  <Image 
                    src={deal.image} 
                    alt={deal.title} 
                    width={200} 
                    height={200}
                    priority={deal.id === 1}
                    className={`object-contain w-full h-full group-hover:scale-110 transition-transform duration-700 ${deal.id === 1 ? '' : 'mix-blend-multiply'}`}
                  />
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="text-[10px] font-black text-gray-400 mb-2 uppercase tracking-[0.2em]">{deal.store}</div>
                  <h3 className="text-sm font-bold text-[#1E3A8A] mb-6 line-clamp-2 leading-relaxed flex-1 group-hover:text-[#166534] transition-colors">
                    {deal.title}
                  </h3>
                  
                  <div className="mt-auto">
                    <div className="flex items-center gap-3">
                      <span className="text-gray-400 line-through text-sm font-medium">{deal.oldPrice} ₼</span>
                      <span className="text-[#EA580C] font-black text-2xl tracking-tighter">{deal.newPrice} ₼</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="mt-12 text-center sm:hidden">
            <Link href="/search" className="inline-flex items-center justify-center w-full py-4 px-6 border border-gray-200 rounded-2xl text-sm font-bold text-[#1E3A8A] bg-white hover:bg-gray-50 shadow-sm transition-all">
              Hamısına bax
            </Link>
          </div>
        </div>
      </section>

      {/* Partner Stores */}
      <section className="py-20 relative z-10 bg-[#F9FAFB]/50 border-t border-gray-100 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-xs font-black text-[#1E3A8A] mb-12 uppercase tracking-[0.3em]">Etibarlı Tərəfdaşlarımız</h2>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 opacity-40 hover:opacity-100 transition-opacity duration-500">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="text-xl sm:text-3xl font-black text-gray-400 hover:text-[#1E3A8A] transition-all cursor-pointer select-none">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
