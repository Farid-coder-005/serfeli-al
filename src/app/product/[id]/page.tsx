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
                <div key={i} className={`border p-2 min-w-[124px] cursor-pointer relative transition-all duration-200 ${v.active ? 'border-[#005ea8] shadow-md ring-1 ring-[#005ea8]' : 'border-gray-300 hover:shadow-md hover:border-[#005ea8] bg-white'}`}>
                   {v.discount && <div className={`absolute top-0 left-0 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 ${v.discount.includes('%') ? 'bg-[#FF5500]' : 'bg-[#005ea8]'}`}>{v.discount}</div>}
                   <div className="h-16 bg-gray-50 mb-2 mt-4 flex items-center justify-center rounded-sm">
                     <div className="w-8 h-10 border border-gray-200 bg-white shadow-sm"></div>
                   </div> {/* Mock Image space */}
                   <div className="text-[10px] font-bold leading-tight mb-2 uppercase tracking-tighter line-clamp-2 h-7">{v.name}</div>
                   <div className="text-[#FF5500] font-bold text-sm">€{v.price}</div>
                </div>
              ))}
           </div>
        </div>

        {/* Right: Price Chart Placeholder */}
        <div className="w-full md:w-1/4 bg-[#f8f9fa] border border-gray-200 p-5 flex flex-col justify-center items-center h-52 rounded-sm shadow-sm">
           <div className="text-xs font-bold text-gray-600 mb-4 uppercase tracking-widest">Price development</div>
           <div className="w-full h-24 mb-4 relative">
              <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
                 {/* Grid lines */}
                 <line x1="0" y1="10" x2="100" y2="10" stroke="#f3f4f6" strokeWidth="0.5" />
                 <line x1="0" y1="20" x2="100" y2="20" stroke="#f3f4f6" strokeWidth="0.5" />
                 <line x1="0" y1="30" x2="100" y2="30" stroke="#f3f4f6" strokeWidth="0.5" />
                 {/* The Price Line */}
                 <polyline points="0,15 10,15 12,25 15,20 25,20 30,35 35,25 50,25 55,10 65,10 70,22 85,22 90,30 100,28" fill="none" stroke="#FF5500" strokeWidth="1.5" strokeLinejoin="round" />
                 {/* Current Point */}
                 <circle cx="100" cy="28" r="2" fill="#FF5500" />
              </svg>
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
        <div className="grid grid-cols-1 border-t border-gray-200">
           <div className="flex border-b border-gray-200 py-3 even:bg-gray-50 odd:bg-white px-2 transition-colors hover:bg-blue-50/30 font-medium"><div className="w-1/3 text-gray-500 text-sm">Market launch</div><div className="w-2/3 text-sm font-bold">2023</div></div>
           <div className="flex border-b border-gray-200 py-3 even:bg-gray-50 odd:bg-white px-2 transition-colors hover:bg-blue-50/30 font-medium"><div className="w-1/3 text-gray-500 text-sm">Display size</div><div className="w-2/3 text-sm font-bold">6.5 inches / 16.51 cm</div></div>
           <div className="flex border-b border-gray-200 py-3 even:bg-gray-50 odd:bg-white px-2 transition-colors hover:bg-blue-50/30 font-medium"><div className="w-1/3 text-gray-500 text-sm">Display resolution</div><div className="w-2/3 text-sm font-bold">2400 x 1080 pixels</div></div>
           <div className="flex border-b border-gray-200 py-3 even:bg-gray-50 odd:bg-white px-2 transition-colors hover:bg-blue-50/30 font-black text-[#005ea8]"><div className="w-1/3 text-sm">Display type</div><div className="w-2/3 text-sm">POLED</div></div>
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
        
        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 mb-16">
           {["Bluetooth 5.3", "120 Hz", "5,000 mAh", "Android 14", "50 MP Camera", "256 GB", "OLED"].map(tag => (
             <span key={tag} className="bg-gray-100 text-gray-600 px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer hover:bg-[#005ea8] hover:text-white transition-all">
               {tag}
             </span>
           ))}
        </div>

        {/* SECTION 5: USER REVIEWS */}
        <div className="mb-16 border-t border-gray-200 pt-8">
           <h2 className="text-2xl font-bold mb-6">User reviews & Ratings</h2>
           <div className="flex flex-col md:flex-row gap-8">
              {/* Left: Overall Rating */}
              <div className="w-full md:w-1/4 flex flex-col items-center justify-center bg-gray-50 p-6 rounded-sm border border-gray-200">
                 <div className="text-5xl font-extrabold text-[#222222] mb-2">4.6</div>
                 <div className="flex text-[#FFCC00] text-xl mb-2">★★★★★</div>
                 <div className="text-sm text-gray-500">Based on 128 reviews</div>
              </div>
              
              {/* Right: Review List */}
              <div className="w-full md:w-3/4 flex flex-col gap-6">
                 {/* Review 1 */}
                 <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-2">
                          <div className="text-[#FFCC00] text-sm">★★★★★</div>
                          <div className="font-bold text-sm">Great value for money</div>
                       </div>
                       <div className="text-xs text-gray-500">12.04.2026</div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">The battery life is incredible and the POLED display is very vibrant. For this price point, you really can't complain. The camera is decent in daylight.</p>
                    <div className="text-xs text-gray-500 mt-2">By <span className="font-bold">TechEnthusiast99</span></div>
                 </div>
                 {/* Review 2 */}
                 <div className="border-b border-gray-200 pb-4">
                    <div className="flex justify-between items-center mb-2">
                       <div className="flex items-center gap-2">
                          <div className="text-[#FFCC00] text-sm">★★★★☆</div>
                          <div className="font-bold text-sm">Solid mid-ranger</div>
                       </div>
                       <div className="text-xs text-gray-500">05.04.2026</div>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">Good phone overall. The UI is clean (almost stock Android). Only giving 4 stars because the processor struggles a bit with heavy 3D games.</p>
                    <div className="text-xs text-gray-500 mt-2">By <span className="font-bold">Markus T.</span></div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </main>
  );
}
