"use client";

import { useState } from "react";
import { Filter, ChevronDown, ChevronRight, CheckCircle2 } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider";

interface FilterPanelProps {
  category?: string | null;
}

const CATEGORY_DATA: Record<string, { brands: string[]; stores: string[] }> = {
  elektronika: {
    brands: ["Apple", "Samsung", "Sony", "Dyson", "LG", "Xiaomi"],
    stores: ["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery", "Optimal"],
  },
  idman: {
    brands: ["Nike", "Adidas", "Under Armour", "Puma", "Reebok", "New Balance"],
    stores: ["GoSport", "Courir", "United Sport", "Decathlon"],
  },
  default: {
    brands: ["Apple", "Samsung", "Nike", "Adidas", "L'Oreal", "Zara"],
    stores: ["Kontakt", "İrşad", "Baku Electronics", "GoSport", "Soliton"],
  },
};

export default function FilterPanel({ category }: FilterPanelProps) {
  const data = CATEGORY_DATA[category || "default"] || CATEGORY_DATA.default;
  
  // State for accordions (default to closed as requested)
  const [openSections, setOpenSections] = useState<string[]>([]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) =>
      prev.includes(section) ? prev.filter((s) => s !== section) : [...prev, section]
    );
  };

  const SectionHeader = ({ title, section, icon: Icon }: { title: string; section: string; icon: any }) => (
    <button
      onClick={() => toggleSection(section)}
      className="w-full flex items-center justify-between py-4 group transition-all"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[#057850]" />
        <span className="text-[11px] font-black text-slate-800 uppercase tracking-[0.2em] group-hover:text-[#057850] transition-colors">
          {title}
        </span>
      </div>
      {openSections.includes(section) ? (
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#057850] transition-colors" />
      ) : (
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#057850] transition-colors" />
      )}
    </button>
  );

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 p-8 shadow-xl shadow-[#1E3A8A]/5 space-y-2">
      <div className="pb-6 border-b border-gray-50 mb-4">
        <h2 className="text-xl font-black text-slate-800 flex items-center gap-3 uppercase tracking-wider">
          <Filter className="w-5 h-5 text-[#057850]" />
          Filterlər
        </h2>
      </div>

      {/* Price Range Section (Always Open) */}
      <div className="py-4">
        <h3 className="text-[10px] font-black text-slate-400 mb-6 uppercase tracking-[0.2em]">Qiymət Aralığı (₼)</h3>
        <PriceRangeSlider min={0} max={5000} />
      </div>

      {/* Brands Accordion */}
      <div className="border-t border-gray-50 pt-2">
        <SectionHeader title="Brendlər" section="brands" icon={CheckCircle2} />
        {openSections.includes("brands") && (
          <div className="space-y-2.5 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {data.brands.map((brand) => (
              <label key={brand} className="flex items-center justify-between cursor-pointer group px-1">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute" />
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white peer-checked:bg-[#057850] peer-checked:border-[#057850] transition-all duration-300"></div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-[3px] opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {brand}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#057850] transition-colors">
                  {Math.floor(Math.random() * 50) + 1}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Stores Accordion */}
      <div className="border-t border-gray-50 pt-2">
        <SectionHeader title="Mağazalar" section="stores" icon={CheckCircle2} />
        {openSections.includes("stores") && (
          <div className="space-y-2.5 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {data.stores.map((store) => (
              <label key={store} className="flex items-center justify-between cursor-pointer group px-1">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input type="checkbox" className="peer w-5 h-5 opacity-0 absolute" />
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white peer-checked:bg-[#057850] peer-checked:border-[#057850] transition-all duration-300"></div>
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-[3px] opacity-0 peer-checked:opacity-100 transition-opacity duration-300" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {store}
                  </span>
                </div>
                <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#057850] transition-colors">
                  {Math.floor(Math.random() * 30) + 5}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      <div className="pt-8 mt-4 border-t border-gray-50">
        <button className="w-full bg-[#057850] text-white py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-[#046241] shadow-lg shadow-[#057850]/20 transition-all active:scale-[0.98]">
          Tətbiq et
        </button>
      </div>
    </div>
  );
}

