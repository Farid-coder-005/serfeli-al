import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    // Clear existing data to allow re-seeding
    await prisma.favorite.deleteMany();
    await prisma.priceHistory.deleteMany();
    await prisma.productOffer.deleteMany();
    await prisma.product.deleteMany();
    await prisma.store.deleteMany();

    // 1. Create Stores
    const storesData = [
      { name: 'Kontakt', websiteUrl: 'https://kontakt.az' },
      { name: 'İrşad', websiteUrl: 'https://irshad.az' },
      { name: 'Baku Electronics', websiteUrl: 'https://bakuelectronics.az' },
      { name: 'Soliton', websiteUrl: 'https://soliton.az' },
      { name: 'Music Gallery', websiteUrl: 'https://mgstore.az' },
      { name: 'Optimal', websiteUrl: 'https://optimal.az' },
    ];

    const storeMap = new Map<string, string>();
    for (const s of storesData) {
      const store = await prisma.store.create({ data: s });
      storeMap.set(s.name, store.id);
    }

    // 2. Create Products with Offers
    const productsData = [
      {
        title: 'Apple iPhone 15 Pro, 256GB, Natural Titanium',
        category: 'elektronika',
        description: 'The latest iPhone 15 Pro with A17 Pro chip and titanium design.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 2499.99 },
          { storeName: 'İrşad', price: 2549.99 },
          { storeName: 'Baku Electronics', price: 2489.00 },
        ],
      },
      {
        title: 'Sony PlayStation 5 Console (Disc Edition)',
        category: 'elektronika',
        description: 'Next-gen gaming with lightning-fast loading and 3D audio.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Soliton', price: 1099.00 },
          { storeName: 'Kontakt', price: 1050.00 },
          { storeName: 'Music Gallery', price: 1120.00 },
        ],
      },
      {
        title: 'Samsung Galaxy S24 Ultra, 512GB, Titanium Black',
        category: 'elektronika',
        description: 'Galaxy AI is here. Experience the new era of mobile AI.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Baku Electronics', price: 2899.00 },
          { storeName: 'İrşad', price: 2799.00 },
          { storeName: 'Optimal', price: 2850.00 },
        ],
      },
      {
        title: 'Dyson V15 Detect Absolute',
        category: 'elektronika',
        description: "Dyson's most powerful, most intelligent cordless vacuum.",
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 1650.00 },
          { storeName: 'Baku Electronics', price: 1700.00 },
        ],
      },
      {
        title: 'Apple MacBook Air M3, 16GB RAM, 512GB SSD',
        category: 'elektronika',
        description: "Supercharged by M3. The world's best thin and light laptop.",
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 3150.00 },
          { storeName: 'İrşad', price: 3200.00 },
        ],
      },
      {
        title: 'LG OLED evo C3 55" 4K Smart TV',
        category: 'elektronika',
        description: 'Self-lit OLED pixels create infinite contrast.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Baku Electronics', price: 2899.00 },
          { storeName: 'Optimal', price: 2750.00 },
          { storeName: 'Music Gallery', price: 2800.00 },
        ],
      },
      {
        title: 'Apple AirPods Pro (2nd generation) with USB-C',
        category: 'elektronika',
        description: 'Rich audio experience with Active Noise Cancellation.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 549.00 },
          { storeName: 'İrşad', price: 529.00 },
          { storeName: 'Baku Electronics', price: 539.00 },
        ],
      },
      {
        title: 'Sony WH-1000XM5 Wireless Noise Canceling Headphones',
        category: 'elektronika',
        description: 'Industry leading noise canceling headphones.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Soliton', price: 799.00 },
          { storeName: 'Kontakt', price: 769.00 },
        ],
      },
      {
        title: 'Apple Watch Series 9 GPS 45mm Midnight Aluminum',
        category: 'elektronika',
        description: 'Smarter, brighter, and mightier.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 899.00 },
          { storeName: 'İrşad', price: 929.00 },
        ],
      },
      {
        title: 'Nintendo Switch OLED Model',
        category: 'elektronika',
        description: 'Play at home or on the go with a vibrant 7-inch OLED screen.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 749.00 },
          { storeName: 'Music Gallery', price: 730.00 },
        ],
      },
      {
        title: 'ASUS ROG Strix G16 Gaming Laptop',
        category: 'elektronika',
        description: 'High-performance gaming laptop with RTX 4060.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Baku Electronics', price: 2499.00 },
          { storeName: 'Soliton', price: 2550.00 },
        ],
      },
      {
        title: 'Samsung Galaxy Tab S9 Ultra 512GB',
        category: 'elektronika',
        description: 'The largest Dynamic AMOLED 2X display on a Galaxy tablet.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'İrşad', price: 2199.00 },
          { storeName: 'Kontakt', price: 2150.00 },
        ],
      },
      {
        title: 'GoPro HERO12 Black',
        category: 'elektronika',
        description: 'Incredible image quality, even better HyperSmooth video stabilization.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Music Gallery', price: 899.00 },
          { storeName: 'Baku Electronics', price: 919.00 },
        ],
      },
      {
        title: 'Müasir Minimalist İkili Divan',
        category: 'mebel',
        description: 'Gözəl və rahat dizayn ilə müasir divan.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Kontakt', price: 450.00 },
          { storeName: 'Optimal', price: 470.00 },
        ],
      },
      {
        title: 'Kişi Üçün Ağ T-shirt (100% Pambıq)',
        category: 'geyim',
        description: 'Gündəlik rahatlıq üçün yüksək keyfiyyətli pambıq.',
        imageUrl: '/iphone15pro.png',
        offers: [
          { storeName: 'Soliton', price: 25.00 },
        ],
      },
    ];

    let productCount = 0;
    let offerCount = 0;

    for (const pd of productsData) {
      const { offers, ...productDetails } = pd;
      const product = await prisma.product.create({
        data: {
          ...productDetails,
          offers: {
            create: offers.map((offer) => ({
              storeId: storeMap.get(offer.storeName)!,
              currentPrice: offer.price,
              isAvailable: true,
            })),
          },
        },
      });

      // Generate 3-5 PriceHistory points per offer/store
      // We'll create scenarios:
      // Half of products will have "Real Discounts" (current price <= min historical)
      // Half will have "Süni/Fake Discounts" (past price was lower)
      const isRealDiscount = productCount % 2 === 0;

      for (const offer of offers) {
        const storeId = storeMap.get(offer.storeName)!;
        const historyPointsCount = 3 + Math.floor(Math.random() * 3); // 3-5 points

        for (let i = 1; i <= historyPointsCount; i++) {
          const daysAgo = i * 7 + Math.floor(Math.random() * 5); // Spread over 30 days
          const recordedAt = new Date();
          recordedAt.setDate(recordedAt.getDate() - daysAgo);

          let historicalPrice: number;
          if (isRealDiscount) {
            // Real: past prices were higher
            historicalPrice = offer.price * (1.1 + Math.random() * 0.2); // +10-30%
          } else {
            // Fake: some past price was lower
            if (i === 1) {
              historicalPrice = offer.price * (0.8 + Math.random() * 0.1); // -10-20% (the "trap")
            } else {
              historicalPrice = offer.price * (1.1 + Math.random() * 0.2); // others higher
            }
          }

          await prisma.priceHistory.create({
            data: {
              productId: product.id,
              storeId: storeId,
              price: parseFloat(historicalPrice.toFixed(2)),
              recordedAt: recordedAt,
            },
          });
        }
      }

      productCount++;
      offerCount += offers.length;
    }

    return NextResponse.json({
      message: '✅ Seed successful!',
      stores: storesData.length,
      products: productCount,
      offers: offerCount,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: 'Seed failed', details: error?.message || 'Unknown error' },
      { status: 500 }
    );
  }
}
