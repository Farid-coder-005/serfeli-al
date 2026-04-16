import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { extractFacets, ProductWithOffers } from "@/lib/filter-utils";
import FilterSidebar from '@/components/FilterSidebar';
import { ProductGrid } from "@/components/ProductGrid";
import { ChevronRight, Search } from 'lucide-react';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await prisma.category.findFirst({
    where: { slug: { equals: slug, mode: 'insensitive' } }
  });

  return {
    title: `${category?.name || 'Kateqoriya'} | Sərfəli.al`,
    description: `${category?.name || 'Kateqoriya'} üzrə ən ucuz qiymətlər və təkliflər.`,
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  // 1. Fetch category details or subcategory details from DB - Case Insensitive
  let categoryData = await prisma.category.findFirst({
    where: { slug: { equals: slug, mode: 'insensitive' } },
    include: { subCategories: true }
  });

  let isSubCategory = false;
  let subCategoryData = null;

  if (!categoryData) {
    // Try looking in SubCategory table
    subCategoryData = await prisma.subCategory.findFirst({
      where: { slug: { equals: slug, mode: 'insensitive' } },
      include: { category: { include: { subCategories: true } } }
    });

    if (subCategoryData) {
      isSubCategory = true;
      categoryData = subCategoryData.category;
    }
  }

  if (!categoryData) {
    return notFound();
  }

  // 2. Fetch products belonging to THIS category or its subcategories
  let products = [] as ProductWithOffers[];
  if (isSubCategory) {
    products = await prisma.product.findMany({
      where: { categorySlug: { equals: slug, mode: 'insensitive' } },
      include: { offers: { include: { store: true } } },
      take: 50
    }) as ProductWithOffers[];
  } else {
    const subCategorySlugs = categoryData.subCategories.map(sub => sub.slug);
    products = await prisma.product.findMany({
      where: { 
        OR: [
          { categorySlug: { equals: slug, mode: 'insensitive' } },
          { categorySlug: { in: subCategorySlugs } }
        ]
      },
      include: { offers: { include: { store: true } } },
      take: 50
    }) as ProductWithOffers[];
  }

  // 3. Fetch user favorites if logged in
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }

  // 4. Extract dynamic facets
  const facets = extractFacets(products);

  const displayName = isSubCategory 
    ? subCategoryData?.name 
    : categoryData.name;

  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8 bg-[#F9FAFB]">
      {/* Dynamic Breadcrumbs */}
      <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
        <Link href="/" className="hover:underline">Ana Səhifə</Link>
        <ChevronRight className="w-3 h-3" />
        {isSubCategory ? (
          <>
            <Link href={`/category/${categoryData.slug}`} className="hover:underline">{categoryData.name}</Link>
            <ChevronRight className="w-3 h-3" />
            <span className="font-medium text-gray-900">{displayName}</span>
          </>
        ) : (
          <span className="font-medium text-gray-900">{displayName}</span>
        )}
      </div>

      {/* Hero Header */}
      <div className="relative h-[250px] rounded-[2.5rem] overflow-hidden mb-12 shadow-2xl group">
        <Image 
          src={ (isSubCategory ? subCategoryData?.image : categoryData.image) || 'https://images.unsplash.com/photo-1498049794561-7780e7231661?q=80&w=2670'} 
          alt={displayName || ""} 
          fill 
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent flex flex-col justify-center px-12">
          <h1 className="text-5xl font-black text-white mb-2 tracking-tight uppercase">
             {displayName}
          </h1>
          <p className="text-white/80 max-w-md font-medium">
             {products.length} məhsul üzrə ən sərfəli təklifləri müqayisə edin.
          </p>
        </div>
      </div>

      {/* Dynamic Sub-categories Grid - Only show if current page is TOP level */}
      {!isSubCategory && categoryData.subCategories.length > 0 && (
        <div className="mb-16">
          <h2 className="text-2xl font-black text-[#1a1a1a] mb-8 px-1 uppercase tracking-tight flex items-center gap-3">
             <span className="w-2 h-8 bg-[#FF5500] rounded-full"></span>
             Alt Kateqoriyalar
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
            {categoryData.subCategories.map((sub) => (
              <Link href={`/category/${sub.slug}`} key={sub.id} className="group">
                <div className="relative aspect-[16/10] rounded-3xl overflow-hidden mb-4 shadow-lg border-2 border-transparent group-hover:border-[#FF5500] transition-all duration-300">
                  <Image 
                    src={sub.image || 'https://placehold.co/400x300/png?text='+sub.name} 
                    alt={sub.name} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500" 
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <h3 className="font-black text-center text-[#1a1a1a] group-hover:text-[#FF5500] transition-colors tracking-tight uppercase text-sm">
                  {sub.name}
                </h3>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Navigation Title for Results */}
      <div className="flex items-center justify-between mb-8 border-b border-gray-200 pb-6 px-1">
        <div>
          <h2 className="text-3xl font-black text-[#1a1a1a] tracking-tight uppercase">Məhsullar</h2>
          <p className="text-sm text-gray-500 mt-1 font-medium italic">
            {displayName} sahəsində ən yaxşı qiymətlər
          </p>
        </div>
      </div>

      {/* Main Content Area with Filters and Products */}
      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10 items-start">
        {/* DYNAMIC SIDEBAR */}
        <aside className="hidden lg:block sticky top-32 self-start h-[calc(100vh-8rem)] overflow-y-auto pb-10 no-scrollbar">
          <FilterSidebar facets={facets} />
        </aside>

        {/* PRODUCT GRID */}
        <section className="min-w-0">
          {products.length === 0 ? (
            <div className="bg-white rounded-[3rem] border border-gray-100 p-20 text-center shadow-xl">
                <Search className="w-12 h-12 text-gray-200 mx-auto mb-6" />
                <h3 className="text-xl font-bold text-[#1a1a1a]">Heç bir məhsul tapılmadı</h3>
                <p className="text-gray-400">Bu kategoriya üçün hələlik məhsul yoxdur.</p>
                <Link href="/" className="mt-8 inline-block px-8 py-3 bg-[#1E3A8A] text-white font-bold rounded-full hover:bg-[#FF5500] transition-colors">
                  Ana Səhifəyə Qayıt
                </Link>
            </div>
          ) : (
            <ProductGrid products={products} userFavoriteIds={userFavoriteIds} />
          )}
        </section>
      </div>
    </main>
  );
}
