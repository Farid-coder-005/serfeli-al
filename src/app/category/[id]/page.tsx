export default function CategoryPage() {
  return (
    <main className="max-w-[1200px] mx-auto w-full px-4 py-8">
      {/* 1. Breadcrumbs & Title */}
      <div className="text-sm text-gray-500 mb-4">Ana Səhifə {'>'} Elektronika</div>
      <h1 className="text-4xl font-bold text-[#222222] mb-10">Elektronika</h1>

      {/* 2. Sub-Category 4-Column Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
         {/* Example Sub-category */}
         <div>
           <div className="h-32 bg-gray-100 mb-4 flex items-center justify-center">Image</div>
           <h3 className="text-xl font-bold border-b pb-2 mb-2">Kompüterlər {'>'}</h3>
           <ul className="space-y-2 text-sm">
              <li>Noutbuklar</li>
              <li>Planşetlər</li>
           </ul>
         </div>
         {/* Add 3 more similar columns here... */}
      </div>

      {/* 3. Bestsellers Static Grid (Not a carousel) */}
      <h2 className="text-2xl font-bold mb-4">Bestsellers in "Elektronika"</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 border border-gray-200 mb-16">
          {/* Render 3 large ProductCards here */}
      </div>

      {/* 4. Deals Carousel */}
      <h2 className="text-2xl font-bold mb-4">Deals in "Elektronika"</h2>
      <div className="flex gap-4 overflow-x-auto snap-x pb-6">
          {/* Render standard ProductCard carousel here */}
      </div>
    </main>
  );
}
