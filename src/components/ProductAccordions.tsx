"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus, Star } from "lucide-react";

interface ProductAccordionsProps {
  description?: string | null;
}

export default function ProductAccordions({
  description,
}: ProductAccordionsProps) {
  const [openSection, setOpenSection] = useState<string | null>("description");

  const toggleSection = (section: string) => {
    setOpenSection(openSection === section ? null : section);
  };

  const AccordionItem = ({
    id,
    title,
    children,
  }: {
    id: string;
    title: string;
    children: React.ReactNode;
  }) => {
    const isOpen = openSection === id;

    return (
      <div className="border-b border-slate-50 last:border-none">
        <button
          onClick={() => toggleSection(id)}
          className="w-full py-4 flex items-center justify-between text-left group"
        >
          <span className="text-[11px] font-bold text-gray-700 uppercase tracking-widest group-hover:text-[#FF6B00] transition-colors">
            {title}
          </span>
          <div className="w-6 h-6 rounded-full bg-gray-50 flex items-center justify-center text-[#ABC1D6] group-hover:text-[#FF6B00] group-hover:bg-orange-50 transition-all">
            {isOpen ? <Minus className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
          </div>
        </button>
        {isOpen && (
          <div className="pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 shadow-sm px-8 py-2">
      <AccordionItem id="description" title="Məhsul Təsviri">
        <p className="text-[#ABC1D6] font-normal text-sm leading-relaxed max-w-4xl">
          {description ||
            "Zərif dizayn, yüksək performans və ən son texnologiyaların mükəmməl birləşməsi. Bu məhsul gündəlik ehtiyaclarınızı aşan xüsusiyyətlərlə təchiz edilmişdir. Hər bir detal istifadəçi rahatlığı üçün xüsusi olaraq düşünülmüşdür."}
        </p>
      </AccordionItem>

      <AccordionItem id="reviews" title="Rəylər (4.8/5)">
        <div className="space-y-4">
          {[1, 2].map((i) => (
            <div key={i} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-50 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-3 h-3 ${star <= 4 ? "fill-[#FF6B00] text-[#FF6B00]" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-[9px] font-bold text-[#ABC1D6]">12.04.2024</span>
              </div>
              <p className="text-xs font-bold text-[#222222]">Mükəmməl məhsul!</p>
              <p className="text-[11px] text-[#ABC1D6] font-normal leading-relaxed">
                Qiymət və keyfiyyət nisbəti inanılmazdır. Mağazadan çatdırılma da çox sürətli idi. Tövsiyə edirəm.
              </p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}

