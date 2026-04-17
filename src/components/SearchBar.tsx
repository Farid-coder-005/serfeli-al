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
      className="flex w-full relative"
    >
      <input
        id="main-search-input"
        type="text"
        placeholder="Nə axtarırsınız?"
        className="w-full bg-white py-3.5 pl-4 pr-12 text-[16px] text-[#222222] placeholder-gray-600 outline-none rounded-sm"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="absolute right-0 top-0 bottom-0 px-3 flex items-center justify-center bg-transparent"
      >
        <Search className="w-6 h-6 text-[#FF6B00]" strokeWidth={2.5} />
      </button>
    </form>
  );
}
