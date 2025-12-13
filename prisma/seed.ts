import { PrismaClient, RentalStatus } from '@prisma/client';
import { faker } from '@faker-js/faker';

const prisma = new PrismaClient();

const CATEGORIES = ['Electronics', 'Tools', 'Camping', 'Fashion', 'Sports', 'Photography'];
const CONDITIONS = ['Like New', 'Good', 'Fair', 'Heavily Used'];

async function main() {
  console.log('--- Starting Seeder ---');

  // 1. Fetch Existing Users (REQUIRED)
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new Error('No Users found. Please create Users before running this seeder.');
  }
  console.log(`Found ${users.length} users. Proceeding with content generation.`);

  // 2. Seed Items
  console.log('Seeding Items...');
  const createdItems = [];

  for (let i = 0; i < 50; i++) {
    const owner = faker.helpers.arrayElement(users);

    const item = await prisma.item.create({
      data: {
        name: faker.commerce.productName(),
        rent_price: parseInt(faker.commerce.price({ min: 10000, max: 500000, dec: 0 })), // Int
        pickup_location: faker.location.city(),
        category: faker.helpers.arrayElement(CATEGORIES),
        description: faker.lorem.paragraph(),
        condition: faker.helpers.arrayElement(CONDITIONS),
        image_url: faker.image.urlLoremFlickr({ category: 'technics' }),
        available: faker.datatype.boolean(),
        item_amount: faker.number.int({ min: 1, max: 5 }),
        dailyCarbonSaving: faker.number.float({ min: 0.1, max: 5.0, fractionDigits: 2 }),
        dailyWasteReduction: faker.number.float({ min: 0.05, max: 2.0, fractionDigits: 2 }),
        owner_id: owner.id,
      },
    });
    createdItems.push(item);
  }

  // 3. Seed Rentals (with Nested SustainabilityImpact)
  console.log('Seeding Rentals...');
  for (let i = 0; i < 50; i++) {
    const item = faker.helpers.arrayElement(createdItems);
    const renter = faker.helpers.arrayElement(users);

    // Ensure Renter is not Owner (Optional logic, but recommended)
    if (renter.id === item.owner_id && users.length > 1) {
      i--; // Retry
      continue;
    }

    const startDate = faker.date.past();
    const finishedDate = faker.date.soon({ refDate: startDate, days: 10 });
    const status = faker.helpers.enumValue(RentalStatus);

    await prisma.rental.create({
      data: {
        item_id: item.id,
        user_id: renter.id,
        start_date: startDate,
        finished_date: finishedDate,
        // Assuming rent_amount is quantity or agreed cost, and paid_amount is actual payment
        rent_amount: faker.number.int({ min: 1, max: 3 }),
        paid_amount: parseInt(faker.commerce.price({ min: 50000, max: 1000000, dec: 0 })),
        status: status,
        // Create 1:1 SustainabilityImpact automatically
        sustainabilityImpact: {
          create: {
            carbon_savings: faker.number.float({ min: 1.0, max: 50.0, fractionDigits: 2 }),
            waste_reduction: faker.number.float({ min: 0.5, max: 20.0, fractionDigits: 2 }),
          }
        }
      },
    });
  }

  // 4. Seed Reviews
  console.log('Seeding Reviews...');
  for (let i = 0; i < 30; i++) {
    const item = faker.helpers.arrayElement(createdItems);
    const reviewer = faker.helpers.arrayElement(users);

    await prisma.review.create({
      data: {
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentence(),
        user_id: reviewer.id,
        item_id: item.id,
      },
    });
  }

  console.log('--- Seeding Completed ---');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });