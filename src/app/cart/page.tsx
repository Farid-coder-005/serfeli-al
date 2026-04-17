import Link from "next/link";
import { ShoppingCart, ArrowLeft, Search, Tag } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Səbət | Sərfəli.al",
  description: "Sərfəli.al alış səbəti.",
};

export default function CartPage() {
  // Future: fetch real cart items from context / API
  const items: unknown[] = [];

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-96px)] bg-[#F8FAFC] relative">
      {/* Decorative blob */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(30,58,138,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">

        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#1E293B] hover:text-[#002B55] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Ana səhifəyə qayıt
        </Link>

        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-[#002B55]/10 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-[#002B55]" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              Səbətiniz
            </h1>
            <p className="text-sm text-[#1E293B] font-medium mt-0.5">
              {items.length > 0 ? `${items.length} məhsul` : "Səbət boşdur"}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-16 sm:p-24 text-center">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <ShoppingCart className="w-12 h-12 text-gray-200" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-[#1E3A8A] mb-3">
              Səbətiniz boşdur
            </h2>
            <p className="text-[#1E293B] text-base max-w-sm mx-auto mb-10 font-medium leading-relaxed">
              Hələ heç bir məhsul əlavə etməmisiniz. Axtarış edib ən ucuz qiymətli məhsulları tapın.
            </p>

            {/* Promo banner */}
            <div className="inline-flex items-center gap-3 bg-[#002B55]/5 border border-[#002B55]/10 rounded-2xl px-6 py-3 mb-10">
              <Tag className="w-4 h-4 text-[#002B55]" />
              <span className="text-sm font-bold text-[#002B55]">
                Hər alışda kəşbək qazanın — platformamız ən ucuz qiyməti tapır!
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#FF6B00] hover:bg-[#FF6B00] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-orange-500/20 transition-all active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                Alış-verişə başla
              </Link>
              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border border-gray-200 hover:border-gray-300 text-[#1E3A8A] font-bold text-sm rounded-2xl transition-all"
              >
                Ana səhifə
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
