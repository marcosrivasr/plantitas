
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Planta = new Schema({
    name: String,
    date: Date,
    type: String,
    stages: [
        {stage: Number, date: Date, image: String, comment: String}
    ],
    water_turn_on: Boolean,
    irrigation: [
        {start_date: Date, days: Number, days_checked: Number, status: String}
    ]
}, {toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true 
    }});


module.exports = mongoose.model('Planta', Planta);