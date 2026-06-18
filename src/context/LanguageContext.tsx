"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, Language, TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("selectedLanguage");
      if (saved && ["AZ", "EN", "RU"].includes(saved.toUpperCase())) {
        return saved.toLowerCase() as Language;
      }
    }
    return "az";
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("selectedLanguage", lang.toUpperCase());
    
    // Set cookie for potential server-side reads or middleware
    document.cookie = `selectedLanguage=${lang.toUpperCase()}; path=/; max-age=31536000; SameSite=Lax`;
  };

  const t = (key: TranslationKey): string => {
    return translations[language]?.[key] || translations["az"]?.[key] || String(key);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
