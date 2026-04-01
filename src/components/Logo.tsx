"use client";

import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center p-0 m-0">
      <Image 
        src="/logo.png" 
        alt="Sərfəli.al" 
        width={300}
        height={50}
        className="h-[50px] w-auto object-contain"
        style={{ height: '50px', width: 'auto', maxWidth: 'none' }}
        priority
      />
    </Link>
  );
}
