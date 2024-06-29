import { PrismaClient } from '@prisma/client';
import dotenv from 'dotenv';

dotenv.config();

const prisma = new PrismaClient();

async function main() {
  // Seed Product data
  const product1 = await prisma.product.create({
    data: {
      email: 'product1@example.com',
      name: 'Product 1'
    }
  });

  const product2 = await prisma.product.create({
    data: {
      email: 'product2@example.com',
      name: 'Product 2'
    }
  });

  console.log({ product1, product2 });

  // Seed Client data
  const client1 = await prisma.client.create({
    data: {
      name: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      address: '123 Main St',
      creditCardNumber: '4111111111111111',
      cvv: '123',
      expirationDate: '12/24',
      dateOfBirth: new Date('1990-01-01'),
      parish: 'Parish 1',
      town: 'Town 1'
    }
  });

  const client2 = await prisma.client.create({
    data: {
      name: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      address: '456 Elm St',
      creditCardNumber: '4222222222222222',
      cvv: '456',
      expirationDate: '11/23',
      dateOfBirth: new Date('1985-05-15'),
      parish: 'Parish 2',
      town: 'Town 2'
    }
  });

  console.log({ client1, client2 });
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
