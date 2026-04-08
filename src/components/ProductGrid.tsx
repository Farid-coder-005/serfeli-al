import { ProductCard } from "./ProductCard";
import { ChevronDown } from "lucide-react";

interface ProductGridProps {
  products: any[];
  userFavoriteIds: string[];
}

export function ProductGrid({ products, userFavoriteIds }: ProductGridProps) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.map((product, idx) => (
          <ProductCard 
            key={product.id} 
            product={product} 
            userFavoriteIds={userFavoriteIds}
            priority={idx === 0}
          />
        ))}
      </div>
      
      {/* 'Daha Çox Göstər' Visual Anchor */}
      {products.length > 0 && (
        <div className="mt-10 flex justify-center">
           <button className="px-6 py-2 bg-gray-100 text-gray-700 rounded-full font-medium hover:bg-gray-200 transition">
             Daha Çox Göstər
           </button>
        </div>
      )}
    </div>
  );
}
