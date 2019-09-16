import React from 'react';
import Stage from './Stage';
import DateFormat from './DateFormat';
import DaysBetween from './DaysBetween';

import placeholder from '../planta.jpg';

class DetallePlanta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            date: '',
            type: '',
            stages: [],
            new_stage: 0,
            new_date: ''
        };
    }

    componentDidMount(){
        fetch('http://localhost:3001/get/' + this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                id: this.props.match.params.id,
                name: data.name,
                date: data.date,
                type: data.type,
                stages: data.stages
            });
        })
        .catch(err => console.error(err));
    }

    onClick = () =>{
        const stage = this.state.new_stage;
        const date = this.state.new_date;
        const stages = [...this.state.stages];
        const newObject = {stage: stage, date: date};
        stages.push(newObject);

        fetch('http://localhost:3001/add-stage', {
            method: 'post', 
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({id: this.state.id, stage: stage, date: date})
        })
        .then(res => res.text())
        .then(data => console.log(data));
        
        this.setState({stages: stages});
        
    }

    handleChange = (e) =>{
        this.setState({
                [e.target.name]: e.target.value
        });
    }

    

    render(){
        return(
            <div className="main-container detalle-container">
                <div id='detalle-left-container'>
                    <h1>{this.state.name}</h1>
                    <img src={placeholder} width="300" />
                </div>
                <div id="detalle-right-container">
                    <div id="stages-container">
                    {
                        this.state.stages.map(item =>
                            <ul key={item.stage + item.date + (Math.random()*100)}>
                                <li><Stage stage={item.stage} /></li>
                                <li><DateFormat date={item.date} /> (<DaysBetween startDate={new Date(item.date)} endDate={new Date()} /> días)</li>
                            </ul>
                        )
                    }
                    </div>
                    <div>
                        Añadir nueva etapa: <br/>
                        <select name="new_stage" onChange={this.handleChange}>
                            <option value="0">Semilla</option>
                            <option value="1">Germinación</option>
                            <option value="2">Maceta</option>
                            <option value="3">Tierra</option>
                            <option value="4">Hojas verdaderas</option>
                        </select>
                        <input type="date" name="new_date" onChange={this.handleChange} />
                        <input type="file"/>
                        <textarea />

                        <button onClick={this.onClick}>Añadir</button>
                    </div>
                </div>
                

            </div>
        );
    }
}

export default DetallePlanta;