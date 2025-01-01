import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Insert roles
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ],
    skipDuplicates: true, // Hindari duplikasi jika seed dijalankan lagi
  });

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
