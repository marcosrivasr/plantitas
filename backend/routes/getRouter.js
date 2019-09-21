const PlantaModel = require('../model');

const getRouter = (req, res) =>{
    PlantaModel.find({}, {__v: 0},(err, plantas) =>{
        if(err){
            console.error(err);
        }else{
            console.log(plantas);
            res.status(200).json(plantas);     
        }
    });
}

module.exports = getRouter;