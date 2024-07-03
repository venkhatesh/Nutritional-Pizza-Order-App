const prisma = require('../prismaClient');

//create new order controller
exports.createOrder = async (req, res) => {
    try {
        const { userId, pizzas } = req.body;
        console.log("Received data:", { userId, pizzas });

        // Validate userId
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) {
            console.error(`User with id ${userId} not found`);
            return res.status(400).json({ error: "Invalid userId" });
        }

        // Validate pizzaIds
        const uniquePizzaIds = [...new Set(pizzas)];
        for (let pizzaId of uniquePizzaIds) {
            const pizza = await prisma.pizza.findUnique({ where: { id: pizzaId } });
            if (!pizza) {
                console.error(`Pizza with id ${pizzaId} not found`);
                return res.status(400).json({ error: `Invalid pizzaId: ${pizzaId}` });
            }
        }

        // Creating order
        const orderData = {
            userId,
            pizzas: {
                create: uniquePizzaIds.map(pizzaId => ({ pizzaId })),
            },
        };
        console.log("Order data to be inserted:", orderData);

        const order = await prisma.order.create({
            data: orderData,
            include: {
                pizzas: {
                    include: {
                        pizza: {
                            include: {
                                toppings: {
                                    include: {
                                        topping: true,
                                    },
                                },
                            },
                        },
                    },
                },
                user: true,
            },
        });

        res.status(201).json({ message: 'Order created successfully', order });
    } catch (error) {
        console.error("Error creating order:", error);
        res.status(500).json({ error: error.message });
    }
};

// get all orders controller
exports.getOrders = async (req, res) => {
    try {
        const orders = await prisma.order.findMany({
            include: {
                pizzas: {
                    include: {
                        pizza: {
                            include: {
                                toppings: {
                                    include: {
                                        topping: true,
                                    }
                                }
                            }
                        }
                    },
                },
                user: true,
            },
        });
        res.status(200).json(orders);
    } catch (error){
        res.status(500).json({error: error.message});
    }
};
