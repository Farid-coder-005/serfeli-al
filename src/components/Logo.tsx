"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-start group select-none">
       {/* Restored Original Project Font */}
       <div className="flex items-center leading-[0.85]">
         <span className="text-[36px] font-[900] tracking-tighter text-white">
           Sərfəli
         </span>
         <span className="text-[36px] font-[900] tracking-tighter text-[#FF5500]">
           .al
         </span>
       </div>
       <div className="w-full h-[6px] bg-[#FF5500] mt-[5px]" />
     </Link>
   );
 }
