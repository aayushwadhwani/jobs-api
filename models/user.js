const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Please Provide Name']
    },
    email: {
        type: String,
        minlength: 3,
        maxlength: 50,
        required: [true, 'Please Provide Email'],
        match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/
    ,'Please provide valid email'],
        unique: true
    },
    password: {
        type: String,
        minlength: 3,
        required: [true, 'Please provide password']
    },
});

userSchema.pre('save', async function(next){
    const salt = await bycrypt.genSalt(10);
    this.password = await bycrypt.hash(this.password, salt);
    next(); 
});

userSchema.methods.createjwt = function() {
    return jwt.sign({userID: this._id, name: this.name},process.env.JWT_SECRET,{ expiresIn: process.env.JWT_LIFETIME });
}

userSchema.methods.comparePassword = async function(candidatePassword) {
    const isMAtch = await bycrypt.compare(candidatePassword,this.password);
    return isMAtch;
}

module.exports = mongoose.model('user',userSchema);