const PlantaModel = require('../model');

const getByIdRouter = (req, res) =>{
    const id = req.params.id;
    PlantaModel.findById(id, (err, planta) =>{
        if(err){
            console.error(err);
            throw err;
        }else{
            res.status(200).json(planta);     
        }
    });
}

module.exports = getByIdRouter;