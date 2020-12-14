export {};

const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const Fawn = require('fawn');;
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3030;

const user = require('./routes/user');
const account = require('./routes/account');
const transaction = require('./routes/transaction');

mongoose.connect('mongodb://localhost/virtualBank', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log('Connected to mongoDB...')})
  .catch( err => console.error('Could not connect to mongoDB....' + err));

  
Fawn.init(mongoose);

app.use(express.json());

app.user('/user', user);
app.user('/account', account);
app.user('/transaction', transaction);


app.listen(PORT, () => {
     console.log(`Server is running in http://localhost:${PORT}`)
});