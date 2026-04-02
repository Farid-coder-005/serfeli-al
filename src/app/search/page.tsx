import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, Tag, Star, ArrowUpDown, CheckCircle2, Search } from "lucide-react";
import PriceRangeSlider from "@/components/PriceRangeSlider";

// Mock Data
const PRODUCTS = [
  {
    id: 1,
    title: "Apple iPhone 15 Pro, 256GB, Natural Titanium",
    category: "elektronika",
    image: "/iphone15pro.png",
    minPrice: 2499,
    maxPrice: 2899,
    stores: ["Kontakt", "İrşad", "Baku Electronics"],
    cheapestStore: "Kontakt",
    realDiscount: true,
    cashback: "2%",
    rating: 4.8,
    reviews: 124,
  },
  {
    id: 2,
    title: "Sony PlayStation 5 Console (Disc Edition)",
    category: "elektronika",
    image: "/iphone15pro.png",
    minPrice: 999,
    maxPrice: 1250,
    stores: ["Soliton", "Kontakt", "Music Gallery"],
    cheapestStore: "Kontakt",
    realDiscount: true,
    cashback: "1.5%",
    rating: 4.9,
    reviews: 89,
  },
  {
    id: 3,
    title: "Samsung Galaxy S24 Ultra, 512GB, Titanium Black",
    category: "elektronika",
    image: "/iphone15pro.png",
    minPrice: 2799,
    maxPrice: 3199,
    stores: ["Baku Electronics", "İrşad"],
    cheapestStore: "İrşad",
    realDiscount: false,
    cashback: "3%",
    rating: 4.7,
    reviews: 45,
  },
  {
    id: 4,
    title: "Dyson V15 Detect Absolute",
    category: "mebel",
    image: "/iphone15pro.png",
    minPrice: 1650,
    maxPrice: 1899,
    stores: ["Kontakt", "Baku Electronics"],
    cheapestStore: "Kontakt",
    realDiscount: true,
    cashback: "5%",
    rating: 4.9,
    reviews: 210,
  },
  {
    id: 5,
    title: "Apple MacBook Air M3, 16GB RAM, 512GB SSD",
    category: "elektronika",
    image: "/iphone15pro.png",
    minPrice: 3150,
    maxPrice: 3400,
    stores: ["AlmaStore", "Kontakt"],
    cheapestStore: "AlmaStore",
    realDiscount: true,
    cashback: "1%",
    rating: 4.9,
    reviews: 67,
  },
  {
    id: 6,
    title: "LG OLED evo C3 55\" 4K Smart TV",
    category: "elektronika",
    image: "/iphone15pro.png",
    minPrice: 2899,
    maxPrice: 3299,
    stores: ["Baku Electronics", "Optimal"],
    cheapestStore: "Optimal",
    realDiscount: false,
    cashback: "2.5%",
    rating: 4.8,
    reviews: 32,
  },
  {
    id: 7,
    title: "Müasir Minimalist İkili Divan",
    category: "mebel",
    image: "/iphone15pro.png",
    minPrice: 450,
    maxPrice: 600,
    stores: ["Embawood", "Saloglu"],
    cheapestStore: "Embawood",
    realDiscount: true,
    cashback: "4%",
    rating: 4.5,
    reviews: 18,
  },
  {
    id: 8,
    title: "Kişi Üçün Ağ T-shirt (100% Pambıq)",
    category: "geyim",
    image: "/iphone15pro.png",
    minPrice: 15,
    maxPrice: 25,
    stores: ["LC Waikiki", "Defacto"],
    cheapestStore: "Defacto",
    realDiscount: true,
    cashback: "2%",
    rating: 4.6,
    reviews: 315,
  },
  {
    id: 9,
    title: "Dior Sauvage Eau de Parfum 100ml",
    category: "parfumeriya",
    image: "/iphone15pro.png",
    minPrice: 280,
    maxPrice: 340,
    stores: ["Sabina", "Ideal"],
    cheapestStore: "Sabina",
    realDiscount: false,
    cashback: "5%",
    rating: 4.9,
    reviews: 120,
  },
  {
    id: 10,
    title: "Lavazza Qualita Oro Qəhvə Dənələri 1 kq",
    category: "supermarket",
    image: "/iphone15pro.png",
    minPrice: 35,
    maxPrice: 45,
    stores: ["Bravo", "Araz"],
    cheapestStore: "Bravo",
    realDiscount: true,
    cashback: "1%",
    rating: 4.8,
    reviews: 600,
  }
];

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const selectedCategory = typeof resolvedParams.category === 'string' ? resolvedParams.category : null;

  // Filter products dynamically
  const filteredProducts = selectedCategory
    ? PRODUCTS.filter((p) => p.category === selectedCategory)
    : PRODUCTS;

  // Map slugs back to legible names for the header
  const categoryNames: Record<string, string> = {
    "elektronika": "Elektronika",
    "mebel": "Mebel & Ev",
    "geyim": "Geyim",
    "parfumeriya": "Parfumeriya",
    "supermarket": "Supermarket"
  };

  const titlePrefix = selectedCategory && categoryNames[selectedCategory] 
    ? categoryNames[selectedCategory] + " - " 
    : "";

  return (
    <div className="w-full flex-1 bg-[#F9FAFB] flex flex-col relative overflow-hidden z-0">
      {/* Global dot-grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

      {/* Header for search results - Natural Block flow */}
      <div className="bg-white/70 backdrop-blur-md border-b border-gray-100/50 py-8 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-[#1E3A8A] tracking-tight">{titlePrefix}Axtarış Nəticələri</h1>
            <p className="text-sm text-gray-500 mt-2 font-medium">
              {filteredProducts.length > 0 ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  {filteredProducts.length} premium məhsul tapıldı
                </span>
              ) : "Sizin üçün heç nə tapılmadı"}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-100 rounded-2xl text-sm font-bold text-[#1E3A8A] hover:bg-gray-50 hover:shadow-lg transition-all">
              <ArrowUpDown className="w-4 h-4" /> Sırala
              <ChevronDown className="w-4 h-4 ml-1 text-gray-400" />
            </button>
            <button className="lg:hidden flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#1E3A8A] text-white rounded-2xl text-sm font-bold hover:bg-[#1a3275] transition-all">
              <Filter className="w-4 h-4" /> Filterlər
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full flex-1 flex flex-col lg:flex-row gap-12 relative z-10">
        
        {/* Sidebar Filters */}
        <div className="hidden lg:block w-80 shrink-0">
          <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 sticky top-[100px] shadow-xl shadow-[#1E3A8A]/5 space-y-10">
            <div>
              <h2 className="text-xl font-black text-[#1E3A8A] mb-8 flex items-center gap-3 uppercase tracking-wider">
                <Filter className="w-5 h-5 text-[#166534]" />
                Filterlər
              </h2>
              
              {/* Price Filter */}
              <div className="mb-10">
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Qiymət Aralığı (₼)</h3>
                <PriceRangeSlider min={0} max={5000} />
              </div>

              {/* Brand Filter */}
              <div className="mb-10 pt-8 border-t border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Brendlər</h3>
                <div className="space-y-4">
                  {["Apple", "Samsung", "Sony", "Dyson", "LG", "Xiaomi"].map(brand => (
                    <label key={brand} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute" />
                        <div className="w-5 h-5 border-2 border-gray-200 rounded-lg bg-white peer-checked:bg-[#166534] peer-checked:border-[#166534] transition-all"></div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-0.75 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-[#1E3A8A] transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Store Filter */}
              <div className="pt-8 border-t border-gray-50">
                <h3 className="text-[10px] font-black text-gray-400 mb-6 uppercase tracking-[0.2em]">Mağazalar</h3>
                <div className="space-y-4">
                  {["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery", "Optimal"].map(store => (
                    <label key={store} className="flex items-center cursor-pointer group">
                      <div className="relative flex items-center">
                        <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute" />
                        <div className="w-5 h-5 border-2 border-gray-200 rounded-lg bg-white peer-checked:bg-[#1E3A8A] peer-checked:border-[#1E3A8A] transition-all"></div>
                        <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-0.75 opacity-0 peer-checked:opacity-100 transition-opacity" />
                      </div>
                      <span className="ml-3 text-sm font-bold text-gray-600 group-hover:text-[#1E3A8A] transition-colors">{store}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <button className="w-full bg-[#166534] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#14532d] shadow-lg shadow-[#166534]/20 transition-all active:scale-[0.98]">
              Tətbiq et
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-1">
          {filteredProducts.length === 0 ? (
             <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Search className="w-10 h-10 text-gray-300" />
                </div>
                <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">Heç nə tapılmadı</h3>
                <p className="text-gray-400 max-w-sm mx-auto">Seçdiyiniz kriteriyalara uyğun məhsul yoxdur. Zəhmət olmasa digər filterləri sınaqdan keçirin.</p>
             </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredProducts.map((product) => (
                  <Link href={`/product/${product.id}`} key={product.id} className="bg-[#FFFFFF] rounded-[2.5rem] border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-[#1E3A8A]/10 hover:border-[#1E3A8A]/10 hover:-translate-y-2 transition-all duration-500 ease-out group flex flex-col relative shadow-sm">
                    {/* Image Section */}
                    <div className="relative aspect-square overflow-hidden bg-white flex items-center justify-center p-10 border-b border-gray-50">
                      <div className="absolute top-5 left-5 z-10 flex flex-col gap-2">
                        {product.realDiscount ? (
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black bg-[#EA580C] text-white shadow-lg shadow-orange-500/20 uppercase tracking-widest">
                            <Tag className="w-3 h-3 mr-2" /> Real Endirim
                          </span>
                        ) : (
                          <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black bg-gray-900 text-white uppercase tracking-widest">
                             Süni Endirim
                          </span>
                        )}
                        <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black bg-yellow-400 text-gray-900 shadow-md uppercase tracking-widest">
                          ✨ {product.cashback} Kəşbək
                        </span>
                      </div>
                      <Image 
                        src={product.image} 
                        alt={product.title} 
                        width={250} 
                        height={250}
                        className="object-contain w-full h-full mix-blend-multiply group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    {/* Content Section */}
                    <div className="p-8 flex-1 flex flex-col">
                      {/* Rating */}
                      <div className="flex items-center gap-1.5 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-3.5 h-3.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'fill-gray-100 text-gray-100'}`} />
                        ))}
                        <span className="text-xs font-black text-gray-700 ml-1">{product.rating}</span>
                        <span className="text-[10px] text-gray-300">({product.reviews})</span>
                      </div>

                      <h3 className="text-lg font-bold text-[#1E3A8A] mb-6 line-clamp-2 leading-snug flex-1 group-hover:text-[#166534] transition-colors">
                        {product.title}
                      </h3>
                      
                      {/* Stores Preview */}
                      <div className="flex items-center gap-2 mb-8">
                        <div className="flex -space-x-2">
                          {product.stores.slice(0, 3).map((_, i) => (
                            <div key={i} className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-[10px] font-black text-gray-400">
                              {i + 1}
                            </div>
                          ))}
                        </div>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">{product.stores.length} mağaza təklifi</span>
                      </div>

                      {/* Price Section */}
                      <div className="mt-auto border-t border-gray-50 pt-6 flex flex-col gap-4">
                        <div className="flex justify-between items-baseline">
                          <span className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Platforma qiyməti:</span>
                          <span className="text-[#EA580C] font-black text-3xl tracking-tighter">{product.minPrice} ₼</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="inline-flex items-center text-[10px] font-black text-white bg-[#166534] px-3 py-1.5 rounded-full shadow-lg shadow-green-900/10 uppercase tracking-widest">
                            {product.cheapestStore}
                          </span>
                          <span className="text-xs font-bold text-gray-400 line-through decoration-2 decoration-gray-100">{product.maxPrice} ₼</span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-20 flex justify-center">
                <nav className="flex items-center gap-4 bg-white p-3 rounded-3xl border border-gray-100 shadow-xl shadow-[#1E3A8A]/5">
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-gray-400 hover:bg-gray-50 transition-all disabled:opacity-30">
                    <ChevronDown className="w-5 h-5 rotate-90" />
                  </button>
                  <button className="w-12 h-12 flex items-center justify-center bg-[#1E3A8A] text-white rounded-2xl font-black shadow-lg shadow-[#1E3A8A]/20">1</button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all">2</button>
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl font-bold text-gray-700 hover:bg-gray-50 transition-all">3</button>
                  <span className="text-gray-300 font-black">...</span>
                  <button className="w-12 h-12 flex items-center justify-center rounded-2xl text-[#1E3A8A] hover:bg-gray-50 transition-all">
                    <ChevronDown className="w-5 h-5 -rotate-90" />
                  </button>
                </nav>
              </div>
            </>
          )}
        </div>

      </div>
    </div>
  );
}
