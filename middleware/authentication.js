const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { createCustomError } = require('../errors/customApiErrors')

const auth = async(req,res,next) => {
    const authHeader = req.headers.authorization;
    // console.log(req.headers);
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return next(createCustomError('Unauthenticated no bearer',403));
    }
    const token = authHeader.split(' ')[1];
    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET);
        req.user = { userId: payload.userID, name: payload.name };
        next();
    } catch (error) {
        return next(createCustomError('authentication invalid no jwt valid',403));
    }
}

module.exports = auth;