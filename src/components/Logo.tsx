"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src="/logo-full.png" 
        alt="Sərfəli.al" 
        width={300}
        height={64}
        className="h-14 sm:h-16 w-auto object-contain"
        priority
      />
    </Link>
  );
}
