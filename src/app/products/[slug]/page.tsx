import Link from 'next/link';
import { ChevronDown, Search } from 'lucide-react';
import { ProductGrid } from "@/components/ProductGrid";
import FilterSidebar from '@/components/FilterSidebar';
import prisma from "@/lib/prisma";
import { extractFacets, ProductWithOffers } from "@/lib/filter-utils";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";

export default async function GenericCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { slug } = await params;
  const resolvedSearchParams = await searchParams;
  
  // 1. Fetch products for this specific category slug
  const products: ProductWithOffers[] = await prisma.product.findMany({
    where: {
      category: { equals: slug, mode: 'insensitive' }
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

  // Capitalize slug for display
  const title = slug.charAt(0).toUpperCase() + slug.slice(1);

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8 bg-[#F9FAFB]">
      <div className="w-full">
         <div className="text-sm text-gray-500 mb-4 px-1">
           <Link href="/" className="hover:underline">Ana Səhifə</Link> {'>'} Məhsullar {'>'} {title}
         </div>
         <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-6 px-1">
           <div>
             <h1 className="text-4xl font-black text-[#1a1a1a] tracking-tight">{title}</h1>
             <p className="text-sm text-gray-500 mt-2 font-medium">
               {products.length} məhsul tapıldı
             </p>
           </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 items-start">
           <aside className="hidden lg:block sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pb-10 no-scrollbar">
             <FilterSidebar facets={facets} />
           </aside>

           <section className="min-w-0">
              {products.length === 0 ? (
                <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl">
                    <Search className="w-10 h-10 text-gray-300 mx-auto mb-6" />
                    <h3 className="text-xl font-bold text-[#1a1a1a]">Məhsul tapılmadı</h3>
                    <p className="text-gray-400">"{slug}" kateqoriyasında hələlik məhsul yoxdur.</p>
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
