"use client";

import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceDot,
} from "recharts";
import { TrendingDown, AlertCircle, Info, Maximize2, Minimize2, CheckCircle2 } from "lucide-react";

type PricePoint = {
  price: number;
  recordedAt: Date | string;
};

interface PriceHistoryChartProps {
  data: PricePoint[];
}

export const PriceHistoryChart: React.FC<PriceHistoryChartProps> = ({ data }) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  // Sort and analyze data
  const { chartData, minPrice, maxPrice, averagePrice, priceChangePercent } = React.useMemo(() => {
    if (data.length === 0) return { chartData: [], minPrice: 0, maxPrice: 0, averagePrice: 0, priceChangePercent: 0 };

    const sorted = [...data]
      .map((p) => ({
        price: p.price,
        date: new Date(p.recordedAt).toLocaleDateString("az-AZ", {
          day: "2-digit",
          month: "short",
        }),
        fullDate: new Date(p.recordedAt).toLocaleDateString("az-AZ", {
          day: "2-digit",
          month: "long",
        }),
        rawDate: new Date(p.recordedAt).getTime(),
      }))
      .sort((a, b) => a.rawDate - b.rawDate);

    const prices = sorted.map(d => d.price);
    const min = Math.min(...prices);
    const max = Math.max(...prices);
    const avg = prices.reduce((a, b) => a + b, 0) / prices.length;
    
    const startPrice = prices[0];
    const currentPrice = prices[prices.length - 1];
    const change = ((currentPrice - startPrice) / startPrice) * 100;

    return { 
      chartData: sorted, 
      minPrice: min, 
      maxPrice: max, 
      averagePrice: avg,
      priceChangePercent: change 
    };
  }, [data]);

  if (!isMounted) {
    return <div className="w-full h-[450px] bg-white/50 backdrop-blur-sm animate-pulse rounded-[3rem] border border-gray-100/50" />;
  }

  if (chartData.length === 0) {
    return (
      <div className="h-[450px] flex flex-col items-center justify-center bg-white rounded-[3rem] border border-dashed border-gray-100">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
          <Info className="w-8 h-8 text-gray-200" />
        </div>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-[11px]">Məlumat mövcud deyil</p>
      </div>
    );
  }

  const currentPrice = chartData[chartData.length - 1].price;
  const isLowest = currentPrice <= minPrice;
  const isVolatile = maxPrice - minPrice > (averagePrice * 0.2); // 20% volatility threshold

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white/90 backdrop-blur-xl p-5 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2rem] ring-1 ring-black/[0.03]">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] mb-3 border-b border-gray-100/50 pb-2">
            {payload[0].payload.fullDate}
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-[#FF6B00] tracking-tighter">
              {payload[0].value}
            </span>
            <span className="text-[11px] font-black text-gray-400 uppercase">AZN</span>
          </div>
          {payload[0].value === minPrice && (
            <div className="mt-2 flex items-center gap-1 text-[9px] font-black text-[#FF6B00] uppercase tracking-wider bg-orange-50 px-2 py-0.5 rounded-full w-max">
              <TrendingDown className="w-2.5 h-2.5" strokeWidth={3} /> Ayın ən aşağısı
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full space-y-8">
      {/* Background Section Container */}
      <div className="bg-white rounded-[3.5rem] border border-gray-100 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.03)] p-8 sm:p-12 relative group">
        {/* Abstract background blobs for a premium look */}
        <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-emerald-50/40 rounded-full blur-[100px] pointer-events-none group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-0 left-0 w-[30%] h-[30%] bg-blue-50/20 rounded-full blur-[80px] pointer-events-none group-hover:-translate-x-10 transition-transform duration-1000" />

        <div className="relative z-10">
          {/* Header & Badges */}
          <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-10 mb-12 sm:mb-16">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="h-px w-6 bg-orange-600/30" />
                <span className="text-[10px] font-black text-orange-600/60 uppercase tracking-[0.4em]">Smart Qiymət Təhlili</span>
              </div>
              <div className="flex items-baseline gap-4">
                <h3 className="text-4xl sm:text-6xl font-black text-[#1e293b] tracking-tighter leading-none">
                  {currentPrice}
                  <span className="text-lg sm:text-xl text-gray-300 ml-2 uppercase font-black tracking-widest">AZN</span>
                </h3>
                {priceChangePercent !== 0 && (
                  <div className={`px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider ${priceChangePercent < 0 ? 'bg-orange-50 text-orange-600' : 'bg-red-50 text-red-600'}`}>
                    {priceChangePercent < 0 ? '↓' : '↑'} {Math.abs(priceChangePercent).toFixed(1)}%
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              {isLowest && (
                <div className="flex items-center gap-3 px-6 py-4 bg-[#FF6B00] text-white rounded-[1.5rem] shadow-sm hover:shadow-md transition-all cursor-default">
                  <div className="w-6 h-6 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                    <TrendingDown className="w-4 h-4" strokeWidth={3} />
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-[0.15em]">Əla Fürsət!</span>
                </div>
              )}
              {isVolatile ? (
                <div className="flex items-center gap-3 px-6 py-4 bg-white border border-red-100 text-red-600 rounded-[1.5rem] shadow-sm hover:border-red-200 transition-all cursor-default">
                  <Minimize2 className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-[0.15em] opacity-80">Qiymət Dəyişkəndir</span>
                </div>
              ) : (
                <div className="flex items-center gap-3 px-6 py-4 bg-white border border-orange-100/50 text-orange-700/60 rounded-[1.5rem] shadow-sm cursor-default">
                  <CheckCircle2 className="w-5 h-5" />
                  <span className="text-[11px] font-black uppercase tracking-[0.15em]">Stabil Qiymət</span>
                </div>
              )}
            </div>
          </div>

          {/* Chart Visualization */}
          <div className="w-full h-[320px] sm:h-[380px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 20, right: 10, left: 10, bottom: 20 }}>
                <defs>
                   <linearGradient id="premiumGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#FF6B00" stopOpacity={0.15} />
                    <stop offset="50%" stopColor="#FF6B00" stopOpacity={0.02} />
                    <stop offset="100%" stopColor="#FF6B00" stopOpacity={0} />
                  </linearGradient>
                </defs>
                
                <CartesianGrid 
                  strokeDasharray="0" 
                  vertical={false} 
                  stroke="#f8fafc" 
                  strokeWidth={2}
                />
                
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#475569', letterSpacing: '0.05em' }}
                  dy={20}
                  minTickGap={40}
                />
                
                <YAxis 
                  orientation="right"
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fontWeight: 900, fill: '#334155' }}
                  tickFormatter={(v) => `${v}₼`}
                  dx={10}
                />

                <Tooltip 
                  content={<CustomTooltip />} 
                  cursor={{ 
                    stroke: '#FF6B00', 
                    strokeWidth: 2, 
                    strokeDasharray: '4 4', 
                    opacity: 0.3 
                  }} 
                />

                <Area
                  type="monotone"
                  dataKey="price"
                  stroke="#FF6B00"
                  strokeWidth={6}
                  fillOpacity={1}
                  fill="url(#premiumGradient)"
                  animationDuration={2500}
                  animationEasing="ease-in-out"
                  activeDot={{ 
                    r: 10, 
                    fill: '#fff', 
                    stroke: '#FF6B00', 
                    strokeWidth: 5,
                    className: "shadow-2xl"
                  }}
                />

                {/* Highlight Minimum Price Point */}
                <ReferenceDot
                  x={chartData.find(d => d.price === minPrice)?.date}
                  y={minPrice}
                  r={5}
                  fill="#FF6B00"
                  stroke="#fff"
                  strokeWidth={3}
                  label={{ 
                    position: 'bottom', 
                    value: 'Ən Aşağı', 
                    fill: '#FF6B00', 
                    fontSize: 10, 
                    letterSpacing: '0.1em',
                    fontWeight: 900,
                    dy: 10
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between px-12 opacity-30 group-hover:opacity-100 transition-opacity duration-700">
        <div className="flex items-center gap-4">
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Təhlükəsiz Məlumat bazası</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.5em]">Real-Time Verifikasiya</span>
          <div className="w-1.5 h-1.5 rounded-full bg-orange-600" />
        </div>
      </div>
    </div>
  );
};


