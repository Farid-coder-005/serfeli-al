"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-start md:pr-4 group select-none">
       {/* Logo Text with Papyrus Font */}
       <div className="flex items-center leading-[0.85]">
         <span 
           className="text-[36px] font-bold tracking-normal text-white" 
           style={{ fontFamily: "'Papyrus', fantasy" }}
         >
           Sərfəli
         </span>
         <span 
           className="text-[36px] font-bold tracking-normal text-[#FF5500]" 
           style={{ fontFamily: "'Papyrus', fantasy" }}
         >
           .al
         </span>
       </div>
       
       {/* The solid, thick underline */}
       <div className="w-full h-[6px] bg-[#FF5500] mt-[5px]" />
     </Link>
   );
 }
