const formidable    = require('formidable');
const PlantaModel        = require('../model');
const crypto = require('crypto');

const createName = (name) =>{
    return crypto.createHash('sha256').update(new Date().toString() + name).digest('hex') + name;
 }

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
                }],
            water_turn_on: false
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
        const newName = createName(file.name);
        file.path = __dirname + '/../uploads/' + newName;
        object.imageUrl = newName;
    });;
}

module.exports = addRouter;