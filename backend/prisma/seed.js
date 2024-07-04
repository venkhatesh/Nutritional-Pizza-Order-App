const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  // add some toppings
  const topping1 = await prisma.topping.create({
    data: { name: 'Pepperoni' },
  });

  const topping2 = await prisma.topping.create({
    data: { name: 'Mushrooms' },
  });

  const topping3 = await prisma.topping.create({
    data: { name: 'Onions' },
  });

  // add some pizzas
  const pizza1 = await prisma.pizza.create({
    data: {
      name: 'Pepperoni Pizza',
      toppings: {
        create: [
          { toppingId: topping1.id },
        ],
      },
    },
  });

  const pizza2 = await prisma.pizza.create({
    data: {
      name: 'Mushroom Pizza',
      toppings: {
        create: [
          { toppingId: topping2.id },
        ],
      },
    },
  });

  const pizza3 = await prisma.pizza.create({
    data: {
      name: 'Supreme Pizza',
      toppings: {
        create: [
          { toppingId: topping1.id },
          { toppingId: topping2.id },
          { toppingId: topping3.id },
        ],
      },
    },
  });

  console.log({ pizza1, pizza2, pizza3 });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
