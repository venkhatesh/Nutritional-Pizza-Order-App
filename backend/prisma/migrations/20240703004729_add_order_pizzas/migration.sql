-- CreateTable
CREATE TABLE "Topping" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Topping_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pizza" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Pizza_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PizzaToppings" (
    "pizzaId" INTEGER NOT NULL,
    "toppingId" INTEGER NOT NULL,

    CONSTRAINT "PizzaToppings_pkey" PRIMARY KEY ("pizzaId","toppingId")
);

-- CreateTable
CREATE TABLE "OrderPizzas" (
    "orderId" INTEGER NOT NULL,
    "pizzaId" INTEGER NOT NULL,

    CONSTRAINT "OrderPizzas_pkey" PRIMARY KEY ("orderId","pizzaId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaToppings" ADD CONSTRAINT "PizzaToppings_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PizzaToppings" ADD CONSTRAINT "PizzaToppings_toppingId_fkey" FOREIGN KEY ("toppingId") REFERENCES "Topping"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderPizzas" ADD CONSTRAINT "OrderPizzas_pizzaId_fkey" FOREIGN KEY ("pizzaId") REFERENCES "Pizza"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
