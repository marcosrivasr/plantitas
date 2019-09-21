import React from 'react';
import Stage from './Stage';
import DateFormat from './DateFormat';
import DaysBetween from './DaysBetween';
import ConfigStage from './ConfigStage';
import Configuration from '../config';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import Button from 'react-bootstrap/Button';

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
        fetch(Configuration.url + '/get/' + this.props.match.params.id)
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
                    <img src={placeholder} width="100%" />
                </div>
                <div id="detalle-right-container">
                <Tabs defaultActiveKey="stages" id="uncontrolled-tab-example">
                    <Tab eventKey="stages" title="Etapas">
                        <ConfigStage itemId={this.props.match.params.id} />
                        
                        <div id="stages-container">
                            {
                                this.state.stages.map(item =>
                                    <ul key={item.stage + item.date + (Math.random()*100)}>
                                        <li><Stage stage={item.stage} /></li>
                                        <li><DateFormat date={item.date} /> (<DaysBetween startDate={new Date(item.date)} endDate={new Date()} /> días)</li>
                                        <div>{item.comment}</div>
                                        <div>{(item.image) ? <img src={Configuration.url + '/' + item.image} width="100%" /> : '' }</div>
                                    </ul>
                                )
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="water" title="Riego">
                    <div className="timeline">
                        <div className="container left">
                            <div className="content">
                            <h2>2017sss</h2>
                            <p>Lorem ipsum..</p>
                            </div>
                        </div>
                        <div className="container">
                            <div className="content">
                            <h2>2016</h2>
                            <p>Lorem ipsum..</p>
                            </div>
                        </div>
                    </div>
                    </Tab>
                </Tabs>
                    
                </div>
            </div>
        );
    }
}

export default DetallePlanta;