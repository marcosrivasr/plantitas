const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const Planta        = require('./model');
const formidable    = require('formidable')


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
    const form = new formidable.IncomingForm();
    let _name = '';
    let _date = '';
    let _type = '';
    let _stage = '';
    let _imageUrl = '';

    console.log(req.body);

    form.parse(req)
    .on('fileBegin', (name, file) =>{
        file.path = __dirname + '/uploads/' + file.name;
        _imageUrl = file.name;
    });

    form.parse(req, (err, fields, files) =>{
        if(err) throw err;

        _name = fields.name;
        _date = fields.date;
        _type = fields.type;
        _stage = fields.stage;

        const planta = new Planta({
            name: _name,
            date: _date,
            type: _type,
            stages: [{
                    stage: _stage, 
                    date: _date,
                    image: _imageUrl
                }]
        });

        planta.save()
        .then(response =>{
            res.status(200).json({'planta': 'nueva planta registrada'});
        })
        .catch(err =>{
            res.status(400).send('Error al agregar una planta: ' + err + '\n');
        });
    });
    
    /*
    const planta = new Planta({
        name: req.body.name,
        date: req.body.date,
        type: req.body.type,
        stages: [{
                stage: req.body.stage, 
                date: req.body.date,
                //image: name
            }]
    });
    planta.save()
    .then(response =>{
        res.status(200).json({'planta': 'nueva planta registrada'});
    })
    .catch(err =>{
        res.status(400).send('Error al agregar una planta: ' + err + '\n');
    });
    */
    
});

app.get('/get', (req, res) =>{
    Planta.find({}, {__v: 0},(err, plantas) =>{
        if(err){
            console.error(err);
        }else{
            console.log(plantas);
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
    /*
    const id = req.body.id;
    const stage = req.body.stage;
    const date = req.body.date;
    */
   let id = '';
   let _stage = '';
   let _date = '';
   let _imageUrl = '';

    const form = new formidable.IncomingForm();

    form.parse(req)
    .on('fileBegin', (name, file) =>{
        file.path = __dirname + '/uploads/' + file.name;
        _imageUrl = file.name;
    });

    form.parse(req, (err, fields, files) =>{
        if(err) throw err;

        id = fields.id;
        _stage = fields.stage;
        _date = fields.date;
    });

    Planta.findOneAndUpdate(
        {_id: id},
        {$push: {stages: {stage: _stage, date: _date}}},
        (err, success) =>{
            if(err) throw err;

            console.log(success);
        }
    );

});

app.listen(PORT, () =>{
    console.log('Servidor backend listo...');
});
