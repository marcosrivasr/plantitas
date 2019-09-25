const PlantaModel = require('../model');

const addWaterRouter = (req, res) =>{
    const id = req.body.id;
    const days = req.body.days;
    const startDate = req.body.start_date;

    /*
    PlantaModel.updateOne(
        {'irrigation._id': taskId},
        {$set: {
            'irrigation.$.days_checked': days,
            'irrigation.$.status': status
        }},
        (err, res) =>{
            if(err) console.error(err.message);

            console.log(res);

            createNewTask(id, period, req, res);
        }
    );
    */

   PlantaModel.findOneAndUpdate(
        {_id: id},
        {
            $push: {irrigation: {start_date: startDate, days: days, days_checked: 0, status: 'in progress'}},
            water_turn_on: true
        }, 
        {new: true},
        (err, success) =>{
            if(err) console.log(err.red);
            console.log('Riego actualizado', '****************');
            console.log(success);
            res.status(200).json({response: 'success', data: success.irrigation});
        }
    );
}

module.exports = addWaterRouter;