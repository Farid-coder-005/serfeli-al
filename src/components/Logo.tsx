"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src="/logo.png" 
        alt="Sərfəli.al" 
        width={300}
        height={128}
        className="h-28 sm:h-32 w-auto object-contain"
        priority
      />
    </Link>
  );
}
