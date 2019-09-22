const PlantaModel = require('../model');

const addWaterRouter = (req, res) =>{
    const id = req.body.id;
    const days = req.body.days;
    const startDate = req.body.start_date;


    PlantaModel.findOneAndUpdate(
        {_id: id},
        {
            $push: {irrigation: {start_date: startDate, days: days, days_checked: 0, status: 'in progress'}},
            water_turn_on: true
        },
        (err, success) =>{
            if(err) console.log(err.red);
            console.log('Riego actualizado', '****************');
            res.status(200).json({response: 'success'});
        }
    );
}

module.exports = addWaterRouter;