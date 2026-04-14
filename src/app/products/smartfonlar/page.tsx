import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { ProductGrid } from "@/components/ProductGrid";
import FilterSidebar from '@/components/FilterSidebar';
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { extractFacets, ProductWithOffers } from "@/lib/filter-utils";

export default async function SmartfonlarPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedParams = await searchParams;
  
  // 1. Fetch products from DB
  const products: ProductWithOffers[] = await prisma.product.findMany({
    where: {
      OR: [
        { category: 'elektronika' },
        { title: { contains: 'iphone', mode: 'insensitive' } },
        { title: { contains: 'samsung', mode: 'insensitive' } },
        { title: { contains: 'xiaomi', mode: 'insensitive' } },
      ]
    },
    include: { offers: { include: { store: true } } }
  }) as ProductWithOffers[];

  // 2. Fetch user favorites if logged in
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }

  // 3. Extract dynamic facets
  const facets = extractFacets(products);

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8 bg-[#F9FAFB]">
      <div className="w-full">
         {/* Top Header */}
         <div className="text-sm text-gray-500 mb-4 px-1">
           <Link href="/" className="hover:underline">Ana Səhifə</Link> {'>'} Elektronika {'>'} Smartfonlar
         </div>
         <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6 px-1">
           <div>
             <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">Smartfonlar</h1>
             <p className="text-sm text-gray-500 mt-2 font-medium">
               {products.length} məhsul tapıldı
             </p>
           </div>
           <div className="hidden md:flex items-center gap-2 text-sm font-bold text-[#1E3A8A] cursor-pointer border-b-2 border-[#FF5500] pb-1 hover:text-[#FF5500] transition-colors">
              Ən populyarlar <ChevronDown className="w-4 h-4" />
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
           {/* DYNAMIC SIDEBAR */}
           <aside className="hidden lg:block sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pb-10 no-scrollbar">
             <FilterSidebar facets={facets} />
           </aside>

           {/* PRODUCT GRID */}
           <section className="min-w-0">
              {products.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-[#1a1a1a]">Heç bir məhsul tapılmadı</h3>
                    <p className="text-gray-400">Bu kategoriya üçün hələlik məhsul yoxdur.</p>
                </div>
              ) : (
                <ProductGrid products={products} userFavoriteIds={userFavoriteIds} />
              )}
           </section>
         </div>
      </div>
    </main>
  );
}
