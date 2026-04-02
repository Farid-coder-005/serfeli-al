export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // or your correct path

export async function GET() {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json({ 
      error: "Failed to fetch", 
      details: error?.message || "Unknown error occurred" 
    }, { status: 500 });
  }
}
