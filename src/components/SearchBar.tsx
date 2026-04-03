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
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="hidden md:flex relative items-center w-full max-w-sm mx-4"
    >
      <input
        type="text"
        placeholder="Məhsul axtar..."
        className="w-full bg-gray-100 hover:bg-gray-200 focus:bg-white border border-transparent focus:border-[#057850] rounded-full py-2 pl-4 pr-10 text-sm outline-none transition-colors"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        type="submit"
        aria-label="Axtar"
        className="absolute right-3 text-gray-500 hover:text-[#057850] transition-colors"
      >
        <Search className="w-[18px] h-[18px]" strokeWidth={1.8} />
      </button>
    </form>
  );
}
