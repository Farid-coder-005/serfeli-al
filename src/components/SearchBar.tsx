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
      className="flex relative items-center w-full shadow-sm"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="w-full bg-white rounded-l-md py-2.5 pl-4 pr-4 text-sm text-gray-800 placeholder-gray-400 outline-none border-none focus:ring-1 focus:ring-[#FF6600]/20"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="bg-[#FF6600] hover:bg-[#e55b00] text-white px-5 py-2.5 rounded-r-md transition-colors flex items-center justify-center shrink-0"
      >
        <Search className="w-5 h-5" strokeWidth={2.5} />
      </button>
    </form>
  );
}
