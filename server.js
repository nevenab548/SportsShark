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

//Dodaje se proizvod u products, request parametre kao u modelu
app.post('/dodaj-proizvod', (req, res) => {

    const productRequest = req.body;

    const proizvod = new Product({
        type: productRequest.type,
        title: productRequest.title,
        description: productRequest.description,
        price: productRequest.price,
        picture: productRequest.picture
    });
    proizvod.save()
        .then((result) => {
            res.send(result)
        })
        .catch((err) => {
            console.log(err);
        })
});

//Dodaje se korisnik u users, request parametre kao u modelu
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

app.post('/pribavi-korisnika', (req, res) => {
    let username = req.body.username;
    console.log("Uso u pribavljanje");
    User.findOne({ "userName": username })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Vraca sve korisnike iz users GET
app.get('/svi-korisnici', (req, res) => {
    User.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Vraca sve proizvode iz products GET
app.get('/svi-proizvodi', (req, res) => {
    Product.find()
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Kreira order, parametri za request kao u modelu, products je array id-eva od product-a,
//a priceTotal je zbirna cena svih proizvoda, i salje se userName od user-a, kako bi se update njegov niz od order-a
app.post('/napravi-order', (req, res) => {
    const userRequest = req.body.userName;
    const productArrayRequest = req.body.products;
    const priceTotal = req.body.priceTotal;
    //Products je niz id-eva za product, pa se to posle za svaki posebno pribavlja
    const order = new Order({
        products: productArrayRequest,
        priceTotal: priceTotal
    })
    order.save()
        .then((result) => {
            User.updateOne({ "userName": userRequest }, { $push: { "orders": result._id } })
                .then((resultUpdate) => {
                    res.send(result);
                })
                .catch((err) => {
                    console.log(err);
                })
        })
        .catch((err) => {
            console.log(err);
        })
})

//Korisnik ima niz id-eva od ordera, i na osnovu svakog u korisniku se pribavlja taj order,
//a za pribavljanje svakog producta za order, tek kad korisnik klikne na taj order kao da ga pregleda,
//to moze da stoji na profilu, da ne bi odma sve povlacila
app.post('/pribavi-order', (req, res) => {
    orderId = req.body.orderId;
    Order.findOne({ "id": orderId })
        .then((result) => {
            res.send({ status: 200, body: result });
        })
        .catch((err) => {
            console.log(err);
        })
})

//Pribavlja proizvode po kategoriji, posaljes koju kategoriju hoces kao parametar
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

//Brise korisnika na osnovu userName-a, to mozes na admin profilu da napravis
//da izlista sve korisnike, i na klik obrisi da se obrise, osim naravno taj profil sa kog se obrise, njega ne prikazuj
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

//Salje se title od product-a, i po njemu brises, jer je i on unique za product
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

//Ovde mora da se obrise i order u korisniku!!!!
app.post('/obrisi-order', (req, res) => {
    const orderIdRequest = req.body.orderId;

    Order.deleteOne({ "id": orderIdRequest })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Vraca product-e po cenama, true ide od najmanje, false od najvece
app.post('/products-po-cenama', (req, res) => {
    const orderRequest = req.body.order;

    Product.find().sort({ "price": orderRequest ? 1 : -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Prosledis mu kategoiriju i nacin na koji oce da ti sortira, i to ti vrati
app.post('/products-po-cenama-i-kategorija', (req, res) => {
    const orderRequest = req.body.order;
    const category = req.body.category;

    Product.find({ "type": category }).sort({ "price": orderRequest ? 1 : -1 })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Editovanje proizvode, posaljes mu vrednosti koje se edituju, ako nesto nije editovao posaljes mu isto
//i njegov id da zna da ga nadje, mogu se edituju samo title, description i price
app.post('/edit-product', (req, res) => {
    const productEdited = req.body;
    const productId = req.body.productId;

    Product.updateOne({ "id": productId }, { $set: { "title": productEdited.title, "description": productEdited.description, "price": productEdited.price } })
        .then((result) => {
            res.send(result);
        })
        .catch((err) => {
            console.log(err);
        })
})

//Moze da edituje sifru, adresu, zemlju i grad, i saljes username da moze da ga nadje
app.post('/edit-user', (req, res) => {
    const userName = req.body.userName;
    const userEdited = req.body;

    User.updateOne({ "userName": userName }, { $set: { "password": userEdited.password, "adress": userEdited.adress, "country": userEdited.country, "city": userEdited.city } })
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
