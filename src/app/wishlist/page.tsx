import Link from "next/link";
import { Heart, ArrowLeft, Search } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İstək Siyahısı | Sərfəli.al",
  description: "Seçdiyiniz məhsulları istək siyahınızda saxlayın.",
};

export default function WishlistPage() {
  // Future: fetch real wishlist items from context / API
  const items: unknown[] = [];

  return (
    <div className="flex flex-col w-full min-h-[calc(100vh-96px)] bg-[#F8FAFC] relative">
      {/* Decorative blob */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(5,120,80,0.05) 0%, transparent 70%)", filter: "blur(80px)" }} />
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full relative z-10">

        {/* Back link */}
        <Link href="/"
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-400 hover:text-[#057850] transition-colors mb-10 group">
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Ana səhifəyə qayıt
        </Link>

        {/* Heading */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
            <Heart className="w-6 h-6 text-red-400" fill="currentColor" />
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl font-black text-[#1E3A8A] tracking-tight">
              İstək Siyahısı
            </h1>
            <p className="text-sm text-gray-400 font-medium mt-0.5">
              {items.length > 0 ? `${items.length} məhsul` : "Hələ heç bir məhsul əlavə edilməyib"}
            </p>
          </div>
        </div>

        {/* Empty state */}
        {items.length === 0 && (
          <div className="bg-white rounded-[3rem] border border-gray-100 shadow-sm p-16 sm:p-24 text-center">
            <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-8">
              <Heart className="w-12 h-12 text-red-200" strokeWidth={1.5} />
            </div>
            <h2 className="text-2xl font-black text-[#1E3A8A] mb-3">
              İstək siyahınız boşdur
            </h2>
            <p className="text-gray-400 text-base max-w-sm mx-auto mb-10 font-medium leading-relaxed">
              Bəyəndiyiniz məhsulları ürək ikonasına basaraq buraya əlavə edin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/search"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1E3A8A] hover:bg-[#1a3275] text-white font-black text-sm uppercase tracking-widest rounded-2xl shadow-lg shadow-[#1E3A8A]/20 transition-all active:scale-[0.98]"
              >
                <Search className="w-4 h-4" />
                Məhsullara bax
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
