const mongoose = require('mongoose');

module.exports = mongoose.model('items', mongoose.Schema({
    _id:{
        type: mongoose.Schema.ObjectId,
        default: ()=> { return new mongoose.Types.ObjectId()}, 
    },
    image: String,
    type: String,
    tower: String,
    floor: String,
    lift: String,
    bed: Number,
    bath: Number,
    sqm: Number,
    price: Number,
    quantity: Number,
    totalPrice: Number,
}));