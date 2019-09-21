const express       = require('express');
const bodyParser    = require('body-parser');
const cors          = require('cors');
const mongoose      = require('mongoose');
const Planta        = require('./model');
const formidable    = require('formidable');
const colors        = require('colors')

const indexRouter = require('./routes/indexRouter');
const addRouter = require('./routes/addRouter');
const getRouter = require('./routes/getRouter');


const PORT = 3001;

const app = express();

app.use(cors());
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('./uploads/'));
  
mongoose.connect('mongodb://developer:dev@localhost/plantitas', {useNewUrlParser: true, useUnifiedTopology: true});
const connection = mongoose.connection;

connection.once('open', () =>{
    console.log('Conectado a la BD...');
});
connection.on('error', (err) =>{
    console.error(err.red);
    throw err;
});

app.get('/', indexRouter);
app.post('/add', addRouter);
app.get('/get', getRouter);

app.get('/get/:id', (req, res) =>{
    const id = req.params.id;
    Planta.findById(id, (err, planta) =>{
        if(err){
            console.error(err);
            throw err;
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
    console.log('OPERATION: add stage'.cyan);
    let id = '';
    let _stage = '';
    let _date = '';
    let _comment = '';
    let _imageUrl = '';

    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) =>{
        console.log('Fields:', fields);
        if(err){
            console.log(`form.parse: ${err}`.red);
        }

        id = fields.id;
        _stage = fields.stage;
        _date = fields.date;
        _comment = fields.comment;

        Planta.findOneAndUpdate(
            {_id: id},
            {$push: {stages: {stage: _stage, date: _date, comment: _comment, image: _imageUrl}}},
            (err, success) =>{
                if(err) console.log(err.red);
                console.log(success);
            }
        );
    })
    .on('fileBegin', (name, file) =>{
        file.path = __dirname + '/uploads/' + file.name;
        _imageUrl = file.name;
    });

});

app.listen(PORT, () =>{
    console.log('Servidor backend listo...');
});
