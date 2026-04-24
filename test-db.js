// ✅ DATABASE CONNECTION TEST
// Run this to verify database is working

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function testDB() {
  try {
    console.log('🔄 Connecting to database...');
    await prisma.$connect();
    console.log('✅ Database connected successfully!');
    
    // Test query
    const users = await prisma.user.findMany();
    console.log(`✅ Found ${users.length} users in database`);
    
    // Test destinations
    const destinations = await prisma.destination.findMany();
    console.log(`✅ Found ${destinations.length} destinations in database`);
    
    await prisma.$disconnect();
    console.log('✅ Database test completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    console.error('💡 Check your server/.env DATABASE_URL');
    process.exit(1);
  }
}

testDB();