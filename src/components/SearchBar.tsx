"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
      setQuery("");
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex relative items-center w-full max-w-5xl group rounded-lg overflow-hidden bg-white"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="flex-1 bg-[#F4F4F4] hover:bg-gray-100 focus:bg-white py-4 sm:py-5 pl-8 pr-4 text-lg font-bold text-[#222222] placeholder-gray-500 outline-none transition-all border-y border-l border-gray-200 focus:border-gray-300 rounded-l-lg"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-[#FF5500] hover:bg-[#E04A00] text-white px-8 sm:px-12 py-4 sm:py-5 transition-all flex items-center justify-center shrink-0 rounded-r-lg"
      >
        <Search className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
      </button>
    </form>
  );
}
