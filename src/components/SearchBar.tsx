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
      className="flex w-full"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="flex-1 bg-white py-2.5 pl-4 pr-4 text-[15px] font-medium text-[#222222] placeholder-gray-500 outline-none border-2 border-[#FF5500] focus:border-[#FF5500] rounded-l-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-[#FF5500] hover:bg-[#E04A00] text-white px-6 py-2.5 transition-colors flex items-center justify-center shrink-0 rounded-r-sm"
      >
        <Search className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
