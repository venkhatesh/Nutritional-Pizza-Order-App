const prisma = require('../prismaClient')


//add new toppings controller
exports.addTopping = async (req, res) => {
    try {
        const {name} = req.body;
        const topping = await prisma.topping.create({
            data: {name},
        });
        res.status(201).json({message: 'Topping added successfully', topping});
    } catch (error) {
        res.status(500).json({error : error.message});
    }
};

//get all toppings controller
exports.getToppings = async (req, res) => {
    try {
        const toppings = await prisma.topping.findMany();
        res.status(200).json(toppings);
    } catch (error){
        res.status(500).json({error : error.message});
    }
};