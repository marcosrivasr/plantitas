const formidable    = require('formidable');
const PlantaModel        = require('../model');
const crypto = require('crypto');

const createName = (name) =>{
   return crypto.createHash('sha256').update(new Date().toString() + name).digest('hex') + name;
}


const addStageRouter = (req, res) =>{
    let id = '', _stage = '', _date = '', _comment = '', _imageUrl = '';

    const form = new formidable.IncomingForm();
 
    form.parse(req, (err, fields, files) =>{
        console.log('Fields:', fields);
        console.log('files:', files);
        if(err){
            console.log(`form.parse: ${err}`.red);
        }

        id = fields.id;
        _stage = fields.stage;
        _date = fields.date;
        _comment = fields.comment;

        PlantaModel.findOneAndUpdate(
            {_id: id},
            {$push: {stages: {stage: _stage, date: _date, comment: _comment, image: _imageUrl}}},
            (err, success) =>{
                if(err) console.log(err.red);
                console.log('Planta actualizada', '****************');
                res.status(200).json({image_name: _imageUrl});
            }
        );
    })
    .on('fileBegin', (name, file) =>{
        const newName = createName(file.name);
        file.path = __dirname + '/../uploads/' + newName;
        _imageUrl = newName;
    });
}

module.exports = addStageRouter;