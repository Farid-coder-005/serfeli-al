import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const existingCount = await prisma.product.count();
    if (existingCount > 0) {
      return NextResponse.json({ message: "Database already seeded" });
    }

    // 1. Create Stores
    const kontakt = await prisma.store.create({
      data: {
        name: 'Kontakt Home',
        websiteUrl: 'https://kontakt.az',
      }
    });

    const irsad = await prisma.store.create({
      data: {
        name: 'İrşad',
        websiteUrl: 'https://irshad.az',
      }
    });

    const bakuElec = await prisma.store.create({
      data: {
        name: 'Baku Electronics',
        websiteUrl: 'https://bakuelectronics.az',
      }
    });

    // 2. Create Products
    const productsToCreate = [
      {
        title: "Apple iPhone 15 Pro, 256GB, Natural Titanium",
        description: "A17 Pro chip, Titanium build.",
        imageUrl: "/iphone15pro.png",
        category: "elektronika",
      },
      {
        title: "Sony PlayStation 5 Console (Disc Edition)",
        description: "Ultra High Speed SSD, Ray Tracing.",
        imageUrl: "/iphone15pro.png", // Using the same dummy image in original ui
        category: "elektronika",
      },
      {
        title: "Samsung Galaxy S24 Ultra, 512GB",
        description: "Snapdragon 8 Gen 3, S-Pen included.",
        imageUrl: "/iphone15pro.png",
        category: "elektronika",
      },
      {
        title: "Dyson V15 Detect Absolute",
        description: "Intelligent cordless vacuum.",
        imageUrl: "/iphone15pro.png",
        category: "elektronika",
      }
    ];

    const products = [];
    for (const p of productsToCreate) {
      products.push(await prisma.product.create({ data: p }));
    }

    // 3. Create Product Offers (linking products to stores)
    const stores = [kontakt, irsad, bakuElec];
    
    for (const product of products) {
      // Create an offer for 2 random stores for each product
      const shuffledStores = [...stores].sort(() => 0.5 - Math.random()).slice(0, 2);
      
      // Random price between 1000 and 3000
      for (const store of shuffledStores) {
        const randomPrice = Math.floor(Math.random() * 2000) + 1000;
        
        await prisma.productOffer.create({
          data: {
            productId: product.id,
            storeId: store.id,
            currentPrice: randomPrice,
            productUrl: store.websiteUrl + '/product/' + product.id,
          }
        });
      }
    }

    return NextResponse.json({ message: "Seed successful!" });
  } catch (error: any) {
    return NextResponse.json({ error: "Seed failed", details: error?.message || "Unknown error" }, { status: 500 });
  }
}
