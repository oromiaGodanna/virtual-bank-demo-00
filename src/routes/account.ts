export {};

const {Account, validateAccount} = require('../models/account');
const express = require('express');
const router = express.Router();


router.post('/createAccount', async (req, res) => {

    //validate the request 
    console.log(req.body)
    const { error } = validateAccount(req.body); 
    if (error) return res.status(400).send(error.details[0].message);


    let account;
    account = new Account({ 
        userId: req.body.userId,
        accountNo: req.body.accountNo,
        balance: req.body.balance,
    });
        account = await account.save();
        

    res.send(account);

});

router.put('/deposit/:id',  async (req, res) =>{
    //find order for the given id and update status
    console.log(req.body.depositAmount);
    const account = await Account.findOneAndUpdate({userId: req.params.id}, 
        {$inc: {balance:  req.body.depositAmount}}, 
        {new: true});
    if (!account) return res.status(404).send('No account found for the given user Id.');

    res.send(account);
})
router.get('/getAccount/:id',  async (req, res) => {
    //find account
    const account = await Account.find({userId: req.params.id});
    if (!account) return res.status(404).send('No account found for the given Id.');

    res.send({account});


});

//Delete user
// router.delete()

module.exports = router; 