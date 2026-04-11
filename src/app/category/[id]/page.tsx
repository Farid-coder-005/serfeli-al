import Image from "next/image";
import Link from "next/link";
import { Home } from "lucide-react";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { ProductCard } from "@/components/ProductCard";
import { ProductCarousel } from "@/components/ProductCarousel";

export default async function CategoryPage({ params }: { params: { id: string } }) {
  const categoryId = params.id;
  
  const products = await prisma.product.findMany({ 
    include: { offers: { include: { store: true } } } 
  });
  
  const session = await getServerSession(authOptions);
  let userFavoriteIds: string[] = [];
  if (session?.user && (session.user as any).id) {
    const faves = await prisma.favorite.findMany({
      where: { userId: (session.user as any).id },
      select: { productId: true }
    });
    userFavoriteIds = faves.map(f => f.productId);
  }

  // Mock sub-categories logic
  const subCategories = [
    {
      title: "Kompüterlər",
      img: "/iphone15pro.png",
      links: ["Noutbuklar", "Masaüstü kompüterlər", "Planşetlər", "Monitorlar", "PC Komponentləri"]
    },
    {
      title: "Smartfonlar",
      img: "/iphone15pro.png",
      links: ["Apple (iPhone)", "Samsung Galaxy", "Xiaomi", "Honor", "Mobil Aksesuarlar"]
    },
    {
      title: "TV və Audio",
      img: "/iphone15pro.png",
      links: ["Televizorlar", "Qulaqlıqlar", "Bluetooth Dinamiklər", "Ev Sineması", "Soundbarlar"]
    },
    {
      title: "Foto və Video",
      img: "/iphone15pro.png",
      links: ["Rəqəmsal Kameralar", "Aksiyon Kameraları", "Dronlar", "Linzalar", "Foto Aksesuarlar"]
    }
  ];

  const bestsellers = products.length > 2 ? products.slice(0, 3) : products;
  const deals = products.length > 0 ? products.slice(0, 8) : products;

  return (
    <div className="flex flex-col w-full bg-white min-h-screen">
      <div className="max-w-[1200px] mx-auto w-full px-4 py-6">
        
        {/* 1. Breadcrumbs & Title */}
        <div className="text-sm text-gray-500 mb-6 flex items-center gap-2">
          <Home className="w-4 h-4" /> {'>'} <span className="capitalize">{categoryId.replace('-', ' ')}</span>
        </div>
        <h1 className="text-4xl font-bold text-[#222222] mb-10 capitalize">{categoryId.replace('-', ' ')}</h1>

        {/* 2. Sub-Category Grid (The 4-Column Directory) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
          {subCategories.map((sub, idx) => (
            <div key={idx} className="flex flex-col">
              <div className="h-32 relative mb-4 w-full">
                <Image src={sub.img} alt={sub.title} fill className="object-contain" sizes="(max-width: 768px) 100vw, 25vw" />
              </div>
              <div className="flex justify-between items-center border-b border-gray-300 pb-2 mb-4">
                <h3 className="text-xl font-bold text-[#222222]">{sub.title}</h3>
                <span className="text-xl text-gray-400 font-light">{'>'}</span>
              </div>
              <ul className="space-y-3 mb-6">
                {sub.links.map((link, j) => (
                  <li key={j}>
                    <Link href={`/search?q=${encodeURIComponent(link)}`} className="text-sm text-[#222222] hover:underline">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex justify-center mb-16">
          <Link href="/search" className="border border-gray-300 text-[#222222] font-bold px-8 py-3 rounded-sm hover:bg-gray-50 transition-colors">
            Bütün kateqoriyalar
          </Link>
        </div>

        {/* 3. Bestsellers Grid (3-Column Static Grid) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#222222] mb-2 capitalize">Bestsellers in "{categoryId.replace('-', ' ')}"</h2>
          <hr className="border-gray-200 mb-6" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-gray-200 rounded-sm overflow-hidden bg-white">
            {bestsellers.map((product, idx) => (
              <div key={product.id} className={`border-b md:border-b-0 ${idx < 2 ? 'md:border-r' : ''} border-gray-200 h-full`}>
                <ProductCard product={product} userFavoriteIds={userFavoriteIds} />
              </div>
            ))}
          </div>
        </div>

        {/* 4. Deals Carousel (Horizontal Scroll) */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#222222] mb-2 capitalize">Deals in "{categoryId.replace('-', ' ')}"</h2>
          <hr className="border-gray-200 mb-6" />
          {/* We reuse ProductCarousel here which exactly implements the logic requested */}
          <div className="w-full relative">
            <ProductCarousel products={deals} userFavoriteIds={userFavoriteIds} />
          </div>
        </div>

      </div>
    </div>
  );
}
