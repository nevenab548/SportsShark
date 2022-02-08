const express = require('express');
const morgan = require('morgan');
var path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
const Order = require('./models/order')
const app = express();
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var cors = require('cors');

//connect to mnogodb
const dbURI = 'mongodb+srv://thesharks:password123!@cluster0.bufn0.mongodb.net/SportsShark?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then((result) => app.listen(3000))
    .catch((err) => console.log(err));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json({ type: '*/*' }));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/dodaj-proizvod', (req, res) => {

    const productRequest = req.body;

    const proizvod = new Product({
        type: productRequest.type,
        title: productRequest.title,
        description: productRequest.description,
        price: productRequest.price
    });
    proizvod.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/dodaj-korisnika', (req, res) => {

    const userRequest = req.body;

    const user = new User({
        type: userRequest.type,
        userName: userRequest.userName,
        password: userRequest.password,
        email: userRequest.email,
        firstName: userRequest.firstName,
        lastName: userRequest.lastName,
        adress: userRequest.adress,
        country: userRequest.country,
        city: userRequest.city
    });
    user.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            res.send(err);
        })
})

app.get('/svi-korisnici', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.get('/svi-proizvodi', (req, res) => {
    Product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/napravi-order', (req, res) => {
    const productArrayRequest = req.body.products;
    const priceTotal = req.body.priceTotal;
    //Products je niz id-eva za product, pa se to posle za svaki posebno pribavlja
    const order = new Order({
        products: productArrayRequest,
        priceTotal: priceTotal
    })
    order.save()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/pribavi-order', (req, res) => {
    orderId = req.body.orderId;
    Order.findOne({ "_id": orderId })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/kategorija-proizvoda', (req, res) => {
    const kategorijaRequest = req.body.category;

    Product.find({ "type": kategorijaRequest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/obrisi-korisnika', (req, res) => {
    const userNameRequest = req.body.userName;

    User.deleteOne({ "userName": userNameRequest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

app.post('/obrisi-proizvod', (req, res) => {
    const titleRequest = req.body.title;

    Product.deleteOne({ "title": titleRequest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//middlewear
app.use(express.static('public'));
app.use(morgan('dev'));
