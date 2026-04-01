"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronRight,
  Star,
  Tag,
  ShieldCheck,
  TrendingDown,
  ChevronLeft,
  Info,
  Truck,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
  ReferenceLine,
} from "recharts";

// Mock Data for "iPhone 15 128GB Black"
const PRODUCT = {
  id: "iphone-15-128gb-black",
  title: "Apple iPhone 15, 128GB, Black",
  category: "Smartfonlar",
  image:
    "https://images.unsplash.com/photo-1696446701796-da61225697cc?q=80&w=800&h=800&fit=crop",
  minPrice: 1699,
  maxPrice: 1999,
  rating: 4.9,
  reviews: 128,
  realDiscount: true,
  cashback: "2%",
  specs: [
    { label: "Ekran", value: "6.1 düym Super Retina XDR OLED" },
    { label: "Prosessor", value: "A16 Bionic" },
    { label: "Daxili Yaddaş", value: "128 GB" },
    { label: "Operativ Yaddaş", value: "6 GB" },
    { label: "Əsas Kamera", value: "48 MP + 12 MP" },
    { label: "Batareya", value: "3349 mAh" },
  ],
};

// Mock Stores Data
const STORES = [
  {
    id: 1,
    name: "Kontakt Home",
    price: 1699,
    delivery: "Pulsuz, 1 gün ərzində",
    stock: "Stokda var",
    isCheapest: true,
  },
  {
    id: 2,
    name: "İrşad Electronics",
    price: 1749,
    delivery: "Pulsuz, 2 saat ərzində",
    stock: "Stokda var",
    isCheapest: false,
  },
  {
    id: 3,
    name: "Baku Electronics",
    price: 1799,
    delivery: "Standard (5 ₼), 1 gün",
    stock: "Məhdud sayda",
    isCheapest: false,
  },
  {
    id: 4,
    name: "AlmaStore",
    price: 1999,
    delivery: "Pulsuz, dərhal",
    stock: "Stokda var",
    isCheapest: false,
  },
];

// Mock 30-Day Price History Data
const PRICE_HISTORY = [
  { date: "01 Mar", price: 1999 },
  { date: "05 Mar", price: 1999 },
  { date: "10 Mar", price: 1899 },
  { date: "15 Mar", price: 1899 },
  { date: "18 Mar", price: 1849 },
  { date: "22 Mar", price: 1799 },
  { date: "26 Mar", price: 1749 },
  { date: "30 Mar", price: 1699 },
];

const minPricePoint = Math.min(...PRICE_HISTORY.map((d) => d.price));
const maxPricePoint = Math.max(...PRICE_HISTORY.map((d) => d.price));

// Custom Tooltip for the Chart
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-100 rounded-lg shadow-xl ring-1 ring-black ring-opacity-5">
        <p className="text-gray-500 text-xs mb-1">{label}</p>
        <p className="text-green-600 font-bold text-sm">
          {payload[0].value} ₼
        </p>
      </div>
    );
  }
  return null;
};

export default function ProductDetailPage() {
  const [activeTab, setActiveTab] = useState("prices");

  return (
    <main className="flex-1 flex flex-col w-full pt-[160px] min-h-screen relative z-10">
      <div className="min-h-screen bg-[#F8FAFC] font-sans text-gray-900 pb-20 relative overflow-hidden">
        {/* Global dot-grid pattern overlay */}
        <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

        {/* Breadcrumbs - Relative to Main Padding */}
        <div className="bg-white/70 backdrop-blur-md border-b border-gray-100/50 py-4 mb-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center text-sm text-gray-500 gap-2 font-medium">
              <Link href="/" className="hover:text-[#166534] transition-colors">
                Ana səhifə
              </Link>
              <ChevronRight className="w-4 h-4 opacity-30" />
              <Link
                href="/search"
                className="hover:text-[#166534] transition-colors"
              >
                Smartfonlar
              </Link>
              <ChevronRight className="w-4 h-4 opacity-30" />
              <span className="text-[#1E3A8A] font-black truncate">
                {PRODUCT.title}
              </span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12 relative z-10">
          
          {/* Product Overview Section */}
          <section className="bg-[#FFFFFF] rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row p-8 lg:p-12 gap-10 lg:gap-16 relative">
            
            {/* Decorative Background Blob */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-[#166534]/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

            {/* Left: Image */}
            <div className="w-full md:w-5/12 lg:w-2/5 flex flex-col items-center justify-center bg-gray-50/50 rounded-[2.5rem] p-12 border border-gray-100/50 relative group">
              <div className="relative w-full aspect-[4/5] flex items-center justify-center">
                <Image
                  src="https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=800&h=800&fit=crop"
                  alt={PRODUCT.title}
                  fill
                  className="object-contain mix-blend-multiply drop-shadow-2xl group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
            </div>

            {/* Right: Details */}
            <div className="w-full md:w-7/12 lg:w-3/5 flex flex-col">
              {/* Title & Rating */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black bg-yellow-400 text-gray-900 shadow-md uppercase tracking-widest border border-yellow-200">
                    ✨ {PRODUCT.cashback} Kəşbək
                  </span>
                  {PRODUCT.realDiscount && (
                    <span className="inline-flex items-center px-4 py-2 rounded-full text-[10px] font-black bg-[#EA580C] text-white shadow-lg shadow-orange-500/20 uppercase tracking-widest">
                      <Tag className="w-3.5 h-3.5 mr-2" /> Real Endirim
                    </span>
                  )}
                </div>
                <h1 className="text-4xl lg:text-5xl font-black text-[#1E3A8A] tracking-tight leading-[1.1] mb-6">
                  {PRODUCT.title}
                </h1>
                <div className="flex items-center gap-3 bg-gray-50 w-fit px-4 py-2 rounded-full border border-gray-100">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(PRODUCT.rating)
                            ? "fill-yellow-400 text-yellow-400"
                            : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-black text-gray-900">
                    {PRODUCT.rating}
                  </span>
                  <span className="text-xs font-bold text-gray-400">
                    ({PRODUCT.reviews} rəy)
                  </span>
                </div>
              </div>

              {/* Price Highlight */}
              <div className="bg-gradient-to-br from-white to-[#F1F5F9] rounded-[2.5rem] p-10 mb-10 border border-gray-100 shadow-sm flex flex-col sm:flex-row items-baseline gap-6 justify-between relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-[#EA580C]/5 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                  <p className="text-[10px] font-black text-[#EA580C] uppercase tracking-[0.3em] mb-3 flex items-center gap-2">
                    <TrendingDown className="w-4 h-4" /> Ən Ucuz Qiymət
                  </p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-6xl lg:text-7xl font-black text-[#EA580C] tracking-tighter">
                      {PRODUCT.minPrice}
                    </span>
                    <span className="text-3xl font-black text-[#EA580C]">₼</span>
                  </div>
                </div>
                <div className="text-right flex flex-col items-end relative z-10">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">Pərakəndə satış qiyməti</p>
                  <p className="text-2xl font-bold text-gray-300 line-through decoration-gray-200 decoration-2">
                    {PRODUCT.maxPrice} ₼
                  </p>
                </div>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-x-10 gap-y-6 mb-12">
                {PRODUCT.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col border-b border-gray-50 pb-4">
                    <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">{spec.label}</span>
                    <span className="text-sm font-bold text-[#1E3A8A]">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-auto flex gap-6">
                <Link
                  href="#prices"
                  className="flex-1 bg-[#1E3A8A] hover:bg-[#1a3275] text-white px-10 py-5 rounded-[1.5rem] font-black text-center shadow-xl shadow-[#1E3A8A]/20 transition-all active:scale-[0.98] flex items-center justify-center gap-3 uppercase tracking-widest text-sm"
                >
                  Qiymətləri Müqayisə Et
                </Link>
              </div>
            </div>
          </section>

          {/* 30-Day Price History Chart Section */}
          <section className="bg-[#FFFFFF] rounded-[3rem] border border-gray-100 shadow-sm p-8 lg:p-12">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-black text-[#1E3A8A] flex items-center gap-3 tracking-tight">
                  <TrendingDown className="w-8 h-8 text-[#166534]" />
                  Qiymət Tarixçəsi
                </h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">Son 30 gün ərzində qeydə alınan ən aşağı qiymətlər</p>
              </div>
              
              <div className="flex items-center gap-6 bg-gray-50 p-5 rounded-[2rem] border border-gray-100">
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Maksimum</span>
                  <span className="text-xl font-black text-[#1E3A8A]">{maxPricePoint} ₼</span>
                </div>
                <div className="w-px h-10 bg-gray-200"></div>
                <div className="flex flex-col">
                  <span className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1">Minimum</span>
                  <span className="text-xl font-black text-[#166534]">{minPricePoint} ₼</span>
                </div>
              </div>
            </div>

            <div className="h-96 w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={PRICE_HISTORY}
                  margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                  <XAxis 
                    dataKey="date" 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }} 
                    dy={15}
                  />
                  <YAxis 
                    domain={['dataMin - 50', 'dataMax + 50']} 
                    axisLine={false} 
                    tickLine={false} 
                    tick={{ fill: '#9ca3af', fontSize: 11, fontWeight: 700 }} 
                    tickFormatter={(val) => `${val} ₼`}
                    width={70}
                  />
                  <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#1E3A8A', strokeWidth: 2, strokeDasharray: '6 6', opacity: 0.2 }} />
                  
                  <ReferenceLine y={minPricePoint} stroke="#16a34a" strokeDasharray="6 6" opacity={0.3} />
                  
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#16a34a"
                    strokeWidth={5}
                    dot={{ r: 6, fill: '#fff', stroke: '#16a34a', strokeWidth: 3 }}
                    activeDot={{ r: 10, fill: '#16a34a', stroke: '#fff', strokeWidth: 4 }}
                    animationDuration={2000}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>

          {/* Price Comparison Table Section */}
          <section id="prices" className="bg-[#FFFFFF] rounded-[3rem] border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-8 lg:p-10 border-b border-gray-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-8 bg-gray-50/30">
              <div>
                <h2 className="text-3xl font-black text-[#1E3A8A] tracking-tight">Mağaza Təklifləri</h2>
                <p className="text-sm text-gray-500 mt-2 font-medium">{STORES.length} tərəfdaş mağazada mövcuddur</p>
              </div>
              <div className="flex bg-white p-2 rounded-2xl shadow-inner border border-gray-100 w-full md:w-auto">
                <button 
                  onClick={() => setActiveTab("prices")}
                  className={`flex-1 md:flex-none px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'prices' ? 'bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20' : 'text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50'}`}
                >
                  Ən Ucuz
                </button>
                <button 
                  onClick={() => setActiveTab("delivery")}
                  className={`flex-1 md:flex-none px-6 py-3 text-xs font-black uppercase tracking-widest rounded-xl transition-all ${activeTab === 'delivery' ? 'bg-[#1E3A8A] text-white shadow-lg shadow-[#1E3A8A]/20' : 'text-gray-400 hover:text-[#1E3A8A] hover:bg-gray-50'}`}
                >
                  Çatdırılma
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-gray-50/50 border-b border-gray-100">
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-1/4">Mağaza</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-1/4">Çatdırılma</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-1/6">Status</th>
                    <th className="px-10 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] w-1/6">Məbləğ</th>
                    <th className="px-10 py-6 w-1/6"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {STORES.map((store) => (
                    <tr 
                      key={store.id} 
                      className={`hover:bg-[#F9FAFB] transition-colors group ${store.isCheapest ? 'bg-[#166534]/5' : ''}`}
                    >
                      <td className="px-10 py-8 align-middle">
                        <div className="flex flex-col">
                          <span className="font-black text-[#1E3A8A] text-lg flex items-center gap-3">
                            {store.name}
                            {store.isCheapest && (
                              <span className="inline-flex items-center px-3 py-1 rounded-lg text-[9px] font-black bg-[#166534] text-white uppercase tracking-widest">
                                ƏN UCUZ
                              </span>
                            )}
                          </span>
                          <div className="flex items-center gap-2 mt-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            <ShieldCheck className="w-3.5 h-3.5 text-blue-500" /> Rəsmi zəmanət
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8 align-middle">
                        <div className="flex items-center gap-3 text-sm font-bold text-gray-600">
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                            <Truck className="w-4 h-4 text-[#1E3A8A]" />
                          </div>
                          {store.delivery}
                        </div>
                      </td>
                      <td className="px-10 py-8 align-middle">
                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest ${store.stock === 'Stokda var' ? 'bg-green-50 text-green-700' : 'bg-yellow-50 text-yellow-700'}`}>
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {store.stock}
                        </div>
                      </td>
                      <td className="px-10 py-8 align-middle">
                        <div className="flex items-baseline gap-1">
                          <span className={`text-3xl font-black ${store.isCheapest ? 'text-[#EA580C]' : 'text-gray-900'}`}>
                            {store.price}
                          </span>
                          <span className="text-lg font-black text-gray-400">₼</span>
                        </div>
                      </td>
                      <td className="px-10 py-8 align-middle text-right">
                        <button className={`inline-flex items-center justify-center gap-3 px-8 py-4 rounded-[1.25rem] font-black text-[11px] uppercase tracking-widest transition-all active:scale-[0.98] w-full sm:w-auto ${
                          store.isCheapest 
                            ? 'bg-[#EA580C] text-white hover:bg-[#d94e0b] shadow-xl shadow-orange-500/20' 
                            : 'bg-white border-2 border-gray-100 text-[#1E3A8A] hover:border-[#1E3A8A]/30 hover:bg-gray-50'
                        }`}>
                          Mağazaya keç <ExternalLink className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
