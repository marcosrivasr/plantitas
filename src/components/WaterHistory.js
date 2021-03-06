import React from 'react';
import Configuration from '../config';
import Button from 'react-bootstrap/Button'
import DateFormat from './DateFormat';
import DaysBetween from './DaysBetween';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faExclamation } from '@fortawesome/free-solid-svg-icons';
import Util from '../util';

class WaterHistory extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            days: 0
        };
    }

    renderButtons(){

    }

    componentDidMount(){
        const util = new Util();
        this.setState({days: util.daysBetween(new Date(this.props.data.start_date), new Date())});
    }

    

    onCompleteTask = () =>{
        //obtener id de la tarea
        const taskId = this.props.taskId;
        const id = this.props.id;
        const period = this.props.data.days;

        
        // cambiar estatus a completed
        fetch(Configuration.url + '/complete-water-task',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                id: id,
                taskid: taskId,
                days:this.state.days,
                period: period
            })
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === 'success'){
                console.log('yei!');
                this.props.onCompleteTask();
            }
        })
        .catch(err =>{
            console.error(err);
        });
        //crear una nueva tarea
    }

    renderInProgress(){
        return(
            (this.props.data.days < this.state.days) ?
            <div className="water-story-item active-late">
                <FontAwesomeIcon icon={faSync} className="icon-progress" size="2x"/>
                <div className="date">
                    Riego tardio desde hace {Math.abs(this.props.data.days - this.state.days)} días
                </div>
                        {(this.state.days >= this.props.data.days) ?
                            <Button onClick={this.onCompleteTask}>Completar</Button>
                        :
                        ''
                        }  
            </div>
            :
            <div className="water-story-item active">
                <FontAwesomeIcon icon={faSync} className="icon-progress" size="2x"/>
                <div className="date">
                    {(this.props.data.days - this.state.days > 0)?
                        `Próximo riego en ${this.props.data.days - this.state.days} días`
                        :
                        'Hoy te toca riego'
                    }
                    
                    </div>
                        {(this.state.days >= this.props.data.days) ?
                            <Button onClick={this.onCompleteTask}>Completar</Button>
                        :
                        ''
                        }  
            </div>
        );
    }

    renderCompleted(){
        return (
            (this.props.data.status === 'completed late')?
            <div className="water-story-item completed-late">
                <FontAwesomeIcon icon={faExclamation} className="icon-completed-late" size="2x"/>
                <div className="date">
                    Completado tarde hace <DaysBetween onDays={this.onChangeDaysBetween} startDate={new Date(this.props.data.start_date)} endDate={new Date()} /> días
    
                </div>
            </div>
            :
            <div className="water-story-item completed">
                <FontAwesomeIcon icon={faCheck} className="icon-completed" size="2x"/>
                <div className="date">
                    Completado hace <DaysBetween onDays={this.onChangeDaysBetween} startDate={new Date(this.props.data.start_date)} endDate={new Date()} /> días
                </div>
            </div>
        );
    }

    render(){
        return(
            (this.props.data.status === 'in progress') ?
                this.renderInProgress()
            :
                this.renderCompleted()
        );
    }
}

export default WaterHistory;