const mongoose = require('mongoose');
const Product = require('./product')
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    products: {
        type: [String],
        required: true
    },
    priceTotal: {
        type: Number,
        required: true
    }
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;