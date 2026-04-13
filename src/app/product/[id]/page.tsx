"use client";
import Link from 'next/link';
import { useState, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip as RechartsTooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#FF5500] text-white text-xs font-bold px-3 py-2 rounded shadow-xl border border-[#CC4400]">
        <div className="text-base">{Number(payload[0].value).toFixed(2)} ₼</div>
        <div className="font-normal opacity-90">{payload[0].payload.date} {payload[0].payload.year}</div>
      </div>
    );
  }
  return null;
};

const azMonths = ['Yan', 'Fev', 'Mar', 'Apr', 'May', 'İyn', 'İyl', 'Avq', 'Sen', 'Okt', 'Noy', 'Dek'];

// Helper to generate continuous daily mock data
const generateDailyData = (days: number, startPrice: number) => {
  const data = [];
  let currentPrice = startPrice;
  const today = new Date('2026-04-13'); // Fixed current date context
  
  for (let i = days; i >= 0; i--) {
    const date = new Date(today);
    date.setDate(today.getDate() - i);
    
    // Add slight realistic random fluctuation
    const fluctuation = (Math.random() - 0.4) * 5; 
    currentPrice = currentPrice + fluctuation;
    
    // Force a big drop specifically 74 days ago to match the "Lowest price" UI
    if (i === 74) currentPrice = 668.33;
    if (i < 74 && currentPrice < 668.33) currentPrice = 675.00; // Bounce back

    // Manual formatting to bypass Vercel locale limitations
    const dayString = date.getDate().toString().padStart(2, '0');
    const monthString = azMonths[date.getMonth()];

    data.push({
      date: `${dayString} ${monthString}`,
      year: date.getFullYear(),
      price: Number(currentPrice.toFixed(2))
    });
  }
  return data;
};

const richChartData = {
  '1 Ay': generateDailyData(30, 800),
  '3 Ay': generateDailyData(90, 850),
  '6 Ay': generateDailyData(180, 900),
  '1 İl': generateDailyData(365, 1000)
};

const StoreLogo = ({ storeName }: { storeName: string }) => {
  const brands: Record<string, { bg: string, text: string }> = {
    'Kontakt Home': { bg: 'bg-[#e30613]', text: 'text-white' },
    'İrşad': { bg: 'bg-[#00a651]', text: 'text-white' },
    'Baku Electronics': { bg: 'bg-[#0033a0]', text: 'text-white' },
    'Maxi.az': { bg: 'bg-[#01509a]', text: 'text-[#f47920]' },
    'Optimal': { bg: 'bg-[#003c9b]', text: 'text-white' }
  };
  const style = brands[storeName] || { bg: 'bg-gray-800', text: 'text-white' };
  
  return (
    <div className={`flex items-center justify-center px-4 py-1.5 rounded-sm font-bold text-sm shadow-sm ${style.bg} ${style.text} w-32 h-10`}>
      {storeName}
    </div>
  );
};

export default function ProductDetailsPage() {
  const [isChartModalOpen, setIsChartModalOpen] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<any>(null);
  const [timeFrame, setTimeFrame] = useState<keyof typeof richChartData>('3 Ay');
  const [mounted, setMounted] = useState(false);

  const [paymentMethod, setPaymentMethod] = useState<'nagd' | 'kredit'>('nagd');
  const [creditTerm, setCreditTerm] = useState(24);
  const creditOptions = [3, 6, 9, 12, 15, 18, 21, 24];

  useEffect(() => {
    setMounted(true);
  }, []);

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
    ]
  };

  const comparisonOffers = [
    { id: 1, store: 'İrşad', price: 230.00, delivery: 'Pulsuz çatdırılma', isLowest: true },
    { id: 2, store: 'Kontakt Home', price: 235.50, delivery: 'Pulsuz çatdırılma', isLowest: false },
    { id: 3, store: 'Baku Electronics', price: 239.00, delivery: 'Pulsuz çatdırılma', isLowest: false },
    { id: 4, store: 'Maxi.az', price: 245.99, delivery: 'Pulsuz çatdırılma', isLowest: false },
    { id: 5, store: 'Optimal', price: 249.00, delivery: 'Pulsuz çatdırılma', isLowest: false },
  ];

  const stats = useMemo(() => {
    const currentData = richChartData[timeFrame];
    if (!currentData || currentData.length === 0) return null;

    const prices = currentData.map(d => d.price);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const avgPrice = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    const minIndex = prices.indexOf(minPrice);
    const maxIndex = prices.indexOf(maxPrice);
    
    // Array ends with today, so index 0 is oldest
    const daysAgoMin = currentData.length - 1 - minIndex;
    const daysAgoMax = currentData.length - 1 - maxIndex;
    const totalDays = currentData.length;
    
    const currentPrice = prices[prices.length - 1];
    
    const getDiff = (comparePrice: number) => {
      const diff = currentPrice - comparePrice;
      if (diff > 0) return { value: `↗ ${diff.toFixed(2)} ₼`, color: 'text-[#d32f2f]' };
      if (diff < 0) return { value: `↘ ${Math.abs(diff).toFixed(2)} ₼`, color: 'text-[#1da661]' };
      return { value: `- 0.00 ₼`, color: 'text-gray-500' };
    };

    return {
      min: { price: minPrice.toFixed(2), daysAgo: daysAgoMin, diff: getDiff(minPrice) },
      max: { price: maxPrice.toFixed(2), daysAgo: daysAgoMax, diff: getDiff(maxPrice) },
      avg: { price: avgPrice.toFixed(2), daysAgo: totalDays, diff: getDiff(avgPrice) }
    };
  }, [timeFrame]);

  return (
    <>
      <main className="max-w-[1200px] mx-auto w-full px-4 py-6 text-[#222222] bg-white">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6"><Link href="/" className="hover:underline">Elektronika</Link> {'>'} Smartfonlar {'>'} Motorola {'>'} {product.name}</div>

        {/* SECTION 1: HERO */}
        <div className="flex flex-col md:flex-row gap-8 mb-12">
          <div className="w-full md:w-1/4">
             <img src={product.image} alt={product.name} className="w-full object-contain" />
          </div>
          
          <div className="w-full md:w-[45%]">
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

        {/* RIGHT COLUMN: RICH MINI-CHART BLOCK */}
        <div className="w-full md:w-[30%] flex flex-col mt-4 md:mt-0">
          <div 
            className="cursor-pointer transition-all hover:opacity-95 group" 
            onClick={() => setIsChartModalOpen(true)}
          >
            {/* Header */}
            <div className="text-xl font-bold text-center text-[#222222] mb-4">Qiymət dinamikası</div>

            <div className="flex justify-center gap-2 mb-4 relative z-10">
              {Object.keys(richChartData).map((tf) => (
                <button
                  key={tf}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation(); // CRITICAL: Prevents the modal from opening when clicking buttons
                    setTimeFrame(tf as "1 Ay" | "3 Ay" | "6 Ay" | "1 İl");
                  }}
                  className={`px-3 py-1.5 text-sm font-bold rounded transition-all ${
                    timeFrame === tf
                      ? 'bg-[#005ea8] text-white shadow-md'
                      : 'border border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>

            {/* Mini-Chart Line */}
            {/* Dynamic Mini Recharts Instance */}
            <div className="w-full h-32 mt-4 pointer-events-none">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={richChartData[timeFrame]} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="miniIdealoFill" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FF5500" stopOpacity={0.15}/>
                      <stop offset="100%" stopColor="#FF5500" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <Area 
                    type="linear" 
                    dataKey="price" 
                    stroke="#FF5500" 
                    strokeWidth={1.5} 
                    fillOpacity={1} 
                    fill="url(#miniIdealoFill)" 
                    isAnimationActive={false}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Detailed Statistics Row */}
            {stats && (
              <div className="flex items-center justify-between border-y border-gray-100 py-4 mb-6">
                <div className="flex flex-col items-center flex-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Ən aşağı</div>
                  <div className="text-lg font-black text-[#222222]">{stats.min.price} ₼</div>
                  <div className="text-[9px] text-gray-400">{stats.min.daysAgo} gün əvvəl</div>
                </div>
                
                <div className="w-px h-10 bg-gray-100"></div>

                <div className="flex flex-col items-center flex-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Orta</div>
                  <div className="text-lg font-black text-[#222222]">{stats.avg.price} ₼</div>
                  <div className="text-[9px] text-gray-400">{stats.avg.daysAgo} gün ərzində</div>
                </div>

                <div className="w-px h-10 bg-gray-100"></div>

                <div className="flex flex-col items-center flex-1">
                  <div className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">Ən yüksək</div>
                  <div className="text-lg font-black text-[#222222]">{stats.max.price} ₼</div>
                  <div className="text-[9px] text-gray-400">{stats.max.daysAgo} gün əvvəl</div>
                </div>
              </div>
            )}

            {/* Centered Bottom Button */}
            <div className="flex justify-center">
              <button className="flex items-center gap-2 border border-[#005ea8] text-[#005ea8] bg-white px-5 py-2 rounded-sm text-xs font-bold hover:bg-blue-50 transition-colors">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
                Qiymət bildirişi
              </button>
            </div>
          </div>
        </div>
      </div>

        {/* SECTION 2: PRICE COMPARISON */}
        <div className="mb-16">
          <div className="bg-gray-50 border-b border-gray-200">
            {/* Main Header & Tabs */}
            <div className="flex flex-col md:flex-row md:items-end justify-between px-6 pt-4">
              <h2 className="text-xl font-bold text-[#222222] pb-4">Qiymət müqayisəsi</h2>
              
              <div className="flex text-lg font-medium text-[#005ea8]">
                <button 
                  onClick={() => setPaymentMethod('kredit')}
                  className={`px-8 py-3 border-b-2 transition-colors ${paymentMethod === 'kredit' ? 'border-[#005ea8] text-[#005ea8]' : 'border-transparent text-gray-500 hover:text-[#005ea8]'}`}
                >
                  Kredit qiymətləri
                </button>
                <button 
                  onClick={() => setPaymentMethod('nagd')}
                  className={`px-8 py-3 border-b-2 transition-colors ${paymentMethod === 'nagd' ? 'border-[#005ea8] text-[#005ea8]' : 'border-transparent text-gray-500 hover:text-[#005ea8]'}`}
                >
                  Nağd alış qiymətləri
                </button>
              </div>
            </div>

            {/* Credit Months Sub-menu (Only visible if Kredit is active) */}
            {paymentMethod === 'kredit' && (
              <div className="bg-white border-t border-gray-200 p-4 flex justify-end gap-2">
                {creditOptions.map(months => (
                  <button
                    key={months}
                    onClick={() => setCreditTerm(months)}
                    className={`px-5 py-1.5 border rounded text-sm transition-colors ${creditTerm === months ? 'bg-[#1877f2] text-white border-[#1877f2]' : 'bg-gray-50 text-[#222222] border-gray-300 hover:bg-gray-100'}`}
                  >
                    {months} ay
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="flex flex-col border border-gray-200 rounded-b-sm overflow-hidden">
             {comparisonOffers.map((offer, index) => (
               <div key={offer.id} className={`flex items-center justify-between p-6 ${index !== comparisonOffers.length - 1 ? 'border-b border-gray-100' : ''}`}>
                 {/* Product Name */}
                 <div className="w-1/4">
                   <div className="text-[#005ea8] font-bold hover:underline cursor-pointer">
                     {product.name}
                   </div>
                 </div>
                 
                 {/* Price & Badge */}
                 <div className="w-1/4 flex flex-col items-center">
                   <div className="flex items-end gap-1">
                     <span className="text-3xl font-extrabold text-[#222222]">
                       {paymentMethod === 'nagd' ? offer.price.toFixed(2) : (offer.price / creditTerm).toFixed(2)}
                     </span>
                     <span className="text-xl font-bold text-[#222222] mb-1">₼</span>
                   </div>
                   {paymentMethod === 'kredit' && (
                     <span className="text-sm text-gray-500 font-medium mt-0.5">/ ayda</span>
                   )}
                   {offer.isLowest && paymentMethod === 'nagd' && (
                     <span className="mt-1 text-[10px] font-bold text-[#ff5500] border border-[#ff5500] px-2 py-0.5 rounded uppercase tracking-wider">
                       Ən ucuz yekun qiymət
                     </span>
                   )}
                 </div>
                 
                 {/* Delivery Info */}
                 <div className="w-1/4 text-center text-sm text-gray-500">
                   {offer.delivery}
                 </div>
                 
                 {/* Store Logo & Button (NO RATINGS/STARS) */}
                 <div className="w-1/4 flex items-center justify-end gap-6">
                   <StoreLogo storeName={offer.store} />
                   <button className="bg-[#1da661] hover:bg-[#15874f] text-white font-bold py-2 px-6 rounded transition-colors shadow-sm">
                     MAĞAZAYA KEÇ
                   </button>
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
      </main>

      {/* REACT PORTAL: FORCING MODAL TO document.body TO BYPASS ALL HEADERS */}
      {isChartModalOpen && mounted && createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-hidden" style={{ zIndex: 2147483647 }}>
          <div className="bg-white w-full max-w-4xl max-h-[95vh] overflow-y-auto rounded-sm shadow-2xl flex flex-col relative">
            {/* ABSOLUTE CLOSE BUTTON (Sticky to the top right of the modal) */}
            <button onClick={() => setIsChartModalOpen(false)} className="absolute top-4 right-6 text-gray-400 hover:text-[#FF5500] text-4xl leading-none z-50 transition-colors">&times;</button>
            
            <div className="flex flex-col p-8">
              <h2 className="text-2xl font-bold text-[#222222]">Qiymət dinamikası</h2>
              <p className="text-sm text-gray-500 mt-1">{product.name}</p>
              
              {/* Timeframe Toggles */}
              <div className="flex justify-end gap-2 mt-4 mb-8">
                 {Object.keys(richChartData).map(tf => (
                    <button 
                      key={tf} 
                      onClick={() => setTimeFrame(tf as "1 Ay" | "3 Ay" | "6 Ay" | "1 İl")} 
                      className={`px-4 py-1.5 text-sm font-bold rounded transition-all ${timeFrame === tf ? 'bg-[#005ea8] text-white shadow-md' : 'border border-gray-300 text-gray-600 hover:bg-gray-50'}`}
                    >
                      {tf}
                    </button>
                 ))}
              </div>

              {/* RECHARTS IMPLEMENTATION */}
              <div className="w-full h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={richChartData[timeFrame]} margin={{ top: 20, right: 20, left: 10, bottom: 0 }}>
                    <defs>
                      <linearGradient id="idealoFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#FF5500" stopOpacity={0.1}/>
                        <stop offset="100%" stopColor="#FF5500" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    
                    {/* Add subtle horizontal lines for easy reading */}
                    <CartesianGrid vertical={false} stroke="#e5e7eb" strokeDasharray="3 3" />
                    
                    {/* Visible X Axis (Dates) */}
                    <XAxis 
                      dataKey="date" 
                      tick={{fontSize: 12, fill: '#6b7280'}} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10} 
                    />
                    
                    {/* Visible Y Axis (Prices) */}
                    <YAxis 
                      domain={['dataMin - 20', 'dataMax + 20']} 
                      tick={{fontSize: 12, fill: '#6b7280'}} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(val) => `${val} ₼`} 
                      width={65}
                    />
                    
                    <RechartsTooltip 
                      content={<CustomTooltip />} 
                      cursor={{ stroke: '#FF5500', strokeWidth: 1, strokeDasharray: '4 4' }} 
                    />
                    
                    <Area 
                      type="linear" 
                      dataKey="price" 
                      stroke="#FF5500" 
                      strokeWidth={1.5} 
                      fillOpacity={1} 
                      fill="url(#idealoFill)" 
                      activeDot={{ r: 5, fill: '#FF5500', stroke: '#ffffff', strokeWidth: 2 }} 
                      animationDuration={500} 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
            
            {/* NEW MODAL FOOTER: Full Statistics Panel */}
            {stats && (
              <div className="bg-white px-8 pb-8 pt-4 flex flex-col mt-auto border-t border-gray-200">
                
                {/* Row 1: Lowest */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="w-1/3">
                    <div className="text-[#222222] font-medium text-base">Ən aşağı qiymət</div>
                    <div className="text-sm text-gray-500 mt-0.5">{stats.min.daysAgo} gün əvvəl</div>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-2xl font-normal text-[#222222]">{stats.min.price} ₼</span>
                  </div>
                  <div className="w-1/3 text-right">
                    <span className={`${stats.min.diff.color} text-sm font-medium`}>{stats.min.diff.value}</span>
                  </div>
                </div>

                {/* Row 2: Average */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100">
                  <div className="w-1/3">
                    <div className="text-[#222222] font-medium text-base">Orta qiymət</div>
                    <div className="text-sm text-gray-500 mt-0.5">{stats.avg.daysAgo} gün ərzində</div>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-2xl font-normal text-[#222222]">{stats.avg.price} ₼</span>
                  </div>
                  <div className="w-1/3 text-right">
                    <span className={`${stats.avg.diff.color} text-sm font-medium`}>{stats.avg.diff.value}</span>
                  </div>
                </div>

                {/* Row 3: Highest */}
                <div className="flex items-center justify-between py-4 border-b border-gray-100 mb-6">
                  <div className="w-1/3">
                    <div className="text-[#222222] font-medium text-base">Ən yüksək qiymət</div>
                    <div className="text-sm text-gray-500 mt-0.5">{stats.max.daysAgo} gün əvvəl</div>
                  </div>
                  <div className="w-1/3 text-center">
                    <span className="text-2xl font-normal text-[#222222]">{stats.max.price} ₼</span>
                  </div>
                  <div className="w-1/3 text-right">
                    <span className={`${stats.max.diff.color} text-sm font-medium`}>{stats.max.diff.value}</span>
                  </div>
                </div>

                {/* Price Alerts Button */}
                <div className="flex justify-center">
                  <button className="flex items-center gap-2 border border-[#005ea8] text-[#005ea8] bg-white px-6 py-2 rounded text-sm font-bold hover:bg-blue-50 transition-colors">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                       <circle cx="12" cy="12" r="9" strokeWidth="2"></circle>
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 7v5l3 3"></path>
                    </svg>
                    Qiymət bildirişi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
