"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center shrink-0">
      <Image 
        src="/logo.png" 
        alt="Sərfəli.al" 
        width={350}
        height={144}
        className="h-[120px] sm:h-36 w-auto object-contain"
        priority
      />
    </Link>
  );
}
