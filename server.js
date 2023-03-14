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

app.get('/new', (req, res) => {
    res.render('new.ejs')
});

app.get('/:id', (req, res) => {
    PlayerCollection.findById(req.params.id).then((foundPlayer) => {
        res.render('show.ejs', {
            Player: foundPlayer
        });
    });
})

app.get('/:id/edit', (req, res) => {
    PlayerCollection.findById(req.params.id).then((foundPlayer) =>{
        res.render('edit.ejs', {
            Player: foundPlayer
        });
    });
});



//Action Routes
app.post('/', (req, res) => {
    PlayerCollection.create(req.body).then((createdPlayer) => {
        res.redirect('/')
    });
});

app.put('/:id', (req, res) => {
    PlayerCollection.findByIdAndUpdate(req.params.id, req.body).then(() => {
        res.redirect('/')
    });
});

app.delete('/:id', (req, res) => {
    PlayerCollection.findByIdAndRemove(req.params.id).then(() => {
        res.redirect('/')
    });
});

app.listen(3000, () => {
    console.log('Im listening Boss man......')
});