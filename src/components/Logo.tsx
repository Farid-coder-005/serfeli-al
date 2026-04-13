"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-center md:items-start md:pr-4 group select-none">
       <div className="flex items-center leading-[0.85]">
         <span 
           className="text-[36px] font-[900] tracking-[-0.04em] text-white" 
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
       <div className="w-full h-[6px] bg-[#FF5500] mt-[5px]" />
     </Link>
   );
 }
