"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-start md:pr-4 group select-none">
       {/* Logo Text with Montserrat Font */}
       <div className="flex items-center leading-[0.85]">
         <span 
           className="text-[36px] font-[800] tracking-tight text-white line-clamp-1" 
           style={{ fontFamily: "'Montserrat', sans-serif" }}
         >
           Sərfəli
         </span>
         <span 
           className="text-[36px] font-[800] tracking-tight text-[#FF5500]" 
           style={{ fontFamily: "'Montserrat', sans-serif" }}
         >
           .al
         </span>
       </div>
       
       {/* The solid, thick underline (Preserved) */}
       <div className="w-full h-[6px] bg-[#FF5500] mt-[5px]" />
     </Link>
   );
 }
