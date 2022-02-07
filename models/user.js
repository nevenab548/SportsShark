const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    type: {//Basic ili admin
        type: String,
        required: true
    },//Naziv proizvoda
    userName: {
        type: String,
        required: true
    },//Opis proizvoda
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    adress: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;