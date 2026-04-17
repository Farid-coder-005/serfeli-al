"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

interface FavoriteButtonProps {
  productId: string;
  initialFavorited: boolean;
  className?: string; // Optional custom class placement
}

export function FavoriteButton({ productId, initialFavorited, className }: FavoriteButtonProps) {
  const { status } = useSession();
  const router = useRouter();
  const [isFavorited, setIsFavorited] = useState(initialFavorited);

  const toggleFavorite = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (status === "unauthenticated") {
      alert("Məhsulu istək siyahısına əlavə etmək üçün qeydiyyatdan keçin və ya daxil olun.");
      router.push("/login");
      return;
    }

    // Optimistic UI updates
    setIsFavorited(!isFavorited);

    try {
      const response = await fetch("/api/favorites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId })
      });

      if (!response.ok) {
        setIsFavorited(isFavorited);
      }
    } catch (error) {
      setIsFavorited(isFavorited);
    }
  };

  const defaultClasses = className || "absolute top-4 right-4";

  return (
    <button
      onClick={toggleFavorite}
      className={`${defaultClasses} z-20 flex items-center justify-center w-10 h-10 rounded-full shadow-lg transition-all active:scale-90 ${
        isFavorited
          ? "bg-red-50 text-[#EA580C] hover:bg-red-100" // Use our platform orange/brand for red
          : "bg-white text-[#ABC1D6] hover:text-[#EA580C] hover:bg-gray-50"
      }`}
      aria-label="İstək siyahısına əlavə et"
    >
      <Heart
        className="w-5 h-5 transition-transform"
        fill={isFavorited ? "currentColor" : "none"}
        strokeWidth={isFavorited ? 1.5 : 2}
      />
    </button>
  );
}
