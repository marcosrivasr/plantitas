import React from 'react';
import ConfigStage from './ConfigStage';
import Configuration from '../config';
import StageHistory from './StageHistory';

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
            stages: []
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

    compare(a, b){
        const date1 = new Date(a.date).getTime();
        const date2 = new Date(b.date).getTime();
        let comparison = 0;

        if(date1 > date2){
            comparison = -1;
            console.log('a');
        }else if(date1 < date2){
            comparison = 1;
            console.log('b');
        }
        return comparison;
    }

    onAddStage = (data) =>{
        const stages = [...this.state.stages];
        stages.push(data);
        this.setState({stages: [...stages]});
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

                        <ConfigStage 
                            itemId={this.props.match.params.id} 
                            onAddStage={this.onAddStage} />
                        
                        <div id="stages-container">
                            {
                                this.state.stages.sort(this.compare)
                                .map(item =>
                                    <StageHistory 
                                        key={item.stage + item.date + (Math.random()*100)} 
                                        data={item} />
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