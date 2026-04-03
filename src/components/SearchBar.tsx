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
      className="flex relative items-center w-full max-w-4xl mx-auto shadow-sm"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız? (məs. iPhone 15 Pro)"
        className="w-full bg-[#f8fafc] hover:bg-[#f1f5f9] focus:bg-white rounded-l-md py-2.5 sm:py-3 pl-4 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-1 focus:ring-[#057850]/20 transition-all"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-[#057850] hover:bg-[#046241] text-white px-5 sm:px-7 py-2.5 sm:py-3 rounded-r-md transition-colors flex items-center justify-center shrink-0"
      >
        <Search className="w-5 h-5 sm:w-6 sm:h-6" strokeWidth={2.5} />
      </button>
    </form>
  );
}
