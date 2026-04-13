"use client";
 
 import Link from 'next/link';
 
 export function Logo() {
   return (
     <Link href="/" className="shrink-0 flex flex-col items-center md:items-start md:pr-4 group leading-none">
       <span 
         className="text-3xl sm:text-[36px] font-[900] text-white tracking-[-0.05em] leading-none relative font-nunito"
         style={{ fontFamily: 'var(--font-nunito)' }}
       >
         Sərfəli<span className="text-[#ff5500]">.al</span>
         <div className="absolute bottom-[-10px] left-0 w-full h-[4px] bg-[#FF5500] rounded-full" />
       </span>
     </Link>
   );
 }
