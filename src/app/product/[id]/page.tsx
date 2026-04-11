"use client";
import Link from 'next/link';

export default function ProductDetailPage() {
  const product = {
    name: "Motorola Moto G84 12GB Midnight Blue",
    overview: "6.5-inch · Full HD · 120 Hz · 50 MP · 12 GB RAM · 256 GB internal storage · Snapdragon 695 · Android 14 · 5,000 mAh battery",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=600&auto=format&fit=crop",
    variants: [
      { name: "12GB Midnight Blue", price: "230.00", discount: "-31%", active: true },
      { name: "12GB Viva Magenta", price: "249.00", discount: "-12%", active: false },
      { name: "8GB Viva Magenta", price: "209.99", discount: "Best price", active: false }
    ],
    offers: [
      { shop: "Amazon.de", price: "230.00", isCheapest: true, delivery: "In stock. Express shipping", rating: 4.9 },
      { shop: "Kaufland.de", price: "312.99", isCheapest: false, delivery: "Delivery until Fri. 17.04.", rating: 4.4 }
    ]
  };

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-6 text-[#222222] bg-white">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6">Elektronika {'>'} Smartfonlar {'>'} Motorola {'>'} {product.name}</div>

      {/* SECTION 1: HERO (Image, Info, Chart) */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        {/* Left: Image */}
        <div className="w-full md:w-1/4">
           <img src={product.image} alt={product.name} className="w-full object-contain" />
        </div>
        
        {/* Middle: Details & Variants */}
        <div className="w-full md:w-2/4">
           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
           <p className="text-sm text-gray-700 leading-relaxed mb-6"><span className="font-bold">Product overview:</span> {product.overview}</p>
           
           <div className="mb-2 font-bold">Variant:</div>
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.variants.map((v, i) => (
                <div key={i} className={`border p-2 min-w-[120px] cursor-pointer relative transition-all ${v.active ? 'border-[#005ea8] shadow-md ring-1 ring-[#005ea8]' : 'border-gray-300 hover:shadow-sm hover:border-[#005ea8]'}`}>
                   {v.discount && <div className={`absolute top-0 left-0 text-white text-[10px] font-bold px-1.5 py-0.5 ${v.discount.includes('%') ? 'bg-[#FF5500]' : 'bg-[#005ea8]'}`}>{v.discount}</div>}
                   <div className="h-16 bg-gray-50 mb-2 mt-4 flex items-center justify-center">
                     <div className="w-8 h-10 border border-gray-200"></div>
                   </div> {/* Mock Image space */}
                   <div className="text-[10px] font-bold leading-tight mb-2 uppercase tracking-tighter line-clamp-2">{v.name}</div>
                   <div className="text-[#FF5500] font-bold text-sm">€{v.price}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Price Chart Placeholder */}
        <div className="w-full md:w-1/4 bg-[#f8f9fa] border border-gray-200 p-5 flex flex-col justify-center items-center h-52 rounded-sm shadow-sm">
           <div className="text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">Price development</div>
           <div className="w-full h-20 border-b-2 border-l-2 border-[#FF5500] border-dashed mb-6 relative">
              <div className="absolute bottom-2 left-1/4 w-full h-[1px] bg-gray-200"></div>
              <div className="absolute top-4 left-0 w-2 h-2 rounded-full bg-[#FF5500]"></div>
           </div>
           <button className="border-2 border-[#005ea8] text-[#005ea8] w-full py-2.5 text-xs font-bold hover:bg-blue-50 transition-colors uppercase tracking-wider">⏰ Price alerts</button>
        </div>
      </div>

      {/* SECTION 2: PRICE COMPARISON */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-0 bg-[#F4F4F4] p-4 border border-b-0 border-gray-200">Price comparison</h2>
        <div className="flex flex-col border border-gray-200 rounded-b-sm overflow-hidden">
           {product.offers.map((offer, i) => (
             <div key={i} className="flex flex-col md:flex-row justify-between items-center bg-white border-b border-gray-100 last:border-b-0 py-6 px-4 hover:bg-gray-50 transition-colors">
                <div className="w-full md:w-1/4 font-bold text-sm underline cursor-pointer text-[#005ea8] hover:text-[#004a87] mb-4 md:mb-0 line-clamp-2 leading-tight">
                  {product.name}
                </div>
                <div className="w-full md:w-1/5 mb-4 md:mb-0">
                   <div className="text-3xl font-extrabold tracking-tighter">{offer.price} ₼</div>
                   {offer.isCheapest && <div className="text-[#FF5500] text-[10px] font-bold border border-[#FF5500] px-1.5 py-0.5 mt-2 inline-block uppercase tracking-widest">Cheapest total price</div>}
                </div>
                <div className="w-full md:w-1/4 text-xs text-gray-500 mb-4 md:mb-0 font-medium">
                  {offer.delivery}
                </div>
                <div className="w-full md:w-1/6 text-sm font-bold flex flex-col mb-4 md:mb-0">
                  <span className="text-[#222222]">{offer.shop}</span>
                  <span className="text-[#ffcc00] text-xs">⭐ {offer.rating}</span>
                </div>
                <div className="w-full md:w-1/6 text-right">
                   <button className="bg-[#1da661] text-white font-bold px-8 py-3 rounded-sm hover:bg-[#15894f] w-full shadow-md transition-shadow uppercase text-sm">Visit shop</button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* SECTION 3: PRODUCT DETAILS (Specs Table) */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#222222] pb-2">Product details</h2>
        <div className="grid grid-cols-1 border-gray-200 divide-y divide-gray-100">
           <div className="flex py-4 transition-colors hover:bg-gray-50"><div className="w-1/3 text-gray-500 text-sm font-medium">Market launch</div><div className="w-2/3 text-sm font-bold">2023</div></div>
           <div className="flex py-4 transition-colors hover:bg-gray-50"><div className="w-1/3 text-gray-500 text-sm font-medium">Display size</div><div className="w-2/3 text-sm font-bold">6.5 inches / 16.51 cm</div></div>
           <div className="flex py-4 transition-colors hover:bg-gray-50"><div className="w-1/3 text-gray-500 text-sm font-medium">Display resolution</div><div className="w-2/3 text-sm font-bold">2400 x 1080 pixels</div></div>
           <div className="flex py-4 transition-colors hover:bg-gray-50 bg-[#f9f9f9]/50"><div className="w-1/3 text-[#005ea8] text-sm font-bold">Display type</div><div className="w-2/3 text-sm font-black text-[#005ea8]">POLED</div></div>
        </div>
      </div>

      {/* SECTION 4: PROS/CONS & KEYWORDS */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Advantages and disadvantages</h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10">
           <div className="w-full md:w-1/2 border-2 border-green-100 bg-green-50/30 p-6 rounded-md shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-green-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-green-500 text-white rounded-full flex items-center justify-center text-sm">+</span>
                Advantages
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span> 
                  <span>Stylish design and premium build quality for the price tier.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-600 font-bold mt-0.5">•</span> 
                  <span>Large 5,000 mAh battery with impressive endurance.</span>
                </li>
              </ul>
           </div>
           <div className="w-full md:w-1/2 border-2 border-red-100 bg-red-50/30 p-6 rounded-md shadow-sm">
              <h3 className="font-bold text-lg mb-4 text-red-800 flex items-center gap-2">
                <span className="w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-sm">-</span>
                Disadvantages
              </h3>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2">
                  <span className="text-red-600 font-bold mt-0.5">•</span> 
                  <span>Older Snapdragon 695 processor might feel sluggish for high-end gaming.</span>
                </li>
              </ul>
           </div>
        </div>
        
        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100">
           {["Bluetooth 5.3", "120 Hz", "5,000 mAh", "Android 14", "50 MP Camera", "256 GB", "OLED"].map(tag => (
             <span key={tag} className="bg-gray-100 text-gray-600 px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer hover:bg-[#005ea8] hover:text-white transition-all">
               {tag}
             </span>
           ))}
        </div>
      </div>
    </main>
  );
}
