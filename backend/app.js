const bodyParser = require('body-parser'); //allow to extract the JSON object from the req
const express = require('express');
const mongoose = require('mongoose');

const userRoutes = require('./routes/user');

//Connection to MongoDB
mongoose.connect('mongodb+srv://bilelsgh:eiebcUUe36mGkYzf@ocrtuto.gxkxa.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//avoid CORS error
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

app.use(bodyParser.json());

//For this route, we use the ones of userRoutes
app.use('/api/auth', userRoutes);

module.exports = app;
