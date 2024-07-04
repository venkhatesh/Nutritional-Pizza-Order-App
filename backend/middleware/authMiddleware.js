const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET ;

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(!token){
        return res.status(401).json({error: 'Access denied. No token Provided.'});
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.userId = decoded.userId;
        next();
    } catch (error) {
        res.status(401).json({error: 'Invalid token.'});
    }
};

module.exports = authenticateToken;
