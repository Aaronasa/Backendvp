import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  // Buat roles (admin dan user)
  await prisma.role.createMany({
    data: [
      { id: 1, name: 'admin' },
      { id: 2, name: 'user' },
    ],
    skipDuplicates: true, // Menghindari error jika role sudah ada
  });

  // Enkripsi password admin
  const hashedPassword = await bcrypt.hash('adminpassword', 10);

  // Tambahkan pengguna admin
  await prisma.user.create({
    data: {
      username: 'admin',
      email: 'admin@gmail.com',
      password: hashedPassword,
      roleId: 1,
    },
  });

  console.log('Seeding untuk admin user selesai.');
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
