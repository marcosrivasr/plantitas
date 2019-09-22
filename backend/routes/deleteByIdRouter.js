const PlantaModel = require('../model');

const deleteByIdRouter = (req, res) =>{
    const id = req.params.id;
    console.log('Item a eliminar: '+ id);
    PlantaModel.deleteOne({_id: id}, (err, response) =>{
        if(err) error(err);
        console.log(response);
        res.send('Elemento eliminado');
    });
}

module.exports = deleteByIdRouter;