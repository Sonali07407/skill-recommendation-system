const mongoose = require('mongoose');
require('dotenv').config();

console.log('STARTING DB TEST');
const uri = process.env.MONGO_URI;
console.log('URI Length:', uri ? uri.length : 'undefined');

mongoose.connect(uri)
    .then(() => {
        console.log('CONNECTED TO DB');
        process.exit(0);
    })
    .catch(err => {
        console.error('CONNECTION ERROR:', err.message);
        process.exit(1);
    });
