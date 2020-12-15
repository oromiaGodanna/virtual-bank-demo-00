export {};

const {Transaction, validateTransaction} = require('../models/transaction');
const express = require('express');
const router = express.Router();


router.post('/createTransaction', async (req, res) => {

    //validate the request 
    console.log(req.body)
    const { error } = validateTransaction(req.body); 
    if (error) return res.status(400).send(error.details[0].message);


    let transaction;
    transaction = new Transaction({ 
        transactionId: Math.floor(Math.random() * 1000000000),
        fromAccNo: req.body.fromAccNo,
        toAccNo: req.body.toAccNo,
        transactionAmount: req.body.transactionAmount,
        transactionType: req.body.transactionType,
        transactionDateTime: req.body.transactionDateTime, 
        description: req.body.description
    });
        transaction = await transaction.save();
        

    res.send(transaction);

});



router.get('/getTransaction/:id',  async (req, res) => {
    //find transaction
    const transaction = await Transaction.findById(req.params.id);
    if (!transaction) return res.status(404).send('No transaction for the given Id.');

    res.send({transaction});


});

//Delete user
// router.delete()

module.exports = router; 