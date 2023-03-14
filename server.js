const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const Player = require('./models/players.js')
const PlayerCollection = require('./models/schema.js')

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

mongoose.connect('mongodb://localhost:27017/lineup').then(() => {
    console.log('connected and ready to roll......')
});

app.get('/seed', (req, res) => {
    PlayerCollection.create(Player).then(() => {
        res.send(Player)
    });
});

app.get('/', (req, res) => {
    PlayerCollection.find({}).then((allPlayers) =>{
        res.render('index.ejs', {
            Player: allPlayers
        })
    });
});

app.get('/offense', (req, res) => {
    PlayerCollection.find({tag: "Offense"}).then((Offense) =>{
        res.render('index.ejs', {
            Player: Offense
        })
    });
});

app.get('/defense', (req, res) => {
    PlayerCollection.find({tag: "Defense"}).then((Defense) =>{
        res.render('index.ejs', {
            Player: Defense
        })
    });
});

app.listen(3000, () => {
    console.log('Im listening Boss man......')
});