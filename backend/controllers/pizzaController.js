const prisma = require('../prismaClient')


//add new pizza controller
// exports.addPizza = async (req, res) => {
//     try {
//         const {name, toppings} = req.body;
//         const pizza = await prisma.pizza.create({
//             data: {
//                 name,
//                 toppings: {
//                     create: toppings.map(toppingId => ({ toppingId })),
//                 },
//             },
//         });
//         res.status(201).json({message: 'Pizza added Successfully',pizza});
//     } catch (error) {
//         res.status(500).json({error: error.message});
//     }
// };
    exports.addPizza = async (req, res) => {
    try {
      const { name, toppings } = req.body;
      const pizza = await prisma.pizza.create({
        data: {
          name,
          toppings: {
            create: toppings.map(toppingId => ({
              topping: { connect: { id: toppingId } }
            })),
          },
        },
        include: {
          toppings: {
            include: {
              topping: true,
            },
          },
        },
      });
      res.status(201).json({ message: 'Pizza added successfully', pizza });
    } catch (error) {
      res.status(500).json({ error: error.message });
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

exports.getPizzaById = async (req,res) => {
    try{
        const { id } = req.params;
        const pizza = await prisma.pizza.findUnique({
            where: {id: parseInt(id, 10)},
            include: {
                toppings: {
                    include: {
                        topping: true,
                    },
                },
            },
        });
        if(!pizza){
            return res.status(404).json({message: 'Pizza not found'});
        }
        res.status(200).json(pizza);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};