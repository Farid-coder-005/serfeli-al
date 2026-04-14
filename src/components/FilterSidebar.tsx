'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

// 1. Configuration Object
const filtersConfig: Record<string, { id: string; label: string; options: string[] }[]> = {
  telefonlar: [
    { id: 'brand', label: 'İstehsalçı', options: ['Apple', 'Samsung', 'Xiaomi'] },
    { id: 'storage', label: 'Yaddaş', options: ['128GB', '256GB', '512GB'] }
  ],
  smartfonlar: [
    { id: 'brand', label: 'İstehsalçı', options: ['Apple', 'Samsung', 'Xiaomi'] },
    { id: 'storage', label: 'Yaddaş', options: ['128GB', '256GB', '512GB'] }
  ],
  televizorlar: [
    { id: 'brand', label: 'İstehsalçı', options: ['Samsung', 'LG', 'Sony'] },
    { id: 'screen', label: 'Ekran', options: ['43"', '50"', '55"', '65"'] }
  ]
};

// 2. Inner Component
function SidebarContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleToggle = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.getAll(key);
    
    if (currentValues.includes(value)) {
      // Create new params object to fully rebuild that key's values
      const newParams = new URLSearchParams();
      params.forEach((v, k) => {
        if (k !== key) newParams.append(k, v);
      });
      currentValues.filter(v => v !== value).forEach(v => newParams.append(key, v));
      router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    } else {
      params.append(key, value);
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    }
  };

  // Detect category from URL (fallback to smartfonlar if not matched)
  const category = pathname.includes('telefonlar') ? 'telefonlar' : 
                   pathname.includes('smartfonlar') ? 'smartfonlar' :
                   pathname.includes('televizorlar') ? 'televizorlar' : null;

  const currentFilters = category ? (filtersConfig[category] || filtersConfig['smartfonlar']) : filtersConfig['smartfonlar'];

  return (
    <div className="w-full lg:w-[250px] flex flex-col gap-6 bg-[#f4f7f9] p-5 rounded-sm border border-gray-200 h-fit">
      {/* Price Filter (Static for all) */}
      <div>
        <h3 className="font-bold mb-3 text-lg text-[#222222]">Qiymət</h3>
        <div className="flex items-center gap-2">
          <input type="number" placeholder="Min ₼" className="w-full border border-gray-300 p-2 rounded text-sm bg-white" />
          <span>-</span>
          <input type="number" placeholder="Max ₼" className="w-full border border-gray-300 p-2 rounded text-sm bg-white" />
        </div>
      </div>

      {/* Dynamic Render Loop */}
      {currentFilters.map((filterGroup) => (
        <div key={filterGroup.id} className="border-t border-gray-300 pt-4">
          <h3 className="font-bold mb-3 text-lg text-[#222222]">{filterGroup.label}</h3>
          <div className="flex flex-col gap-2">
            {filterGroup.options.map((option) => (
              <label key={option} className="flex items-center gap-3 cursor-pointer group hover:text-[#FF5500] transition-colors">
                <input 
                  type="checkbox" 
                  checked={searchParams.getAll(filterGroup.id).includes(option)}
                  onChange={() => handleToggle(filterGroup.id, option)}
                  className="w-4 h-4 accent-[#FF5500] border-gray-300 rounded cursor-pointer"
                />
                <span className="text-sm">{option}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// 3. Exported Wrapped Component
export default function FilterSidebar() {
  return (
    <Suspense fallback={<div className="w-[250px] bg-[#f4f7f9] p-5 rounded-sm border border-gray-200">Yüklənir...</div>}>
      <SidebarContent />
    </Suspense>
  );
}
