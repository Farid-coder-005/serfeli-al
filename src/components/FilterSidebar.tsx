"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useCallback, useMemo, useState } from "react";
import { Filter, ChevronDown, ChevronRight, CheckCircle2, RotateCcw } from "lucide-react";
import PriceRangeSlider from "./PriceRangeSlider";
import { CATEGORY_FILTER_CONFIG, DEFAULT_FILTERS } from "@/lib/filter-config";

interface FilterSidebarProps {
  category?: string | null;
}

/**
 * FilterSidebar component that strictly uses URL Search Parameters for state.
 * It dynamically detects the active category from the pathname or props.
 */
export default function FilterSidebar({ category: categoryProp }: FilterSidebarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. DYNAMIC CATEGORY DETECTION: Pathname priority -> Prop -> Query Param
  const activeCategory = useMemo(() => {
    if (categoryProp) return categoryProp;
    
    // Check if we are on a category-specific route (/category/[id])
    const pathParts = pathname.split("/");
    const categoryIdx = pathParts.indexOf("category");
    if (categoryIdx !== -1 && pathParts[categoryIdx + 1]) {
      return pathParts[categoryIdx + 1];
    }
    
    // Fallback to query parameter ?category=...
    return searchParams.get("category");
  }, [categoryProp, pathname, searchParams]);

  // Load correct filter configuration based on detected category
  const filterGroups = useMemo(() => {
    const catId = activeCategory?.toLowerCase();
    return (catId && CATEGORY_FILTER_CONFIG[catId]) || DEFAULT_FILTERS;
  }, [activeCategory]);

  // Local state for UI only (accordions), not for values
  const [openSections, setOpenSections] = useState<string[]>(["brand"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId]
    );
  };

  // 2. TRUE URL SYNCING: Checkboxes strictly derive state from searchParams.getAll()
  const isOptionChecked = useCallback(
    (key: string, value: string) => {
      const currentValues = searchParams.getAll(key);
      return currentValues.includes(value);
    },
    [searchParams]
  );

  // 3. PARAMETER WRITING: Updates URL to persist state on refresh
  const handleFilterChange = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);

    if (currentValues.includes(value)) {
      // Toggle off: remove this specific value from the multi-value key
      const newValues = currentValues.filter((v) => v !== value);
      params.delete(key);
      newValues.forEach((v) => params.append(key, v));
    } else {
      // Toggle on: append new value to existing ones
      params.append(key, value);
    }

    // Update URL without a full page refresh
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const clearFilters = () => {
    const params = new URLSearchParams();
    // Preserve core identifiers like query and basic category if they exist
    const q = searchParams.get("q");
    const cat = searchParams.get("category");
    if (q) params.set("q", q);
    if (cat) params.set("category", cat);
    
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const SectionHeader = ({ title, id, icon: Icon }: { title: string; id: string; icon: any }) => (
    <button
      onClick={() => toggleSection(id)}
      className="w-full flex items-center justify-between py-4 group transition-all"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-4 h-4 text-[#FF5500]" />
        <span 
          className="text-[11px] font-[800] text-slate-800 uppercase tracking-[0.2em] group-hover:text-[#FF5500] transition-colors"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          {title}
        </span>
      </div>
      {openSections.includes(id) ? (
        <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-[#FF5500] transition-colors" />
      ) : (
        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#FF5500] transition-colors" />
      )}
    </button>
  );

  return (
    <div className="bg-white rounded-[2rem] border border-gray-100 p-7 shadow-sm space-y-2">
      <div className="pb-4 border-b border-gray-50 mb-2 flex items-center justify-between">
        <h2 
          className="text-lg font-[900] text-slate-800 flex items-center gap-3 uppercase tracking-wider"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          <Filter className="w-5 h-5 text-[#FF5500]" />
          Filterlər
        </h2>
        <button 
          onClick={clearFilters}
          className="text-slate-400 hover:text-[#FF5500] transition-colors p-2 rounded-lg hover:bg-orange-50"
          title="Sıfırla"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </div>

      {/* Price Range */}
      <div className="py-4">
        <h3 
          className="text-[10px] font-[900] text-slate-400 mb-6 uppercase tracking-[0.2em]"
          style={{ fontFamily: "'Montserrat', sans-serif" }}
        >
          Qiymət Aralığı (₼)
        </h3>
        <PriceRangeSlider min={0} max={10000} />
      </div>

      {/* Dynamic Filter Groups */}
      {filterGroups.map((group) => (
        <div key={group.id} className="border-t border-gray-50 pt-1">
          <SectionHeader title={group.title} id={group.id} icon={CheckCircle2} />
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
                        className="peer w-5 h-5 opacity-0 absolute"
                        checked={isOptionChecked(group.id, option.value)}
                        onChange={() => handleFilterChange(group.id, option.value)}
                      />
                      <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white peer-checked:bg-[#FF5500] peer-checked:border-[#FF5500] transition-all duration-200" />
                      <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-[3.25px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                    </div>
                    <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                      {option.label}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-slate-400 group-hover:text-[#FF5500] transition-colors">
                    {Math.floor(Math.random() * 40) + 1}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      {/* Stores */}
      <div className="border-t border-gray-50 pt-1">
        <SectionHeader title="Mağazalar" id="store" icon={CheckCircle2} />
        {openSections.includes("store") && (
          <div className="space-y-3 pb-4 animate-in fade-in slide-in-from-top-2 duration-300">
            {["Kontakt", "İrşad", "Baku Electronics", "Soliton", "Music Gallery"].map((store) => (
              <label key={store} className="flex items-center justify-between cursor-pointer group px-1">
                <div className="flex items-center gap-3">
                  <div className="relative flex items-center">
                    <input 
                      type="checkbox" 
                      className="peer w-5 h-5 opacity-0 absolute" 
                      checked={isOptionChecked("store", store)}
                      onChange={() => handleFilterChange("store", store)}
                    />
                    <div className="w-5 h-5 border-2 border-slate-200 rounded-lg bg-white peer-checked:bg-[#FF5500] peer-checked:border-[#FF5500] transition-all duration-200" />
                    <CheckCircle2 className="w-3.5 h-3.5 text-white absolute left-[3.25px] opacity-0 peer-checked:opacity-100 transition-opacity duration-200" />
                  </div>
                  <span className="text-sm font-bold text-slate-600 group-hover:text-slate-900 transition-colors">
                    {store}
                  </span>
                </div>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
