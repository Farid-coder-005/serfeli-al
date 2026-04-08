"use client";

import { ShieldCheck, Cpu, Database, Battery, Monitor } from "lucide-react";

interface Spec {
  label: string;
  value: string;
}

interface ProductSpecsGridProps {
  specifications?: Spec[];
}

export default function ProductSpecsGrid({
  specifications = [
    { label: "Ekran", value: '6.7" OLED' },
    { label: "Prosessor", value: "A17 Pro" },
    { label: "Yaddaş", value: "256 GB" },
    { label: "RAM", value: "8 GB" },
    { label: "Batareya", value: "4422 mAh" },
    { label: "Zəmanət", value: "1 İl Rəsmi" },
  ],
}: ProductSpecsGridProps) {
  return (
    <div className="grid grid-cols-2 gap-4 mt-8 bg-white/50 rounded-[2.5rem] border border-slate-100 p-6">
      {specifications.map((spec) => (
        <div key={spec.label} className="flex flex-col">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <div className="w-1 h-1 bg-[#057850] rounded-full" />
            {spec.label}
          </span>
          <span className="text-xs font-black text-slate-700 leading-tight">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}
