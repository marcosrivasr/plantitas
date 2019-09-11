
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Planta = new Schema({
    name: String,
    date: Date,
    type: String
});

module.exports = mongoose.model('Planta', Planta);