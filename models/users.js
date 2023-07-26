const mongoose = require('mongoose');

const sellerSchema = mongoose.Schema({
    fullName : String,
    address : String,
    email : String,
    password : String,
    age : Number,
    mobile : Number
})

const sellerModel = mongoose.model('seller', sellerSchema)

module.exports = sellerModel