const PlantaModel = require('../model');

createNewTask = (id, period, req, res) =>{
    PlantaModel.findOneAndUpdate(
        {_id: id},
        {
            $push: {irrigation: {start_date: new Date(), days: period, days_checked: 0, status: 'in progress'}},
            water_turn_on: true
        },
        (err, success) =>{
            if(err) console.log(err.red);
            console.log('Riego actualizado', '****************');
        }
    );
}

const completeWaterTaskRouter = (req, res) =>{
    const id = req.body.id;
    const taskId = req.body.taskid;
    const days = req.body.days; //days to complete the task
    const period = req.body.period;

    console.log(id, taskId, days, period);

    const status = (days <= period)? 'completed': 'completed late';

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
}

module.exports = completeWaterTaskRouter;