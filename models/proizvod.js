const mongoose = require('mongoose');
const Schema =mongoose.Schema;

const proizvodSchema=new Schema({
    tip: {
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    opis:{
        type:String,
        required:true
    },
},{timestamps:true});

const Proizvod = mongoose.model('Proizvod',proizvodSchema);
module.exports=Proizvod;