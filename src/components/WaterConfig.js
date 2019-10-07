import React from 'react';
import Configuration from '../config';
import Button from 'react-bootstrap/Button';

class WaterConfig extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            days: 2,
            start_date: '',
            days_checked: 0
        };
    }

    onClick = (e) =>{
        const obj = {
            id: this.props.id,
            days: this.state.days,
            start_date: new Date()
        };
        fetch(Configuration.url + '/add-water',
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obj)
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === 'success'){
                this.props.onAddWater(data.data);
            }
        })
        .catch(err =>{
            console.error(err);
        });
    }

    onChange = (e) =>{
        this.setState({
            days: e.target.value
        });
    }

    onTurnOff = () =>{
        fetch(Configuration.url + '/turnoff-water', 
        {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({id: this.props.id})
        })
        .then(res => res.json())
        .then(data => {
            if(data.response === 'success'){
                this.props.onTurnOff();
                //this.setState({is_water});
            }
            
        })
        .catch(err =>console.error(err.message));
    }

    render(){
        return(
            (this.props.isWaterTurnedOn) 
            ? 
                <div id="water-config-collapsed-container">
                    Programación de riego en progreso <Button onClick={this.onTurnOff}>Apagar</Button>
                </div>
            : 
            <div id="water-config-container">
                <div>
                    <div>Periodicidad (en días) </div>
                    <input type="number" value={this.state.days} onChange={this.onChange} name="days" />
                </div>
                <div>
                    <Button onClick={this.onClick}>Añadir</Button>
                </div>
            </div>
        );
    }
}

export default WaterConfig;