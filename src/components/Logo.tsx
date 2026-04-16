"use client";
 
import Link from 'next/link';

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  onClick?: () => void;
}

export function Logo({ variant = "light", className = "", onClick }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-[#0F172A]";

  return (
    <Link 
      href="/" 
      onClick={onClick}
      className={`shrink-0 flex flex-col select-none group w-fit ${className}`}
    >
      {/* Logo Text with Rounded Nunito Font */}
      <div className="flex items-center leading-[0.85]">
        <span 
          className={`text-[36px] font-[900] tracking-[-0.04em] ${textColor}`} 
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          Sərfəli
        </span>
        <span 
          className="text-[36px] font-[900] tracking-[-0.04em] text-[#FF5500]" 
          style={{ fontFamily: "'Nunito', sans-serif" }}
        >
          .al
        </span>
      </div>
      
      {/* The solid, thick Idealo-style underline */}
      <div className="w-full h-[6px] bg-[#FF5500] mt-[5px]" />
    </Link>
  );
}
