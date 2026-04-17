"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
}

export default function PriceRangeSlider({ min = 0, max = 10000 }: PriceRangeSliderProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize from URL or defaults
  const initialMin = Number(searchParams.get("minPrice")) || min;
  const initialMax = Number(searchParams.get("maxPrice")) || max;

  const [minVal, setMinVal] = useState(initialMin);
  const [maxVal, setMaxVal] = useState(initialMax);
  
  const minValRef = useRef(initialMin);
  const maxValRef = useRef(initialMax);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Sync with URL when params change externally (e.g. clear filters)
  useEffect(() => {
    const urlMin = Number(searchParams.get("minPrice")) || min;
    const urlMax = Number(searchParams.get("maxPrice")) || max;
    setMinVal(urlMin);
    setMaxVal(urlMax);
    minValRef.current = urlMin;
    maxValRef.current = urlMax;
  }, [searchParams, min, max]);

  // Update URL function (debounced)
  const updateURL = useCallback((newMin: number, newMax: number) => {
    const params = new URLSearchParams(searchParams.toString());
    
    if (newMin > min) params.set("minPrice", newMin.toString());
    else params.delete("minPrice");
    
    if (newMax < max) params.set("maxPrice", newMax.toString());
    else params.delete("maxPrice");

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [pathname, router, searchParams, min, max]);

  // Handle slider changes
  useEffect(() => {
    const minPercent = getPercent(minVal);
    const maxPercent = getPercent(maxValRef.current);
    if (rangeRef.current) {
      rangeRef.current.style.left = `${minPercent}%`;
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [minVal, getPercent]);

  useEffect(() => {
    const minPercent = getPercent(minValRef.current);
    const maxPercent = getPercent(maxVal);
    if (rangeRef.current) {
      rangeRef.current.style.width = `${maxPercent - minPercent}%`;
    }
  }, [maxVal, getPercent]);

  return (
    <div className="w-full">
      {/* Value Labels */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex flex-col">
          <span 
            className="text-[10px] text-[#1E293B] font-[900] uppercase tracking-widest mb-1 leading-none"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Min
          </span>
          <span className="text-sm font-bold text-slate-800 tracking-tight leading-none">{minVal.toLocaleString()} ₼</span>
        </div>
        <div className="flex flex-col items-end">
          <span 
            className="text-[10px] text-[#1E293B] font-[900] uppercase tracking-widest mb-1 leading-none"
            style={{ fontFamily: "'Montserrat', sans-serif" }}
          >
            Max
          </span>
          <span className="text-sm font-bold text-slate-800 tracking-tight leading-none">{maxVal.toLocaleString()} ₼</span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative h-2 w-full mb-8">
        {/* Background track */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 rounded-full" />

        {/* Active range highlight */}
        <div
          ref={rangeRef}
          className="absolute top-0 h-1.5 bg-[#FF6B00] rounded-full shadow-[0_0_10px_rgba(255,85,0,0.1)]"
        />

        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={50}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 200);
            setMinVal(value);
            minValRef.current = value;
          }}
          onMouseUp={() => updateURL(minVal, maxVal)}
          onTouchEnd={() => updateURL(minVal, maxVal)}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer thumb-slider-orange"
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step={50}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 200);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          onMouseUp={() => updateURL(minVal, maxVal)}
          onTouchEnd={() => updateURL(minVal, maxVal)}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer thumb-slider-orange"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Preset Chips */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {[
          { label: "0–500", min: 0, max: 500 },
          { label: "500–2000", min: 500, max: 2000 },
          { label: "2000–5000", min: 2000, max: 5000 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { 
              setMinVal(preset.min); 
              setMaxVal(preset.max); 
              minValRef.current = preset.min; 
              maxValRef.current = preset.max; 
              updateURL(preset.min, preset.max);
            }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold border transition-all active:scale-95 ${
              minVal === preset.min && maxVal === preset.max
                ? "bg-[#FF6B00] text-white border-[#FF6B00] shadow-lg shadow-[#FF6B00]/20"
                : "bg-white text-[#1E293B] border-slate-100 hover:border-[#FF6B00]/30 hover:text-[#FF6B00]"
            }`}
          >
            {preset.label} ₼
          </button>
        ))}
      </div>

      {/* CSS for thumb styling */}
      <style jsx>{`
        .thumb-slider-orange::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 4px solid #FF6B00;
          box-shadow: 0 4px 10px rgba(255, 85, 0, 0.3);
          cursor: pointer;
          pointer-events: all;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .thumb-slider-orange::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }
        .thumb-slider-orange::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 4px solid #FF6B00;
          box-shadow: 0 4px 10px rgba(255, 85, 0, 0.3);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
