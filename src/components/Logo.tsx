"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="flex items-center shrink-0">
       <span className="text-3xl sm:text-[34px] font-black text-white tracking-tighter leading-none">
         Sərfəli<span className="text-[#ff5500]">.al</span>
       </span>
     </Link>
   );
 }
