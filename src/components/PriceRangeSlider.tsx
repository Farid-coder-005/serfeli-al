"use client";

import React, { useState, useRef, useCallback, useEffect } from "react";

interface PriceRangeSliderProps {
  min?: number;
  max?: number;
}

export default function PriceRangeSlider({ min = 0, max = 5000 }: PriceRangeSliderProps) {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);
  const minValRef = useRef(minVal);
  const maxValRef = useRef(maxVal);
  const rangeRef = useRef<HTMLDivElement>(null);

  const getPercent = useCallback(
    (value: number) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

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
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 leading-none">Min</span>
          <span className="text-sm font-black text-slate-800 tracking-tight leading-none">{minVal.toLocaleString()} ₼</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest mb-1 leading-none">Max</span>
          <span className="text-sm font-black text-slate-800 tracking-tight leading-none">{maxVal.toLocaleString()} ₼</span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative h-2 w-full mb-8">
        {/* Background track */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100 rounded-full" />

        {/* Active range highlight */}
        <div
          ref={rangeRef}
          className="absolute top-0 h-1.5 bg-[#057850] rounded-full shadow-[0_0_10px_rgba(5,120,80,0.1)]"
        />

        {/* Min Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          step={10}
          onChange={(e) => {
            const value = Math.min(Number(e.target.value), maxVal - 100);
            setMinVal(value);
            minValRef.current = value;
          }}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer thumb-slider"
          style={{ zIndex: minVal > max - 100 ? 5 : 3 }}
        />

        {/* Max Thumb */}
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          step={10}
          onChange={(e) => {
            const value = Math.max(Number(e.target.value), minVal + 100);
            setMaxVal(value);
            maxValRef.current = value;
          }}
          className="absolute w-full h-1.5 appearance-none bg-transparent cursor-pointer thumb-slider"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Preset Chips */}
      <div className="flex gap-2 mb-2 flex-wrap">
        {[
          { label: "0–500", min: 0, max: 500 },
          { label: "500–1500", min: 500, max: 1500 },
          { label: "1500–3000", min: 1500, max: 3000 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setMinVal(preset.min); setMaxVal(preset.max); minValRef.current = preset.min; maxValRef.current = preset.max; }}
            className={`px-3 py-1.5 rounded-lg text-[11px] font-black border transition-all active:scale-95 ${
              minVal === preset.min && maxVal === preset.max
                ? "bg-[#057850] text-white border-[#057850] shadow-lg shadow-[#057850]/20"
                : "bg-white text-slate-500 border-slate-100 hover:border-[#057850]/30 hover:text-[#057850]"
            }`}
          >
            {preset.label} ₼
          </button>
        ))}
      </div>

      {/* CSS for thumb styling */}
      <style jsx>{`
        .thumb-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          border: 3px solid #057850;
          box-shadow: 0 4px 10px rgba(5, 120, 80, 0.2);
          cursor: pointer;
          pointer-events: all;
          transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .thumb-slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }
        .thumb-slider::-moz-range-thumb {
          height: 18px;
          width: 18px;
          border-radius: 50%;
          background: white;
          border: 3px solid #057850;
          box-shadow: 0 4px 10px rgba(5, 120, 80, 0.2);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
