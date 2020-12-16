export {};
const mongoose = require('mongoose');
const Joi = require('joi');

mongoose.set('useFindAndModify', false);

3
















const Account = mongoose.model('Account', new mongoose.Schema({
    
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    accountNo: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
    },
    openedDate: {
        type : Date, 
        default: Date.now,
        required: true,
        
    }
}))

function validateAccount(account){
    const schema = Joi.object({
        userId: Joi.objectId().required(),
        accountNo: Joi.string().required(),
        balance: Joi.number().required(),
        openedDate: Joi.date().timestamp()
        
    });

    return schema.validate(account);
}

exports.Account = Account;
exports.validateAccount = validateAccount;