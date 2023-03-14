const mongoose = require('mongoose')


const playerSchema = new mongoose.Schema({
    name: {type: String},
    position: {type: String},
    height: {typoe: String},
    tag: {type: String},
    ovr: {type: Number}
});

const PlayerCollection = mongoose.model('Player', playerSchema);

module.exports = PlayerCollection