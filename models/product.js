const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    type: {//Patike, Majca, Sorts, Trenerka, Duks, Rekviziti...
        type: String,
        required: true
    },//Naziv proizvoda
    title: {
        type: String,
        required: true,
        unique: true
    },//Opis proizvoda
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    picture: {
        type: String,
        required: true
    }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema);
module.exports = Product;