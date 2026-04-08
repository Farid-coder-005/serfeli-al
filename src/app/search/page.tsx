import Image from "next/image";
import Link from "next/link";
import { Filter, ChevronDown, CheckCircle2, Search, ArrowUpDown } from "lucide-react";
import PriceRangeSlider from "@/components/PriceRangeSlider";
import { ProductCard } from "@/components/ProductCard";
import { ProductGrid } from "@/components/ProductGrid";
import FilterPanel from "@/components/FilterPanel";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  const query = typeof resolvedParams.q === 'string' ? resolvedParams.q : null;
  const selectedCategory = typeof resolvedParams.category === 'string' ? resolvedParams.category : null;

  // Build the where clause based on what parameters exist
  const whereClause: any = {};
  
  if (query) {
    whereClause.title = { contains: query, mode: 'insensitive' };
  }
  
  if (selectedCategory) {
    whereClause.category = selectedCategory;
  }

  // Fetch products from database
  const products = await prisma.product.findMany({
    where: Object.keys(whereClause).length > 0 ? whereClause : undefined,
    include: { offers: { include: { store: true } } }
  });

  // Fetch user favorites if logged in
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }

  // Map slugs back to legible names for the header
  const categoryNames: Record<string, string> = {
    "elektronika": "Elektronika",
    "mebel": "Mebel & Ev",
    "geyim": "Geyim",
    "parfumeriya": "Parfumeriya",
    "supermarket": "Supermarket"
  };

  let titlePrefix = "";
  if (query) {
    titlePrefix = `Search results for: '${query}' - `;
  } else if (selectedCategory && categoryNames[selectedCategory]) {
    titlePrefix = categoryNames[selectedCategory] + " - ";
  }

  return (
    <div className="w-full flex-1 bg-[#F9FAFB] flex flex-col relative z-0">
      {/* Global dot-grid pattern overlay */}
      <div className="pointer-events-none fixed inset-0 z-0 bg-dot-pattern opacity-10" />

      {/* Header for search results */}
      <section className="bg-[#057850] py-6 sm:py-10 relative border-b border-[#046241]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black text-white tracking-tight">
              {query ? `Search results for: '${query}'` : (selectedCategory ? `${categoryNames[selectedCategory] || selectedCategory} kateqoriyası` : "Axtarış Nəticələri")}
            </h1>
            <p className="text-sm text-green-100 mt-2 font-medium">
              {products.length > 0 ? (
                <span className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
                  {products.length} məhsul tapıldı
                </span>
              ) : "Sizin üçün heç nə tapılmadı"}
            </p>
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white/10 border border-white/20 rounded-2xl text-sm font-bold text-white hover:bg-white/20 transition-all">
              <ArrowUpDown className="w-4 h-4" /> Sırala
              <ChevronDown className="w-4 h-4 ml-1 text-green-200" />
            </button>
            <button className="lg:hidden flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#057850] rounded-2xl text-sm font-bold hover:bg-gray-50 transition-all">
              <Filter className="w-4 h-4" /> Filterlər
            </button>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
          
          {/* SIDEBAR WRAPPER */}
          <aside className="hidden lg:block sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pb-10 no-scrollbar">
            <FilterPanel category={selectedCategory} />
          </aside>

          {/* MAIN CONTENT WRAPPER */}
          <main className="min-w-0">
            {products.length === 0 ? (
               <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl">
                  <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Search className="w-10 h-10 text-gray-300" />
                  </div>
                  <h3 className="text-xl font-bold text-[#1E3A8A] mb-2">No products found matching your search</h3>
                  <p className="text-gray-400 max-w-sm mx-auto">Seçdiyiniz kriteriyalara uyğun məhsul yoxdur. Zəhmət olmasa digər filterləri sınaqdan keçirin.</p>
               </div>
            ) : (
              <ProductGrid products={products} userFavoriteIds={userFavoriteIds} />
            )}
          </main>

        </div>
      </div>
    </div>
  );
}
