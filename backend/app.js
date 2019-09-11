const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const Planta        = require('./model');

const PORT = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
  
mongoose.connect('mongodb://developer:dev@localhost/plantitas', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('Conectado a la BD...');
});

app.get('/', (req, res) =>{
    res.send('Holaa');
});

app.post('/add', (req, res) =>{
    console.log(req.body);
    const planta = new Planta({
        name: req.body.name,
        date: req.body.date,
        type: req.body.type
    });
    planta.save()
    .then(response =>{
        res.status(200).json({'planta': 'nueva planta registrada'});
    })
    .catch(err =>{
        res.status(400).send('Error al agregar una planta: ' + err + '\n');
    });
});

app.listen(PORT, () =>{
    console.log('Servidor backend listo...');
});
