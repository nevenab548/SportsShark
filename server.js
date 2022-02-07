const express = require('express');
const morgan = require('morgan');
var path = require('path');
const mongoose = require('mongoose');
const Product = require('./models/product');
const User = require('./models/user');
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

app.get('/dodajProizvod', (req, res) => {
    const proizvod = new Product({
        tip: 'majca',
        title: 'lacosta',
        opis: 'lepa'
    });
    proizvod.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

app.post('/dodajKorisnika', (req, res) => {

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
        .then((response) => {
            res.send(response)
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


//middlewear
app.use(express.static('public'));
app.use(morgan('dev'));
