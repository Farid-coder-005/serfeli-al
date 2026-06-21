"use client";

import Link from 'next/link';
import { Target } from 'lucide-react';
import { Logo } from './Logo';
import { useLanguage } from '@/context/LanguageContext';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="bg-[#111820] text-slate-200 mt-auto">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Logo 
              className="scale-[0.65] origin-left mb-[-10px]" 
            />
            <p className="mt-4 text-sm text-white leading-relaxed">
              {t("footerDesc")}
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">{t("platform")}</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">{t("aboutUs")}</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">{t("stores")}</Link></li>
              <li><Link href="/dashboard" className="text-sm hover:text-[#FF6B00] transition-colors">{t("cashback")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">{t("help")}</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">{t("faq")}</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">{t("contact")}</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">{t("termsOfUse")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-white tracking-widest uppercase mb-6">{t("followUs")}</h3>
            <ul className="space-y-4">
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">Instagram</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">Facebook</Link></li>
              <li><Link href="#" className="text-sm hover:text-[#FF6B00] transition-colors">Telegram</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-16 border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-white">
          <p>&copy; {new Date().getFullYear()} Sərfəli.al. {t("allRights")}</p>
          <div className="mt-4 sm:mt-0 space-x-6">
            <span className="hover:text-white transition-colors cursor-default">{t("privacyPolicy")}</span>
            <span className="hover:text-white transition-colors cursor-default">{t("personalData")}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
