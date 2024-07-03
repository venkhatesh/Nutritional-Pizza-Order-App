const prisma = require('../prismaClient')


//add new pizza controller
exports.addPizza = async (req, res) => {
    try {
        const {name, toppings} = req.body;
        const pizza = await prisma.pizza.create({
            data: {
                name,
                toppings: {
                    create: toppings.map(toppingId => ({ toppingId })),
                },
            },
        });
        res.status(201).json({message: 'Pizza added Successfully',pizza});
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};

//get all pizzas controller 
exports.getPizzas = async (req, res) => {
    try {
        const pizzas = await prisma.pizza.findMany({
            include: {
                toppings: {
                    include: {
                        topping: true,
                    },
                },
            },
        });
        res.status(200).json(pizzas);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};