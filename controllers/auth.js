// return next(createCustomError('Checking', 400));
const asyncWrapper = require('../middleware/asyncWrapper');
const jwt = require('jsonwebtoken');
const user = require('../models/user');
const { createCustomError } = require('../errors/customApiErrors');

const register = asyncWrapper( async(req,res,next) => {
    const { name,email,password } = req.body;
    const newUser = await user.create({name,email,password});
    res.status(201).json({success: true, token: newUser.createjwt()});
});

const login = asyncWrapper( async(req,res,next) => {
    const { email, password } = req.body;
    if(!email || !password) {
        return next(createCustomError('Please provide Email and Password',403));
    }

    const User = await user.findOne({email});
    if(!User) {
        return next(createCustomError('Invalid Credentials',401));
    }
    const isPasswordCorrect = await User.comparePassword(password);
    if(!isPasswordCorrect){
        return next(createCustomError('Invalid Password',401));
    }
    res.status(200).json({name: User.name, token: User.createjwt()});
});

module.exports  = {
    register,
    login
};