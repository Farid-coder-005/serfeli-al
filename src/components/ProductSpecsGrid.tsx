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
    <div className="grid grid-cols-2 gap-4 mt-8 bg-[#F4F4F4] rounded-2xl border border-gray-200 p-6">
      {specifications.map((spec) => (
        <div key={spec.label} className="flex flex-col">
          <span className="text-[9px] font-bold text-[#ABC1D6] uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
            <div className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full" />
            {spec.label}
          </span>
          <span className="text-xs font-bold text-[#222222] leading-tight">
            {spec.value}
          </span>
        </div>
      ))}
    </div>
  );
}
