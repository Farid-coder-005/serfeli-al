"use client";
import Link from 'next/link';
import { useState } from 'react';

export default function ProductDetailsPage() {
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);

  // Advanced Mock Data with coordinates (x, y), price, and date
  const detailedChartData = [
    { x: 0, y: 20, price: '849.00', date: '01 Fev' },
    { x: 15, y: 25, price: '830.00', date: '15 Fev' },
    { x: 30, y: 40, price: '817.99', date: '07 Mar' }, // Example dip
    { x: 50, y: 35, price: '825.00', date: '20 Mar' },
    { x: 70, y: 60, price: '780.00', date: '05 Apr' },
    { x: 90, y: 80, price: '749.90', date: '11 Apr' },
    { x: 100, y: 80, price: '749.90', date: '13 Apr' }
  ];

  // Generate polyline path
  const polylinePoints = detailedChartData.map(d => `${d.x},${d.y}`).join(' ');
  // Generate polygon path for gradient fill (closing the bottom)
  const polygonPoints = `${polylinePoints} 100,100 0,100`;

  // TRANSLATED MOCK DATA
  const product = {
    name: "Motorola Moto G84 12GB Gecə Mavisi",
    overview: "6.5-düym · Full HD · 120 Hz · 50 MP · 12 GB RAM · 256 GB daxili yaddaş · Snapdragon 695 · Android 14 · 5,000 mAh batareya",
    image: "https://images.unsplash.com/photo-1598327105666-5b89351cb315?q=80&w=600&auto=format&fit=crop",
    variants: [
      { name: "12GB Gecə Mavisi", price: "230.00", discount: "-31%", active: true },
      { name: "12GB Qırmızı", price: "249.00", discount: "-12%", active: false },
      { name: "8GB Qırmızı", price: "209.99", discount: "Ən yaxşı qiymət", active: false }
    ],
    offers: [
      { shop: "Amazon.de", price: "230.00", isCheapest: true, delivery: "Anbarda. Sürətli çatdırılma.", rating: 4.9 },
      { shop: "Kaufland.de", price: "312.99", isCheapest: false, delivery: "17 Aprelə qədər çatdırılma.", rating: 4.4 }
    ]
  };

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-6 text-[#222222] bg-white">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6"><Link href="/" className="hover:underline">Elektronika</Link> {'>'} Smartfonlar {'>'} Motorola {'>'} {product.name}</div>

      {/* SECTION 1: HERO */}
      <div className="flex flex-col md:flex-row gap-8 mb-12">
        <div className="w-full md:w-1/4">
           <img src={product.image} alt={product.name} className="w-full object-contain" />
        </div>
        
        <div className="w-full md:w-2/4">
           <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
           <p className="text-sm text-gray-700 leading-relaxed mb-6"><span className="font-bold">Məhsulun xülasəsi:</span> {product.overview}</p>
           
           <div className="mb-2 font-bold">Variantlar:</div>
           <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar">
              {product.variants.map((v, i) => (
                <div key={i} className={`border p-2 min-w-[124px] cursor-pointer transition-shadow relative ${v.active ? 'border-[#005ea8] shadow-md ring-1 ring-[#005ea8]' : 'border-gray-300 hover:shadow-md hover:border-[#005ea8] bg-white'}`}>
                   {v.discount && <div className={`absolute top-0 left-0 text-white text-[10px] font-bold px-1.5 py-0.5 z-10 ${v.discount.includes('%') ? 'bg-[#FF5500]' : 'bg-[#005ea8]'}`}>{v.discount}</div>}
                   <div className="h-16 bg-gray-50 mb-2 mt-4 flex items-center justify-center rounded-sm">
                     <div className="w-8 h-10 border border-gray-200 bg-white shadow-sm"></div>
                   </div>
                   <div className="text-[10px] font-bold leading-tight mb-2 uppercase tracking-tighter line-clamp-2 h-7">{v.name}</div>
                   <div className="text-[#FF5500] font-bold text-sm">{v.price} ₼</div>
                </div>
              ))}
           </div>
        </div>

        <div className="w-full md:w-1/4 bg-gray-50 border border-gray-200 p-4 flex flex-col justify-center h-48 rounded-sm cursor-pointer hover:shadow-md transition-shadow group" onClick={() => setIsChartModalOpen(true)}>
           <div className="flex justify-between items-center mb-4">
              <div className="text-[10px] tracking-wider uppercase font-bold text-gray-600 group-hover:text-[#005ea8] transition-colors">Qiymət dinamikası ↗</div>
           </div>
           
           <div className="w-full h-24 mb-4 relative pointer-events-none">
              <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible" preserveAspectRatio="none">
                 <defs>
                    <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                       <stop offset="0%" stopColor="#FF5500" stopOpacity="0.2"/>
                       <stop offset="100%" stopColor="#FF5500" stopOpacity="0"/>
                    </linearGradient>
                 </defs>
                 <polygon points={polygonPoints} fill="url(#chartGradient)" />
                 <polyline points={polylinePoints} fill="none" stroke="#FF5500" strokeWidth="2" strokeLinejoin="round" />
              </svg>
           </div>
           <button className="border border-[#005ea8] text-[#005ea8] bg-white px-4 py-1.5 text-sm font-bold w-full pointer-events-none">Geniş baxış</button>
        </div>
      </div>

      {/* SECTION 2: PRICE COMPARISON */}
      <div className="mb-16">
        <h2 className="text-xl font-bold mb-0 bg-[#F4F4F4] p-4 border border-b-0 border-gray-200">Qiymət müqayisəsi</h2>
        <div className="flex flex-col border border-gray-200 rounded-b-sm overflow-hidden">
           {product.offers.map((offer, i) => (
             <div key={i} className="flex flex-col md:flex-row justify-between items-center bg-white border-b border-gray-100 last:border-b-0 py-6 px-4 hover:bg-gray-50 transition-colors">
                <div className="w-full md:w-1/4 font-bold text-sm text-[#005ea8] hover:underline cursor-pointer md:mb-0 mb-4 line-clamp-2 leading-tight">{product.name}</div>
                <div className="w-full md:w-1/5 mb-4 md:mb-0 flex flex-col justify-center">
                   <div className="text-3xl font-extrabold text-[#222222] tracking-tighter">{offer.price} ₼</div>
                   {offer.isCheapest && <div className="text-[#FF5500] text-[10px] uppercase font-bold tracking-wider border border-[#FF5500] px-1.5 py-0.5 mt-2 inline-block w-max">Ən ucuz yekun qiymət</div>}
                </div>
                <div className="w-full md:w-1/4 text-xs text-gray-500 mb-4 md:mb-0 font-medium">{offer.delivery}</div>
                <div className="w-full md:w-1/6 text-sm font-bold flex flex-col mb-4 md:mb-0">
                  <span className="text-[#222222]">{offer.shop}</span>
                  <span className="text-[#FFCC00] text-xs">★ {offer.rating}</span>
                </div>
                <div className="w-full md:w-1/6 text-right">
                   <button className="bg-[#1da661] text-white font-bold px-8 py-3 rounded-sm hover:bg-[#15894f] transition-colors w-full shadow-md uppercase text-sm">Mağazaya keç</button>
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* SECTION 3: PRODUCT DETAILS */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 border-b-2 border-[#222222] pb-2">Məhsul detalları</h2>
        <div className="grid grid-cols-1 border-t border-gray-200">
           <div className="flex border-b border-gray-200 py-3.5 px-4 even:bg-gray-50 odd:bg-white transition-colors hover:bg-blue-50/30"><div className="w-1/3 text-gray-500 text-sm font-medium">Satışa çıxarılma ili</div><div className="w-2/3 text-sm font-bold">2023</div></div>
           <div className="flex border-b border-gray-200 py-3.5 px-4 even:bg-gray-50 odd:bg-white transition-colors hover:bg-blue-50/30"><div className="w-1/3 text-gray-500 text-sm font-medium">Ekran ölçüsü</div><div className="w-2/3 text-sm font-bold">6.5 düym / 16.51 sm</div></div>
           <div className="flex border-b border-gray-200 py-3.5 px-4 even:bg-gray-50 odd:bg-white transition-colors hover:bg-blue-50/30"><div className="w-1/3 text-gray-500 text-sm font-medium">Ekran icazəsi</div><div className="w-2/3 text-sm font-bold">2400 x 1080 piksel</div></div>
           <div className="flex border-b border-gray-200 py-3.5 px-4 even:bg-gray-50 odd:bg-white transition-colors hover:bg-blue-50/30 font-black text-[#005ea8]"><div className="w-1/3 text-sm">Ekran növü</div><div className="w-2/3 text-sm">POLED</div></div>
        </div>
      </div>

      {/* SECTION 4: PROS/CONS */}
      <div className="mb-20">
        <h2 className="text-2xl font-bold mb-6">Üstünlükləri və çatışmazlıqları</h2>
        <div className="flex flex-col md:flex-row gap-8 mb-10">
           <div className="w-full md:w-1/2 border-2 border-green-100 bg-green-50/30 p-6 rounded-md shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-green-800 font-bold text-lg">
                <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm leading-none">+</div>
                Üstünlükləri
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0"></div> Qiymətinə görə qəşəng və premium dizayn.</li>
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 shrink-0"></div> 5,000 mAh batareya ilə uzunmüddətli enerji.</li>
              </ul>
           </div>
           <div className="w-full md:w-1/2 border-2 border-red-100 bg-red-50/30 p-6 rounded-md shadow-sm">
              <div className="flex items-center gap-2 mb-4 text-red-800 font-bold text-lg">
                <div className="bg-red-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-sm leading-none">-</div>
                Çatışmazlıqları
              </div>
              <ul className="space-y-4 text-sm text-gray-700">
                <li className="flex items-start gap-2"><div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 shrink-0"></div> Köhnə Snapdragon 695 prosessoru ağır oyunlarda zəifləyir.</li>
              </ul>
           </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-6 border-t border-gray-100 mb-16">
           {["Bluetooth 5.3", "120 Hz", "5,000 mAh", "Android 14", "50 MP Kamera", "256 GB", "OLED"].map(tag => (
             <span key={tag} className="bg-gray-100 text-gray-600 px-4 py-1.5 text-xs font-bold rounded-full cursor-pointer hover:bg-[#005ea8] hover:text-white transition-all">
               {tag}
             </span>
           ))}
        </div>
      </div>

      {/* SECTION 5: REVIEWS */}
      <div className="mb-16 border-t border-gray-200 pt-10">
         <h2 className="text-2xl font-bold mb-8">İstifadəçi rəyləri və Reytinqlər</h2>
         <div className="flex flex-col md:flex-row gap-10">
            <div className="w-full md:w-1/4 flex flex-col items-center justify-center bg-gray-50 p-8 rounded-sm border border-gray-200">
               <div className="text-6xl font-extrabold text-[#222222] mb-3">4.6</div>
               <div className="flex text-[#FFCC00] text-2xl mb-3">★★★★★</div>
               <div className="text-sm text-gray-500 font-medium font-bold">128 rəy əsasında</div>
            </div>
            
            <div className="w-full md:w-3/4 flex flex-col gap-8">
               <div className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                        <div className="flex text-[#FFCC00] text-lg mb-1">★★★★★</div>
                        <div className="font-bold text-base text-[#222222]">Qiymətinə görə əla dəyər</div>
                     </div>
                     <div className="text-xs text-gray-400">12 Aprel 2026</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">Batareyanın ömrü inanılmazdır və POLED ekran çox canlıdır. Bu qiymətə həqiqətən şikayət etmək olmaz. Kamera gündüz işığında çox yaxşı çəkir.</p>
                  <div className="text-xs text-gray-500 font-medium">Müəllif: <span className="font-bold text-gray-700">Kənan M.</span></div>
               </div>
               
               <div className="border-b border-gray-100 pb-6">
                  <div className="flex justify-between items-start mb-3">
                     <div>
                        <div className="flex text-[#FFCC00] text-lg mb-1">★★★★<span className="text-gray-300">★</span></div>
                        <div className="font-bold text-base text-[#222222]">Yaxşı orta seqment</div>
                     </div>
                     <div className="text-xs text-gray-400">05 Aprel 2026</div>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed mb-3">Ümumilikdə yaxşı telefondur. İnterfeys çox təmizdir. Sadəcə 4 ulduz verirəm, çünki prosessor ağır 3D oyunlarda bir az çətinlik çəkir.</p>
                  <div className="text-xs text-gray-500 font-medium font-medium">Müəllif: <span className="font-bold text-gray-700">Rəşad Ə.</span></div>
               </div>
            </div>
         </div>
      </div>
      {/* INTERACTIVE CHART MODAL */}
      {isChartModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white w-full max-w-3xl rounded-sm shadow-2xl flex flex-col">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <div>
                <h2 className="text-2xl font-bold text-[#222222]">Qiymət dinamikası</h2>
                <p className="text-sm text-gray-500 mt-1">{product.name}</p>
              </div>
              <button onClick={() => setIsChartModalOpen(false)} className="text-gray-400 hover:text-black text-3xl leading-none">&times;</button>
            </div>
            
            {/* Modal Body - Large Interactive Chart */}
            <div className="p-8 relative h-96">
              <div className="absolute top-4 right-8 flex gap-2">
                 <button className="border border-gray-300 text-gray-600 px-3 py-1 text-sm rounded hover:bg-gray-50">1 Ay</button>
                 <button className="bg-[#005ea8] text-white border border-[#005ea8] px-3 py-1 text-sm rounded">3 Ay</button>
                 <button className="border border-gray-300 text-gray-600 px-3 py-1 text-sm rounded hover:bg-gray-50">6 Ay</button>
              </div>

              <svg viewBox="0 0 100 100" className="w-full h-full mt-10 overflow-visible" onMouseLeave={() => setHoveredPoint(null)}>
                 <defs>
                    <linearGradient id="modalGradient" x1="0" x2="0" y1="0" y2="1">
                       <stop offset="0%" stopColor="#FF5500" stopOpacity="0.25"/>
                       <stop offset="100%" stopColor="#FF5500" stopOpacity="0"/>
                    </linearGradient>
                 </defs>
                 
                 {/* Grid Lines */}
                 <line x1="0" y1="25" x2="100" y2="25" stroke="#f3f4f6" strokeWidth="0.5" />
                 <line x1="0" y1="50" x2="100" y2="50" stroke="#f3f4f6" strokeWidth="0.5" />
                 <line x1="0" y1="75" x2="100" y2="75" stroke="#f3f4f6" strokeWidth="0.5" />
                 <line x1="0" y1="100" x2="100" y2="100" stroke="#e5e7eb" strokeWidth="1" />
                 
                 {/* Filled Area & Line */}
                 <polygon points={polygonPoints} fill="url(#modalGradient)" />
                 <polyline points={polylinePoints} fill="none" stroke="#FF5500" strokeWidth="1.5" strokeLinejoin="round" />
                 
                 {/* Interactive Overlay & Tooltips */}
                 {detailedChartData.map((d, i) => (
                    <g key={i}>
                       {/* Invisible wide circle for easier hovering */}
                       <circle cx={d.x} cy={d.y} r="6" fill="transparent" className="cursor-crosshair outline-none" 
                               onMouseEnter={() => setHoveredPoint(d)} />
                       
                       {/* The visible dot and tooltip when hovered */}
                       {hoveredPoint?.x === d.x && (
                          <>
                             <line x1={d.x} y1={d.y} x2={d.x} y2="100" stroke="#9ca3af" strokeWidth="0.5" strokeDasharray="1,1" />
                             <circle cx={d.x} cy={d.y} r="2" fill="#FF5500" stroke="white" strokeWidth="1" />
                             
                             {/* HTML Tooltip mapped to SVG coordinates via foreignObject */}
                             <foreignObject x={d.x > 50 ? d.x - 32 : d.x + 2} y={d.y > 20 ? d.y - 20 : d.y + 2} width="30" height="15" className="overflow-visible">
                                <div className="bg-[#FF5500] text-white text-[6px] font-bold p-1 rounded-sm shadow-md whitespace-nowrap">
                                   {d.price} ₼ <br/>
                                   <span className="font-normal opacity-90">{d.date} 2026</span>
                                </div>
                             </foreignObject>
                          </>
                       )}
                    </g>
                 ))}
              </svg>
            </div>
            
            {/* Modal Footer */}
            <div className="bg-gray-50 p-6 flex justify-between items-center border-t border-gray-200">
              <div>
                 <div className="text-gray-500 text-sm">Ən aşağı qiymət</div>
                 <div className="text-xs text-gray-400">74 gün əvvəl</div>
              </div>
              <div className="text-2xl font-bold text-[#222222]">668.33 ₼</div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
