"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="flex items-center shrink-0">
       <span className="text-2xl sm:text-3xl font-black text-white tracking-tighter leading-none">
         Sərfəli<span className="text-[#ff5500]">.al</span>
       </span>
     </Link>
   );
 }
