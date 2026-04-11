import { ProductCard } from "@/components/ProductCard";

const SUB_CATEGORIES = [
  {
    title: "Kompüterlər",
    image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2671&auto=format&fit=crop",
    links: ["Noutbuklar", "Masaüstü kompüterlər", "Planşetlər", "Monitorlar"]
  },
  {
    title: "Mobil Telefonlar",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?q=80&w=2680&auto=format&fit=crop",
    links: ["Smartfonlar", "Düyməli telefonlar", "Aksesuarlar", "Powerbank-lar"]
  },
  {
    title: "Audio və Video",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2670&auto=format&fit=crop",
    links: ["Qulaqlıqlar", "Dinamiklər", "Televizorlar", "Ev kinoteatrları"]
  },
  {
    title: "Foto və Kamera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2672&auto=format&fit=crop",
    links: ["Fotoaparatlar", "Video kameralar", "Obyektivlər", "Ştativlər"]
  }
];

const BESTSELLERS = [
  {
    id: "b1",
    title: "iPhone 15 Pro 256GB Natural Titanium",
    category: "Smartfonlar",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-1inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692847118915",
    offers: [{ currentPrice: 2849, store: { name: "Kontakt Home" } }]
  },
  {
    id: "b2",
    title: "MacBook Air 13 M2 8GB/256GB - Space Gray",
    category: "Noutbuklar",
    imageUrl: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/macbook-air-spacegray-select-20220606?wid=900&hei=1050&fmt=jpeg&qlt=90&.v=1653084303665",
    offers: [{ currentPrice: 2199, store: { name: "Irsad" } }]
  },
  {
    id: "b3",
    title: "Sony WH-1000XM5 Wireless Headphones",
    category: "Qulaqlıqlar",
    imageUrl: "https://m.media-amazon.com/images/I/51aXvjzcukL._AC_SL1500_.jpg",
    offers: [{ currentPrice: 649, store: { name: "Baku Electronics" } }]
  }
];

const DEALS = [
  ...BESTSELLERS,
  {
    id: "d1",
    title: "Samsung Galaxy S24 Ultra 512GB",
    category: "Smartfonlar",
    imageUrl: "https://m.media-amazon.com/images/I/71Wkad619RL._AC_SL1500_.jpg",
    offers: [{ currentPrice: 2459, store: { name: "Kontakt Home" } }]
  },
  {
    id: "d2",
    title: "PlayStation 5 Slim Edition",
    category: "Oyun Konsolları",
    imageUrl: "https://m.media-amazon.com/images/I/51fS8rT0iPL._AC_SL1500_.jpg",
    offers: [{ currentPrice: 1149, store: { name: "Music Gallery" } }]
  }
];

export default function CategoryPage() {
  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8 bg-white">
      {/* 1. Breadcrumbs & Title */}
      <div className="text-sm text-gray-500 mb-4 px-1">Ana Səhifə {'>'} Elektronika</div>
      <h1 className="text-4xl font-extrabold text-[#1a1a1a] mb-10 px-1">Elektronika</h1>

      {/* 2. Sub-Category 4-Column Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
         {SUB_CATEGORIES.map((cat, i) => (
           <div key={i} className="group cursor-pointer">
             <div className="h-48 bg-gray-50 mb-4 flex items-center justify-center rounded-xl overflow-hidden border border-gray-100 group-hover:border-[#005ea8] transition-all">
               <img 
                 src={cat.image} 
                 alt={cat.title} 
                 className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
               />
             </div>
             <h3 className="text-xl font-bold border-b border-gray-100 pb-2 mb-3 text-[#1a1a1a] group-hover:text-[#005ea8] transition-colors flex justify-between items-center">
               {cat.title} <span>{'>'}</span>
             </h3>
             <ul className="space-y-2">
                {cat.links.map((link, j) => (
                  <li key={j} className="text-sm text-gray-600 hover:text-[#005ea8] transition-colors cursor-pointer">{link}</li>
                ))}
             </ul>
           </div>
         ))}
      </div>

      {/* 3. Bestsellers Static Grid (Not a carousel) */}
      <div className="mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Bestsellers in "Elektronika"</h2>
          <span className="text-[#005ea8] font-bold text-sm cursor-pointer hover:underline">Hamsına bax</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {BESTSELLERS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>

      {/* 4. Deals Carousel */}
      <div className="mb-16">
        <div className="flex justify-between items-end mb-6">
          <h2 className="text-2xl font-extrabold text-[#1a1a1a]">Deals in "Elektronika"</h2>
          <span className="text-[#005ea8] font-bold text-sm cursor-pointer hover:underline">Hamsına bax</span>
        </div>
        <div className="flex gap-4 overflow-x-auto snap-x pb-6 no-scrollbar">
            {DEALS.map((product) => (
              <div key={product.id} className="min-w-[280px] md:min-w-[300px] flex-none snap-start">
                <ProductCard product={product} />
              </div>
            ))}
        </div>
      </div>
    </main>
  );
}
