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
        height={55}
        className="h-[100px] sm:h-[130px] w-auto object-contain"
        style={{ height: undefined, width: 'auto', maxWidth: 'none', maxHeight: 'none' }}
        priority
        unoptimized={false}
      />
    </Link>
  );
}
