const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

let customerSchema = mongoose.Schema({
    _id:{
        type: mongoose.Schema.ObjectId,
        default: () => { return new mongoose.Types.ObjectId()}
    },
    email: String,
    password: String,
});

customerSchema.pre('save',function(next){
    let hashedPassword = bcrypt.hashSync(this.password,saltRounds);
    this.password = hashedPassword;
    next();
})

module.exports = mongoose.model('Customer', customerSchema);