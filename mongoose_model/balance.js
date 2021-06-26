const mongoose = require('mongoose');

const balance = new mongoose.Schema({
    _id:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    balance:{
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Mongoose-Balance',balance);