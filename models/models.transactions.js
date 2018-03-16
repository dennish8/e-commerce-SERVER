import { Mongoose } from 'mongoose';

const mongoose = require('mongoose');

module.exports = mongoose.model('transactions', mongoose.Schema({
    _id:{type: mongoose.Schema.ObjectId, default: () => { return new mongoose.Types}},
    customerId:{type: mongoose.Schema.Types.ObjectId, ref:'Customer'},
    itemId:[{type: mongoose.Schema.Types.ObjectId, ref:'Item'}]
}));