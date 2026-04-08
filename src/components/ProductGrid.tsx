import { ProductCard } from "./ProductCard";
import { ChevronDown } from "lucide-react";

interface ProductGridProps {
  products: any[];
  userFavoriteIds: string[];
}

export function ProductGrid({ products, userFavoriteIds }: ProductGridProps) {
  return (
    <div className="flex flex-col gap-16">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
        <div className="flex justify-center pt-8 border-t border-gray-100/50">
          <button className="group flex flex-col items-center gap-3 transition-all active:scale-95 hover:translate-y-1">
            <span className="text-[11px] font-black text-gray-400 uppercase tracking-widest group-hover:text-[#057850] transition-colors">
              Daha Çox Göstər
            </span>
            <div className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center shadow-sm group-hover:shadow-lg group-hover:border-[#057850]/20 transition-all">
              <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-[#057850] transition-colors" />
            </div>
          </button>
        </div>
      )}
    </div>
  );
}
