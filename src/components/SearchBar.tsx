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
      className="flex relative items-center w-full max-w-5xl shadow-sm hover:shadow transition-all group border border-gray-200 rounded-2xl overflow-hidden bg-white"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="flex-1 bg-[#f8fafc] hover:bg-white focus:bg-white py-4 sm:py-5.5 pl-10 pr-4 text-lg font-medium text-gray-800 placeholder-gray-400 outline-none transition-all"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-brand-green hover:bg-brand-green-dark text-white px-8 sm:px-14 py-4 sm:py-5.5 transition-all flex items-center justify-center shrink-0"
      >
        <Search className="w-6 h-6 sm:w-8 sm:h-8" strokeWidth={3} />
      </button>
    </form>
  );
}
