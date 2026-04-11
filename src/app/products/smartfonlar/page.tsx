import Link from 'next/link';

export default function ProductListingPage() {
  // Safe mock data to prevent undefined mapping errors
  const mockProducts = [
    { id: 1, name: "Apple iPhone 15 Pro", price: "2489.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.1 inch, 120Hz, 8GB RAM", offers: "120 offers" },
    { id: 2, name: "Samsung Galaxy S24 Ultra", price: "2799.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.8 inch, 120Hz, 12GB RAM", offers: "85 offers" },
    { id: 3, name: "Xiaomi 14 Pro", price: "1899.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.7 inch, 120Hz, 12GB RAM", offers: "45 offers" },
    { id: 4, name: "Google Pixel 8 Pro", price: "2100.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.7 inch, 120Hz, 12GB RAM", offers: "30 offers" },
    { id: 5, name: "OnePlus 12", price: "1750.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.8 inch, 120Hz, 16GB RAM", offers: "22 offers" },
    { id: 6, name: "Sony Xperia 1 V", price: "2300.00", image: "https://placehold.co/200x200/png", specs: "5G, 6.5 inch, 120Hz, 12GB RAM", offers: "15 offers" }
  ];

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8">
       {/* Top Header */}
       <div className="text-sm text-gray-500 mb-4"><Link href="/" className="hover:underline">Ana Səhifə</Link> {'>'} Elektronika {'>'} Məhsullar</div>
       <div className="flex justify-between items-end mb-6 border-b border-gray-300 pb-4">
         <h1 className="text-3xl font-bold text-[#222222]">Məhsullar <span className="text-gray-500 text-lg font-normal">({mockProducts.length})*</span></h1>
         <div className="text-sm cursor-pointer border-b border-gray-400 pb-1">Ən populyarlar ⌄</div>
       </div>

       <div className="flex flex-col md:flex-row gap-8">
         {/* LEFT SIDEBAR (FILTERS) */}
         <aside className="w-full md:w-1/4 bg-[#f4f7f9] p-5 rounded">
            <div className="mb-6">
               <h3 className="font-bold text-lg mb-4">Qiymət</h3>
               <div className="flex gap-2 items-center mb-4">
                 <input type="text" placeholder="Min ₼" className="w-full p-2 border border-gray-300 rounded text-sm bg-white" />
                 <span>-</span>
                 <input type="text" placeholder="Max ₼" className="w-full p-2 border border-gray-300 rounded text-sm bg-white" />
                 <button className="bg-[#005ea8] text-white px-3 py-2 rounded">{'>'}</button>
               </div>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> 1000 ₼-ə qədər</label>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> 1000 ₼ - 2000 ₼</label>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> 2000 ₼-dən yuxarı</label>
            </div>
            <div className="mb-6">
               <h3 className="font-bold text-lg mb-4 border-t pt-4">İstehsalçı</h3>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> Apple</label>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> Samsung</label>
               <label className="flex items-center gap-2 mb-3 text-sm cursor-pointer"><input type="checkbox" className="w-4 h-4" /> Xiaomi</label>
            </div>
         </aside>

         {/* RIGHT MAIN CONTENT (GRID) */}
         <section className="w-full md:w-3/4">
            <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-gray-200">
               {mockProducts.map(product => (
                 <div key={product.id} className="border-r border-b border-gray-200 p-4 flex flex-col relative hover:shadow-lg transition-shadow bg-white">
                    <img src={product.image} alt={product.name} className="h-40 object-contain mx-auto mb-4 mt-2" />
                    <h3 className="font-bold text-[#222222] text-sm mb-2 hover:underline cursor-pointer">{product.name}</h3>
                    <p className="text-xs text-gray-600 mb-6">{product.specs}</p>
                    <div className="mt-auto">
                       <div className="text-xs text-gray-500 mb-1">{product.offers}</div>
                       <div className="text-xl font-bold text-[#FF5500]">from {product.price} ₼</div>
                       <div className="text-[#005ea8] text-sm font-bold mt-4 flex items-center gap-1 cursor-pointer hover:underline">
                          <span className="text-lg leading-none">↗</span> Məhsul detalları
                       </div>
                    </div>
                 </div>
               ))}
            </div>
         </section>
       </div>
    </main>
  );
}
