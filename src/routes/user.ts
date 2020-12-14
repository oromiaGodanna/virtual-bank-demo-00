export {};

const {User, validateUser} = require('../models/user');
const express = require('express');
const router = express.Router();


router.post('/createAccount', async (req, res) => {

    //validate the request 
    console.log(req.body)
    const { error } = validateUser(req.body); 
    if (error) return res.status(400).send(error.details[0].message);


    let user;
    user = new User({ 
        accountNo: Math.floor(Math.random() * 1000000000),
        companyName: req.body.companyName,
        userName: req.body.userName,
        email: req.body.email,
        address: req.body.address,
        password: req.body.password
    });
        user = await user.save();
        

    res.send(user);

});



router.get('/getUser/:id',  async (req, res) => {
    //find user
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send('No account for the given user Id.');

    res.send({user});


});

//Delete user
// router.delete()

module.exports = router;