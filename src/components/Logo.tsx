"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-start md:pr-4 group">
        <span className="text-3xl sm:text-[34px] font-black text-white tracking-tighter leading-none relative">
           Sərfəli<span className="text-[#ff5500]">.al</span>
           <div className="absolute bottom-[-6px] left-0 w-[85%] h-[3px] bg-[#FF5500] rounded-full" />
        </span>
     </Link>
   );
 }
