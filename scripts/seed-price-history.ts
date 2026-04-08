import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;

if (!connectionString) {
  console.error('❌ No DATABASE_URL or DIRECT_URL found in environment!');
  process.exit(1);
}

const pool = new Pool({ 
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  console.log('🚀 Starting PriceHistory injection script...');

  // Fetch all products with their active offers
  const products = await prisma.product.findMany({
    include: {
      offers: {
        where: { isAvailable: true },
        take: 1, // We just need one store to associate history with
      },
    },
  });

  if (products.length === 0) {
    console.log('❌ No products found in the database. Run initial seed first.');
    return;
  }

  console.log(`📦 Found ${products.length} products. Injecting history points...`);

  let totalRecords = 0;

  for (const product of products) {
    if (product.offers.length === 0) {
      console.log(`⚠️ Skipping "${product.title}" (no offers found).`);
      continue;
    }

    const offer = product.offers[0];
    const currentPrice = offer.currentPrice;
    
    // Choose scenario: 50% chance for Real Discount vs Fake/Neutral
    const isRealDiscount = Math.random() > 0.5;
    
    // Create 5 historical points spread over 30 days
    const historyPoints = [];
    for (let i = 1; i <= 5; i++) {
      const daysAgo = i * 6; // Points at 6, 12, 18, 24, 30 days ago
      const date = new Date();
      date.setDate(date.getDate() - daysAgo);

      let historicalPrice;
      if (isRealDiscount) {
        // Current price is lower than historical (Real Discount)
        // Past was 5% to 30% higher
        historicalPrice = currentPrice * (1 + (0.05 + Math.random() * 0.25));
      } else {
        // Past price was lower than current (Fake Discount)
        // Past was 5% to 15% lower
        historicalPrice = currentPrice * (1 - (0.05 + Math.random() * 0.1));
      }

      historyPoints.push({
        productId: product.id,
        storeId: offer.storeId,
        price: Number(historicalPrice.toFixed(2)),
        recordedAt: date,
      });
    }

    // Insert into DB
    await prisma.priceHistory.createMany({
      data: historyPoints,
    });

    totalRecords += historyPoints.length;
    console.log(`✅ Injected 5 points for "${product.title}" (${isRealDiscount ? 'Real' : 'Fake'} Discount scenario)`);
  }

  console.log(`✨ Seeding finished! Total PriceHistory records injected: ${totalRecords}`);
}

main()
  .catch((e) => {
    console.error('❌ Injection script failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
