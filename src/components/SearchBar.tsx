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
      className="flex relative items-center w-full max-w-4xl mx-auto shadow-sm group"
    >
      <div className="absolute inset-0 bg-[#057850]/5 rounded-r-xl -z-10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white rounded-l-xl py-3.5 sm:py-4 pl-6 pr-4 text-[15px] font-medium text-gray-800 placeholder-gray-400 outline-none border border-gray-100 focus:border-[#057850]/20 transition-all shadow-inner"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-[#057850] hover:bg-[#046241] text-white px-7 sm:px-10 py-3.5 sm:py-4 rounded-r-xl transition-all flex items-center justify-center shrink-0 shadow-lg shadow-[#057850]/10 hover:shadow-[#057850]/20 active:scale-[0.98]"
      >
        <Search className="w-6 h-6 sm:w-7 sm:h-7" strokeWidth={3} />
      </button>
    </form>
  );
}
