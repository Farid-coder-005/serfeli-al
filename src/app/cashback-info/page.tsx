import Link from "next/link";
import { ArrowLeft, Percent, ShieldCheck, TrendingDown, Zap, Gift, CircleCheck } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kəşbək Proqramı | Sərfəli.al",
  description: "Hər alışdan kəşbək qazanın. Sərfəli.al kəşbək proqramı haqqında ətraflı məlumat.",
};

const HOW_IT_WORKS = [
  {
    step: "01",
    icon: TrendingDown,
    title: "Ən aşağı qiyməti tapın",
    desc: "Platformamız bütün tərəfdaş mağazalar arasından sizin üçün ən ucuz qiyməti tapır.",
    color: "text-blue-500 bg-blue-50",
  },
  {
    step: "02",
    icon: Zap,
    title: "Mağazaya keçin",
    desc: "Bizdəki linkdən mağazanın saytına daxil olun. Bu addım kəşbəki aktivləşdirir.",
    color: "text-yellow-500 bg-yellow-50",
  },
  {
    step: "03",
    icon: Gift,
    title: "Alış edin & Kəşbək qazanın",
    desc: "Alış tamamlandıqdan sonra kəşbək məbləği hesabınıza 3–7 iş günü ərzində köçürülür.",
    color: "text-[#057850] bg-green-50",
  },
];

const RATES = [
  { category: "Elektronika",  rate: "2%",  partner: "Kontakt, İrşad, Baku Electronics" },
  { category: "Mebel & Ev",   rate: "4%",  partner: "Embawood, Saloglu" },
  { category: "Geyim",        rate: "3%",  partner: "LC Waikiki, Defacto" },
  { category: "Parfumeriya",  rate: "5%",  partner: "Sabina, Ideal" },
  { category: "Supermarket",  rate: "1%",  partner: "Bravo, Araz" },
];

export default function CashbackInfoPage() {
  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-96px)] bg-[#F8FAFC] relative">
      {/* Decorative blobs */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(5,120,80,0.07) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div className="absolute bottom-0 -left-40 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">

        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#057850] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Ana səhifəyə qayıt
        </Link>

        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-[#057850]/10 border border-[#057850]/10 rounded-full px-5 py-2 mb-6">
            <Percent className="w-4 h-4 text-[#057850]" strokeWidth={2.5} />
            <span className="text-[13px] font-black text-[#057850] uppercase tracking-widest">
              Kəşbək Proqramı
            </span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-black text-[#1E3A8A] tracking-tight mb-5">
            Hər alışdan <span className="text-[#057850]">pul qazanın</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed">
            Sərfəli.al platforması üzərindən etdiyiniz hər alışın müəyyən faizi kəşbək kimi hesabınıza geri qaytarılır.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-16">
          {[
            { value: "5%",    label: "Maksimum kəşbək" },
            { value: "6+",    label: "Tərəfdaş mağaza" },
            { value: "7 gün", label: "Ödəniş müddəti" },
          ].map(({ value, label }) => (
            <div key={label}
              className="bg-white rounded-3xl border border-gray-100 p-6 text-center shadow-sm hover:shadow-lg transition-shadow">
              <p className="text-3xl sm:text-4xl font-black text-[#057850] mb-1">{value}</p>
              <p className="text-[11px] font-bold text-gray-400 uppercase tracking-widest">{label}</p>
            </div>
          ))}
        </div>

        {/* How it works */}
        <h2 className="text-2xl font-black text-[#1E3A8A] mb-8 tracking-tight">
          Necə işləyir?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-16">
          {HOW_IT_WORKS.map(({ step, icon: Icon, title, desc, color }) => (
            <div key={step}
              className="bg-white rounded-3xl border border-gray-100 p-8 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
              <p className="text-[11px] font-black text-gray-200 tracking-[0.3em] mb-4">{step}</p>
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-5 ${color}`}>
                <Icon className="w-6 h-6" />
              </div>
              <h3 className="text-base font-black text-[#1E3A8A] mb-2">{title}</h3>
              <p className="text-sm text-gray-500 font-medium leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>

        {/* Rates table */}
        <h2 className="text-2xl font-black text-[#1E3A8A] mb-8 tracking-tight">
          Kateqoriya üzrə kəşbək dərəcələri
        </h2>
        <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden mb-12">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kateqoriya</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest">Kəşbək %</th>
                <th className="px-8 py-5 text-[10px] font-black text-gray-400 uppercase tracking-widest hidden sm:table-cell">Tərəfdaşlar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {RATES.map(({ category, rate, partner }) => (
                <tr key={category} className="hover:bg-gray-50/50 transition-colors">
                  <td className="px-8 py-5 text-sm font-bold text-[#1E3A8A]">{category}</td>
                  <td className="px-8 py-5">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#057850]/10 text-[#057850] text-xs font-black">
                      <Percent className="w-3 h-3" strokeWidth={2.5} />
                      {rate}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-sm font-medium text-gray-400 hidden sm:table-cell">{partner}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Trust note */}
        <div className="flex flex-col sm:flex-row items-center gap-4 bg-white rounded-3xl border border-gray-100 p-6 shadow-sm mb-12">
          <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6 text-[#057850]" />
          </div>
          <div>
            <p className="text-base font-black text-[#1E3A8A] mb-1">Etibarlı və şəffaf</p>
            <p className="text-sm text-gray-500 font-medium">
              Bütün kəşbək hesablamaları avtomatik aparılır. Pul birbaşa balansınıza köçürülür — heç bir gizli şərt yoxdur.
            </p>
          </div>
        </div>

        {/* FAQ snippet */}
        <h2 className="text-2xl font-black text-[#1E3A8A] mb-6 tracking-tight">Tez-tez verilən suallar</h2>
        <div className="space-y-4 mb-16">
          {[
            {
              q: "Kəşbək nə vaxt hesabıma düşür?",
              a: "Alışın tamamlandığından etibarən 3–7 iş günü ərzində balansınıza köçürülür.",
            },
            {
              q: "Yığdığım kəşbəyi necə xərcləyə bilərəm?",
              a: "Balansınızı növbəti alışlarınızda endirimsiz istifadə edə bilərsiniz.",
            },
            {
              q: "Bütün məhsullar kəşbəkə uyğundurmu?",
              a: "Xüsusi aksiya məhsulları istisna olmaqla, platforma üzərindən edilən bütün alışlar uyğundur.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm">
              <p className="flex items-center gap-3 text-sm font-black text-[#1E3A8A] mb-2">
                <CircleCheck className="w-4 h-4 text-[#057850] shrink-0" />
                {q}
              </p>
              <p className="text-sm text-gray-500 font-medium pl-7">{a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link
            href="/search"
            className="inline-flex items-center gap-2 px-10 py-4 bg-[#057850] hover:bg-[#046b47] text-white font-black text-sm uppercase tracking-widest rounded-full shadow-lg shadow-green-900/10 transition-all active:scale-[0.98]"
          >
            Alış-verişə başla və kəşbək qazanın
          </Link>
        </div>

      </div>
    </div>
  );
}
