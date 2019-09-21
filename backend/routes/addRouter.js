const formidable    = require('formidable');
const PlantaModel        = require('../model');

const addRouter = (req, res) =>{
    const form = new formidable.IncomingForm();
    let object = {name:'', date:'', type:'', stage:'', imageUrl:''};

    form.parse(req, (err, fields, files) =>{
        if(err) throw err;


        object.name = fields.name;
        object.date = fields.date;
        object.type = fields.type;
        object.stage = fields.stage;

        const planta = new PlantaModel({
            name: object.name,
            date: object.date,
            type: object.type,
            stages: [{
                    stage: object.stage, 
                    date: object.date,
                    image: object.imageUrl
                }]
        });

        planta.save()
        .then(response =>{
            res.status(200).json({'planta': 'nueva planta registrada'});
        })
        .catch(err =>{
            res.status(400).send('Error al agregar una planta: ' + err + '\n');
        });
    })
    .on('fileBegin', (name, file) =>{
        file.path = require('path').resolve(__dirname, '..') + '/uploads/' + file.name;
        object.imageUrl = file.name;
    });;
}

module.exports = addRouter;