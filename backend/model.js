
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Planta = new Schema({
    name: String,
    date: Date,
    type: String,
    stages: [
        {stage: Number, date: Date, image: String, comment: String}
    ]
}, {toObject: {
    virtuals: true
    },
    toJSON: {
    virtuals: true 
    }});


module.exports = mongoose.model('Planta', Planta);