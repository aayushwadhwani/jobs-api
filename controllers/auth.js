const asyncWrapper = require('../middleware/asyncWrapper')

const register = asyncWrapper( async(req,res,next) => {
    res.send('Register user');
});

const login = asyncWrapper( async(req,res,next) => {
    res.send('login user');
});

module.exports  = {
    register,
    login
};