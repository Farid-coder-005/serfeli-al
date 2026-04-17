'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useCallback, useState, useMemo } from 'react';
import { Filter, ChevronDown, ChevronRight, CheckCircle2, RotateCcw } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider";
import { FacetGroup } from "@/lib/filter-utils";

interface SidebarContentProps {
  facets?: FacetGroup[];
}

/**
 * Data-driven FilterSidebar that renders groups dynamically based on the passed facets prop.
 */
function SidebarContent({ facets = [] }: SidebarContentProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Local UI state for accordions
  const [openSections, setOpenSections] = useState<string[]>(["brand"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  // URL state checking logic
  const isOptionChecked = useCallback(
    (key: string, value: string) => {
      const currentValues = searchParams.getAll(key);
      return currentValues.includes(value.toLowerCase());
    },
    [searchParams]
  );

  const handleToggle = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const val = value.toLowerCase();
    const currentValues = params.getAll(key);
    
    if (currentValues.includes(val)) {
      // Logic to fully rebuild the multi-value parameter without the toggled item
      const newParams = new URLSearchParams();
      params.forEach((v, k) => {
        if (k !== key) newParams.append(k, v);
      });
      currentValues.filter(v => v !== val).forEach(v => newParams.append(key, v));
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    } else {
      params.append(key, val);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm space-y-2">
      {/* Sidebar Header */}
      <div className="pb-4 border-b border-gray-50 mb-2 flex items-center justify-between">
        <h2 
          className="text-lg font-[900] text-slate-800 flex items-center gap-3 uppercase tracking-wider"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <Filter className="w-5 h-5 text-[#FF6B00]" />
          Filterlər
        </h2>
        <button 
          onClick={clearFilters}
          className="text-slate-400 hover:text-[#FF6B00] transition-colors p-2 rounded-lg hover:bg-orange-50"
          title="Sıfırla"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Price Range (Permanent Group) */}
      <div className="py-4">
        <h3 
          className="text-[10px] font-[900] text-slate-400 mb-6 uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Qiymət Aralığı (₼)
        </h3>
        <PriceRangeSlider min={0} max={10000} />
      </div>

      {/* Dynamic Facet Groups */}
      {facets.map((group) => (
        <div key={group.id} className="border-t border-gray-50 pt-1">
          <button
            onClick={() => toggleSection(group.id)}
            className="w-full flex items-center justify-between py-4 group transition-all"
          >
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-[#FF6B00]" />
              <span 
                className="text-[11px] font-[800] text-slate-800 uppercase tracking-[0.2em] group-hover:text-[#FF6B00] transition-colors"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                {group.label}
              </span>
            </div>
            {openSections.includes(group.id) ? (
              <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B00]" />
            ) : (
              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF6B00]" />
            )}
          </button>
          
          {openSections.includes(group.id) && (
            <div className="space-y-3 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
              {group.options.map((option) => (
                <label 
                  key={option.value} 
                  className="flex items-center justify-between cursor-pointer group px-1"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative flex items-center">
                      <input 
                        type="checkbox" 
                        className="peer w-5 h-5 opacity-0 absolute cursor-pointer"
                        checked={isOptionChecked(group.id, option.value)}
                        onChange={() => handleToggle(group.id, option.value)}
                      />
                      <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white peer-checked:bg-[#FF6B00] peer-checked:border-[#FF6B00] transition-all duration-200" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-[3.25px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#FF6B00] transition-colors">
                    {option.count}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default function FilterSidebar(props: SidebarContentProps) {
  return (
    <Suspense fallback={<div className="p-10 text-center animate-pulse">Filterlər yüklənir...</div>}>
      <SidebarContent {...props} />
    </Suspense>
  );
}
