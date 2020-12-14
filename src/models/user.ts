export {};
const mongoose = require('mongoose');
const Joi = require('joi');

let address = new Object();

const User = mongoose.model('User', new mongoose.Schema({
    
    accountNo: {
        type: Number,
        required: true,
    },
    companyName: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        
    },
    address: String,
    password: String
}))

function validateUser(user){
    const schema = Joi.object({
        accountNo: Joi.string(),
        companyName: Joi.string().required(),
        userName: Joi.string().required(),
        email: Joi.string().required(),
        address: Joi.string().required(),
        password: Joi.string().required()
        
    });

    return schema.validate(user);
}

exports.User = User;
exports.validateUser = validateUser;