"use client";

import React, { useMemo } from "react";
import { Check, X } from "lucide-react";

interface PasswordStrengthMeterProps {
  password: string;
}

export function PasswordStrengthMeter({ password }: PasswordStrengthMeterProps) {
  const criteria = useMemo(() => [
    { label: "Ən az 8 simvol", met: password.length >= 8 },
    { label: "Ən az bir böyük hərf", met: /[A-Z]/.test(password) },
    { label: "Ən az bir rəqəm", met: /[0-9]/.test(password) },
    { label: "Ən az bir xüsusi simvol (@$!%*?&)", met: /[@$!%*?&]/.test(password) },
  ], [password]);

  const strength = criteria.filter((c) => c.met).length;

  const getColor = () => {
    if (password.length === 0) return "bg-gray-100";
    if (strength <= 1) return "bg-red-500";
    if (strength <= 3) return "bg-orange-500";
    return "bg-green-500";
  };

  const getLabel = () => {
    if (password.length === 0) return "";
    if (strength <= 1) return "Zəif";
    if (strength <= 3) return "Orta";
    return "Güclü";
  };

  const getLabelColor = () => {
    if (strength <= 1) return "text-red-500";
    if (strength <= 3) return "text-orange-500";
    return "text-green-500";
  };

  return (
    <div className="mt-4 space-y-4">
      <div className="flex items-center justify-between mb-1">
        <span className="text-[10px] font-black text-[#1F1F1F] uppercase tracking-widest">Şifrə Gücü</span>
        <span className={`text-[10px] font-black uppercase tracking-widest ${getLabelColor()}`}>
          {getLabel()}
        </span>
      </div>
      
      {/* Strength Bar */}
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden flex gap-1">
        {[1, 2, 3, 4].map((step) => (
          <div 
            key={step} 
            className={`h-full flex-1 transition-all duration-500 ${step <= strength ? getColor() : "bg-gray-100"}`}
          />
        ))}
      </div>

      {/* Criteria Checklist */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {criteria.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className={`flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center transition-colors ${item.met ? "bg-green-100" : "bg-gray-50"}`}>
              {item.met ? (
                <Check className="w-2.5 h-2.5 text-green-600" />
              ) : (
                <X className="w-2.5 h-2.5 text-gray-300" />
              )}
            </div>
            <span className={`text-[10px] font-bold tracking-tight leading-none ${item.met ? "text-gray-900" : "text-[#ABC1D6]"}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
