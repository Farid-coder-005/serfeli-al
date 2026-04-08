"use client";

import { useState } from "react";
import { ChevronDown, Plus, Minus, Star } from "lucide-react";

interface Spec {
  label: string;
  value: string;
}

interface ProductAccordionsProps {
  description?: string | null;
  specifications?: Spec[];
}

export default function ProductAccordions({
  description,
  specifications = [
    { label: "Ekran Boyutu", value: '6.7"' },
    { label: "Əməliyyat Sistemi", value: "iOS 17" },
    { label: "Daxili Yaddaş", value: "256 GB" },
    { label: "Operativ Yaddaş (RAM)", value: "8 GB" },
    { label: "Batareya", value: "4422 mAh" },
  ],
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
      <div className="border-b border-slate-100 last:border-none">
        <button
          onClick={() => toggleSection(id)}
          className="w-full py-6 flex items-center justify-between text-left group"
        >
          <span className="text-sm sm:text-base font-black text-slate-800 uppercase tracking-widest group-hover:text-[#057850] transition-colors">
            {title}
          </span>
          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-[#057850] group-hover:bg-green-50 transition-all">
            {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
          </div>
        </button>
        {isOpen && (
          <div className="pb-8 animate-in fade-in slide-in-from-top-4 duration-300">
            {children}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm p-8 sm:p-12">
      <AccordionItem id="description" title="Məhsul Təsviri">
        <p className="text-slate-600 font-medium leading-[1.8] max-w-3xl">
          {description ||
            "Zərif dizayn, yüksək performans və ən son texnologiyaların mükəmməl birləşməsi. Bu məhsul gündəlik ehtiyaclarınızı aşan xüsusiyyətlərlə təchiz edilmişdir. Hər bir detal istifadəçi rahatlığı üçün xüsusi olaraq düşünülmüşdür."}
        </p>
      </AccordionItem>

      <AccordionItem id="specs" title="Texniki Göstəricilər">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl border border-slate-50">
          {specifications.map((spec, idx) => (
            <div
              key={spec.label}
              className={`flex flex-col sm:flex-row sm:items-center justify-between px-6 py-4 ${
                idx % 2 === 0 ? "bg-slate-50/50" : "bg-white"
              }`}
            >
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest sm:mb-0 mb-1">
                {spec.label}
              </span>
              <span className="text-sm font-bold text-slate-700">{spec.value}</span>
            </div>
          ))}
        </div>
      </AccordionItem>

      <AccordionItem id="reviews" title="Rəylər (4.8/5)">
        <div className="space-y-6">
          {[1, 2].map((i) => (
            <div key={i} className="p-6 bg-slate-50 rounded-3xl border border-slate-100 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-3.5 h-3.5 ${star <= 4 ? "fill-[#057850] text-[#057850]" : "text-slate-300"}`} />
                  ))}
                </div>
                <span className="text-[10px] font-bold text-slate-400">12.04.2024</span>
              </div>
              <p className="text-sm font-bold text-slate-800">Mükəmməl məhsul!</p>
              <p className="text-xs text-slate-600 font-medium leading-relaxed">
                Qiymət və keyfiyyət nisbəti inanılmazdır. Mağazadan çatdırılma da çox sürətli idi. Tövsiyə edirəm.
              </p>
            </div>
          ))}
        </div>
      </AccordionItem>
    </div>
  );
}
