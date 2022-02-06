const express=require('express');
const morgan=require('morgan');
const mongoose=require('mongoose');
const Proizvod=require('./models/proizvod');
const app=express();

//connect to mnogodb
const dbURI='mongodb+srv://thesharks:password123!@cluster0.bufn0.mongodb.net/SportsShark?retryWrites=true&w=majority';
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>app.listen(3000))
.catch((err)=>console.log(err));
//register view engine
app.set('view engine','ejs');

/*app.get('/',(req,res)=>
{
    res.render('index');
});*/
app.get('/about',(req,res)=>
{
     res.render('about');
});
app.get('/dodajProizvod',(req,res)=>
{
     res.render('dodajProizvod');
});

app.get('/dodajProizvod',(req,res)=>
{
const proizvod=new Proizvod({
tip:'patike',
title:'nike',
opis:'lepe'
});
proizvod.save()
.then((result)=>{
    res.send(result)
})  
.catch((err)=>{
    console.log(err);
})
});

/*app.get('/sviProizvodi',(req,res)=>{
    Proizvod.find()
    .then((result)=>{
        res.render('index',{proizvodi:result})
    })
    .catch((err)=>{
        console.log(err);
    })
})*/


//ovo je nesto za middlewear pojma nemam
app.use(express.static('public'));
app.use(morgan('dev'));
