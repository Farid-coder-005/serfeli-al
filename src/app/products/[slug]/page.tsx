import DetailedProductCard from "@/components/DetailedProductCard";

const MOCK_PRODUCTS = [
  {
    id: "p1",
    title: "iPhone 15 Pro 128GB Black Titanium",
    category: "Smartfonlar",
    description: "6.1 düymlük Super Retina XDR ekran, A17 Pro çipi, 48MP əsas kamera və USB-C dəstəyi.",
    imageUrl: "https://placehold.co/400x400/png?text=iPhone+15+Pro",
    offers: [{ currentPrice: 2499, store: { name: "Kontakt Home" } }]
  },
  {
    id: "p2",
    title: "Samsung Galaxy S24 Ultra 256GB Titanium Gray",
    category: "Smartfonlar",
    description: "6.8 düymlük Dynamic AMOLED 2X ekran, Snapdragon 8 Gen 3, 200MP kamera və S Pen dəstəyi.",
    imageUrl: "https://placehold.co/400x400/png?text=Galaxy+S24+Ultra",
    offers: [{ currentPrice: 2359, store: { name: "Irsad" } }]
  },
  {
    id: "p3",
    title: "Xiaomi 14 Ultra 512GB Black",
    category: "Smartfonlar",
    description: "Leica optikası ilə 1 düymlük sensor, Snapdragon 8 Gen 3 və 90W sürətli şarj.",
    imageUrl: "https://placehold.co/400x400/png?text=Xiaomi+14+Ultra",
    offers: [{ currentPrice: 1999, store: { name: "Baku Electronics" } }]
  },
  {
    id: "p4",
    title: "Google Pixel 8 Pro 128GB Porcelain",
    category: "Smartfonlar",
    description: "Google Tensor G3 prosessoru, möhtəşəm süni intellekt kamera xüsusiyyətləri.",
    imageUrl: "https://placehold.co/400x400/png?text=Pixel+8+Pro",
    offers: [{ currentPrice: 1649, store: { name: "Music Gallery" } }]
  },
  {
    id: "p5",
    title: "OnePlus 12 256GB Silky Black",
    category: "Smartfonlar",
    description: "Hasselblad kamera sistemi, 120Hz LTPO ekran və 100W SuperVOOC şarj.",
    imageUrl: "https://placehold.co/400x400/png?text=OnePlus+12",
    offers: [{ currentPrice: 1459, store: { name: "Kontakt Home" } }]
  },
  {
    id: "p6",
    title: "Nothing Phone (2) 256GB Dark Gray",
    category: "Smartfonlar",
    description: "Unikal Glyph interfeysi, Snapdragon 8+ Gen 1 və təmiz Android təcrübəsi.",
    imageUrl: "https://placehold.co/400x400/png?text=Nothing+Phone+2",
    offers: [{ currentPrice: 1199, store: { name: "Irsad" } }]
  }
];

export default function ProductListingPage({ params }: { params: { slug: string } }) {
  const categoryName = params.slug.charAt(0).toUpperCase() + params.slug.slice(1).replace(/-/g, ' ');

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-6">
      {/* Top Header */}
      <div className="text-sm text-gray-500 mb-4">Ana Səhifə {'>'} Elektronika {'>'} {categoryName}</div>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 gap-4">
        <h1 className="text-3xl font-bold text-[#1a1a1a]">
          {categoryName} <span className="text-gray-400 text-lg font-normal">(8,847)*</span>
        </h1>
        <div className="text-sm border-b border-gray-400 pb-1 cursor-pointer font-medium hover:text-[#005ea8] transition-colors">
          Ən populyarlar ⌄
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* LEFT SIDEBAR (FILTERS) - 25% Width */}
        <aside className="w-full md:w-1/4">
          <div className="bg-[#f4f7f9] p-6 rounded-lg sticky top-24">
             {/* Price Filter */}
             <div className="mb-8">
                <h3 className="font-bold text-lg mb-4 text-[#1a1a1a]">Qiymət</h3>
                <div className="flex gap-2 items-center mb-6">
                  <div className="relative flex-1">
                    <input type="text" placeholder="Min ₼" className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:border-[#005ea8] outline-none transition-colors" />
                  </div>
                  <span className="text-gray-400">-</span>
                  <div className="relative flex-1">
                    <input type="text" placeholder="Max ₼" className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:border-[#005ea8] outline-none transition-colors" />
                  </div>
                  <button className="bg-[#005ea8] text-white p-2.5 rounded hover:bg-[#004a87] transition-colors flex items-center justify-center">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="9 5l7 7-7 7" /></svg>
                  </button>
                </div>
                {/* Checkboxes */}
                <div className="space-y-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#005ea8] focus:ring-[#005ea8]" />
                    <span className="text-sm text-gray-700 group-hover:text-[#005ea8] transition-colors">100 ₼-ə qədər</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#005ea8] focus:ring-[#005ea8]" />
                    <span className="text-sm text-gray-700 group-hover:text-[#005ea8] transition-colors">100 ₼ - 500 ₼</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#005ea8] focus:ring-[#005ea8]" />
                    <span className="text-sm text-gray-700 group-hover:text-[#005ea8] transition-colors">500 ₼ - 1500 ₼</span>
                  </label>
                </div>
             </div>

             {/* Manufacturer Filter */}
             <div className="mb-6 border-t border-white pt-6">
                <h3 className="font-bold text-lg mb-4 text-[#1a1a1a]">İstehsalçı</h3>
                <div className="relative mb-4">
                  <input type="text" placeholder="Axtarış..." className="w-full p-2.5 bg-white border border-gray-200 rounded text-sm focus:border-[#005ea8] outline-none transition-colors pr-10" />
                  <svg className="w-4 h-4 absolute right-3 top-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                </div>
                <div className="space-y-3">
                  {["Apple", "Samsung", "Xiaomi", "Google", "Huawei"].map(brand => (
                    <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-[#005ea8] focus:ring-[#005ea8]" />
                      <span className="text-sm text-gray-700 group-hover:text-[#005ea8] transition-colors">{brand}</span>
                    </label>
                  ))}
                </div>
             </div>
          </div>
        </aside>

        {/* RIGHT MAIN CONTENT (GRID) - 75% Width */}
        <section className="w-full md:w-3/4">
           {/* Grid Container */}
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-l border-gray-200 shadow-sm rounded-sm overflow-hidden">
              {MOCK_PRODUCTS.map(product => (
                <DetailedProductCard key={product.id} product={product} />
              ))}
              {/* Repeating for height */}
              {MOCK_PRODUCTS.map(product => (
                <DetailedProductCard key={product.id + '-2'} product={product} />
              ))}
           </div>

           {/* Pagination Box */}
           <div className="flex justify-center md:justify-end mt-12 mb-20">
              <div className="flex items-center gap-2">
                 {[1, 2, 3, 4, 5].map(num => (
                   <button 
                    key={num} 
                    className={`w-10 h-10 flex items-center justify-center font-bold transition-all border ${num === 1 ? 'bg-[#005ea8] text-white border-[#005ea8]' : 'bg-white text-gray-600 border-gray-200 hover:border-[#005ea8] hover:text-[#005ea8]'}`}
                   >
                     {num}
                   </button>
                 ))}
                 <button className="bg-[#005ea8] text-white w-10 h-10 flex items-center justify-center hover:bg-[#004a87] transition-colors border border-[#005ea8]">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                 </button>
              </div>
           </div>
        </section>
      </div>
    </main>
  );
}
