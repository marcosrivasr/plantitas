const PlantaModel = require('../model');

const deleteLastWaterItem = (id) =>{
    return new Promise((resolve, reject) =>{
        PlantaModel.updateOne(
            {_id: id},
            {$pull: {irrigation: {status: 'in progress'}}},
            (err, res) =>{
                if(err) reject(err);
                resolve({response: 'success', data: res});
            }
        );
    });
}

const turnOffWaterRouter = (req, response) =>{
    const id = req.body.id;

    PlantaModel.updateOne(
        {_id: id},
        {$set: {
            water_turn_on: false
        }},
        async (err, res) =>{
            if(err) console.error(err.message);
            console.log(res);
            try{
                const result = await deleteLastWaterItem(id);
                response.status(200).json(result);
            }catch(error){
                console.error(error.message);
            }
        }
    );
}

module.exports = turnOffWaterRouter;