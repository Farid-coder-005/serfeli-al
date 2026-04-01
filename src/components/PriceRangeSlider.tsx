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
      <div className="flex justify-between items-center mb-4">
        <div className="flex flex-col">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Min</span>
          <span className="text-base font-bold text-green-600">{minVal.toLocaleString()} ₼</span>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs text-gray-400 font-medium uppercase tracking-wide">Max</span>
          <span className="text-base font-bold text-green-600">{maxVal.toLocaleString()} ₼</span>
        </div>
      </div>

      {/* Slider Track */}
      <div className="relative h-2 w-full">
        {/* Background track */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gray-200 rounded-full" />

        {/* Active range highlight */}
        <div
          ref={rangeRef}
          className="absolute top-0 h-2 bg-gradient-to-r from-green-500 to-green-600 rounded-full"
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
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer thumb-slider"
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
          className="absolute w-full h-2 appearance-none bg-transparent cursor-pointer thumb-slider"
          style={{ zIndex: 4 }}
        />
      </div>

      {/* Preset Chips */}
      <div className="flex gap-2 mt-5 flex-wrap">
        {[
          { label: "0–500", min: 0, max: 500 },
          { label: "500–1500", min: 500, max: 1500 },
          { label: "1500–3000", min: 1500, max: 3000 },
          { label: "3000+", min: 3000, max: 5000 },
        ].map((preset) => (
          <button
            key={preset.label}
            onClick={() => { setMinVal(preset.min); setMaxVal(preset.max); minValRef.current = preset.min; maxValRef.current = preset.max; }}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              minVal === preset.min && maxVal === preset.max
                ? "bg-green-600 text-white border-green-600 shadow-sm"
                : "bg-gray-50 text-gray-600 border-gray-200 hover:border-green-400 hover:text-green-700"
            }`}
          >
            {preset.label} ₼
          </button>
        ))}
      </div>

      {/* Apply Button */}
      <button className="mt-4 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2.5 rounded-xl transition-all shadow-sm shadow-green-600/20 text-sm active:scale-[0.98]">
        Filtri tətbiq et
      </button>

      {/* CSS for thumb styling */}
      <style jsx>{`
        .thumb-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #16a34a;
          box-shadow: 0 1px 6px rgba(22, 163, 74, 0.35);
          cursor: pointer;
          pointer-events: all;
          transition: box-shadow 0.15s ease, transform 0.15s ease;
        }
        .thumb-slider::-webkit-slider-thumb:hover {
          box-shadow: 0 0 0 6px rgba(22, 163, 74, 0.15);
          transform: scale(1.15);
        }
        .thumb-slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: white;
          border: 2px solid #16a34a;
          box-shadow: 0 1px 6px rgba(22, 163, 74, 0.35);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
