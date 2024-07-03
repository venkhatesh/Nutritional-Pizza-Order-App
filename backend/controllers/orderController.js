const prisma = require('../prismaClient');

//create new order controller
exports.createOrder = async (req, res) => {
    try {
        const {userId, pizzas } = req.body;
        const order = await prisma.order.create({
            data: {
                userId,
                pizzas: {
                    create: pizzas.map(pizzaId => ({ pizzaId })),
                },
            },
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
        res.status(201).json({ message : 'Order created successfully', order});
    } catch (error){
        res.status(500).json({error: error.message});
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
