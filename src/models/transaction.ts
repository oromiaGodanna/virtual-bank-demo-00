import { time, timeStamp } from "console";

export {};
const mongoose = require('mongoose');
const Joi = require('joi');

const transactionType = ['transfer', 'onHold'];

const Transaction = mongoose.model('Transaction', new mongoose.Schema({
    
    transactionId: {
        type: String,
        required: true,
    },
    fromAccNo: {
        type: String,
        required: true,
    },
    toAccNo: {
        type: String,
        required: true,
    },
    transactionAmount: {
        type: Number,
        required: true,
    },
    transactionType: {
        type: String,
        required: true,
        Enum: transactionType
    },
    transactionDateTime: {
        type : Date, 
        default: Date.now,
        required: true,
    },
    description: {
        type: String,
        required: true,
    }
}))

function validateTransaction(transaction){
    const schema = Joi.object({
        transactionId: Joi.string(),
        fromAccNo: Joi.string().required(),
        toAccNo: Joi.string().required(),
        transactionAmount: Joi.number().required(),
        transactionType: Joi.string().valid(...transactionType).required(),
        transactionDateTime: Joi.date().timestamp(),
        description: Joi.string().required()
        
    });

    return schema.validate(transaction);
}

exports.Transaction = Transaction;
exports.validateTransaction = validateTransaction;