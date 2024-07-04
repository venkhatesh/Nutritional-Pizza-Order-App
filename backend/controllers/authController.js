const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient')

console.log("Prisma Client in authController",prisma);

exports.register = async (req, res) => {
    try {
        const {name, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Creating user with prisma", prisma.user);
        const user = await prisma.user.create({
            data: {name, email, password: hashedPassword},
        });
        const token = jst.sign({userId:user.id}, JWT_SECRET, {expiresIn: '1h'} );
        res.cookie('token',token,{httpOnly: true});
        res.status(201).json({message: 'User registered successfully'});
    } catch (error){
        console.error("Error during user registration", error); 
        res.status(500).json({error: error.message});
    }
};

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await prisma.user.findUnique({where: {email}});
        if(!user){
            return res.status(404).json({message: 'User not found'});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: 'Invalid Password'});
        }
        const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });
        res.cookie('token',token, { httpOnly: true});
        res.cookie('userId',user.id);
        res.status(200).json({token,userId:user.id});
    } catch (error){
        res.status(500).json({error: error.message});
    }
};