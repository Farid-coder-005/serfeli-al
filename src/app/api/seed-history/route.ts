import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma'; // Confirmed path at src/lib/prisma.ts

export const dynamic = 'force-dynamic'; // CRITICAL: Prevent static generation caching

export async function GET() {
  try {
    console.log('🚀 Triggering a clean, production-safe PriceHistory seeding...');

    // Fetch all products with their active offers to associate history correctly
    const products = await prisma.product.findMany({
      include: {
        offers: {
          where: { isAvailable: true },
          take: 1, // We just need one store to associate history with
        },
      },
    });

    if (products.length === 0) {
      return NextResponse.json({ 
        success: false, 
        message: 'No products found. Please run the primary seed route first.' 
      }, { status: 404 });
    }

    let totalRecords = 0;

    for (const product of products) {
      // Skip products that don't have a storefront offer to link history to
      if (product.offers.length === 0) continue;

      const offer = product.offers[0];
      const currentPrice = offer.currentPrice;
      
      // Implement scenario logic for test variety
      const isRealDiscount = Math.random() > 0.5;
      const numPoints = 4; // Generate 4 points per product

      for (let i = 1; i <= numPoints; i++) {
        const daysAgo = i * 7; 
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);

        let historicalPrice;
        if (isRealDiscount) {
          // Real: Past prices were higher (10-30%)
          historicalPrice = currentPrice * (1.1 + Math.random() * 0.2);
        } else {
          // Fake: At least some past price was notably lower (10-20%)
          historicalPrice = currentPrice * (0.8 + Math.random() * 0.1);
        }

        // Await each creation to ensure consistency
        await prisma.priceHistory.create({
          data: {
            productId: product.id,
            storeId: offer.storeId,
            price: Number(historicalPrice.toFixed(2)),
            recordedAt: date,
          },
        });
        totalRecords++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Seeded ${totalRecords} historical records for ${products.length} products successfully.` 
    });
  } catch (error) {
    console.error('❌ CRITICAL SEEDING ERROR:', error);
    return NextResponse.json({ 
      success: false, 
      error: String(error) 
    }, { status: 500 });
  }
}
