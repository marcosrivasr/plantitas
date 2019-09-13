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
        type: req.body.type,
        stages: [{stage: req.body.stage, date: req.body.date}]
    });
    planta.save()
    .then(response =>{
        res.status(200).json({'planta': 'nueva planta registrada'});
    })
    .catch(err =>{
        res.status(400).send('Error al agregar una planta: ' + err + '\n');
    });
    
});

app.get('/get', (req, res) =>{
    Planta.find({}, {__v: 0},(err, plantas) =>{
        if(err){
            console.error(err);
        }else{
            res.status(200).json(plantas);     
        }
    });
});

app.get('/get/:id', (req, res) =>{
    const id = req.params.id;
    Planta.findById(id, (err, planta) =>{
        if(err){
            console.error(err);
        }else{
            res.status(200).json(planta);     
        }
    });
});

app.get('/delete/:id', (req, res) =>{
    const id = req.params.id;
    console.log('Item a eliminar: '+ id);
    Planta.deleteOne({_id: id}, (err, response) =>{
        if(err) error(err);
        console.log(response);
        res.send('Elemento eliminado');
    });
});

app.post('/add-stage/', (req, res) =>{
    const id = req.body.id;
    const stage = req.body.stage;
    const date = req.body.date;

    Planta.findOneAndUpdate(
        {_id: id},
        {$push: {stages: {stage: stage, date: date}}},
        (err, success) =>{
            console.log(success);
        }
    );

});

app.listen(PORT, () =>{
    console.log('Servidor backend listo...');
});
