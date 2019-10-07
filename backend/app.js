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
const getByIdRouter = require('./routes/getByIdRouter');
const deleteByIdRouter = require('./routes/deleteByIdRouter');
const addStageRouter = require('./routes/addStageRouter');
const addWaterRouter = require('./routes/addWaterRouter');
const completeWaterTaskRouter = require('./routes/completeWaterTaskRouter');
const turnOffWaterRouter = require('./routes/turnOffWaterRouter');


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
app.get('/get/:id', getByIdRouter);
app.get('/delete/:id', deleteByIdRouter);
app.post('/add-stage', addStageRouter);
app.post('/add-water', addWaterRouter);
app.post('/complete-water-task', completeWaterTaskRouter);
app.post('/turnoff-water', turnOffWaterRouter);
//add.get('/delete-stage/:id', deleteStagebyIdRouter);

app.listen(PORT, () =>{
    console.log('Servidor backend listo...');
});
