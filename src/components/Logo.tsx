"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src="/logo.png" 
        alt="Sərfəli.al" 
        width={450}
        height={165}
        className="h-[130px] sm:h-[165px] w-auto object-contain"
        priority
      />
    </Link>
  );
}
