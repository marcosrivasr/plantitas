import React from 'react';
import ConfigStage from './ConfigStage';
import WaterConfig from './WaterConfig';
import Configuration from '../config';
import StageHistory from './StageHistory';
import WaterHistory from './WaterHistory';

import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

import Placeholder from '../planta.jpg';

class DetallePlanta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id: '',
            name: '',
            date: '',
            type: '',
            image: '',
            stages: [],
            water_turn_on: false,
            irrigation: []
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
                stages: [...data.stages],
                water_turn_on: data.water_turn_on,
                irrigation: [...data.irrigation]
            });
            // actualiza la url de la imagen
            this.setImage();
        })
        .catch(err => console.error(err));
    }

    

    handleChange = (e) =>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    compareStages(a, b){
        const date1 = new Date(a.date).getTime();
        const date2 = new Date(b.date).getTime();
        let comparison = 0;

        if(date1 > date2 || (date1 == date2)){
            comparison = -1;
        }else if((date1 < date2)) {
            comparison = 1;
        }
        return comparison;
    }
    compareWater(a, b){
        const date1 = new Date(a.start_date).getTime();
        const date2 = new Date(b.start_date).getTime();
        let comparison = 0;

        if(date1 > date2 || (date1 == date2)){
            comparison = -1;
        }else if((date1 < date2)) {
            comparison = 1;
        }
        return comparison;
    }

    onAddStage = (data) =>{
        const stages = [...this.state.stages];
        stages.push(data);
        this.setState({stages: [...stages]});
    }

    setImage(){
        const n = this.state.stages.length;
        const stage = this.state.stages[0];
        if(stage.image){
            //return stage.image;
            this.setState({image: stage.image});
        }
    }

    onAddWater = (obj) =>{
        /*
        key={item._id} 
        id={this.props.match.params.id}
        taskId={item._id}
        data={item} />
        */
        const items = [...this.state.irrigation];
        items.push(obj[obj.length - 1]);
        this.setState({irrigation: [...items], water_turn_on: true});
        
    }

    

    render(){
        return(
            <div className="main-container detalle-container">
                <div id='detalle-left-container'> 
                    <div className="image" style={{ backgroundImage: `url(${(this.state.image === '' ?  Placeholder : Configuration.url + '/' + this.state.image)})`}}></div>
                    <h1>{this.state.name}</h1>
                </div>
                <div id="detalle-right-container">
                <Tabs defaultActiveKey="stages" id="uncontrolled-tab-example">
                    <Tab eventKey="stages" title="Etapas">
                        <ConfigStage 
                            itemId={this.props.match.params.id} 
                            onAddStage={this.onAddStage} />
                        
                        <div id="stages-container">
                            {
                                this.state.stages.sort(this.compareStages)
                                .map(item =>
                                    <StageHistory 
                                        key={item.stage + item.date + (Math.random()*100)} 
                                        data={item} />
                                )
                            }
                        </div>
                    </Tab>
                    <Tab eventKey="water" title="Riego">
                        <WaterConfig 
                            id={this.props.match.params.id}
                            isWaterTurnedOn={this.state.water_turn_on}
                            onAddWater={this.onAddWater} />
                        <div>
                            {
                                this.state.irrigation.sort(this.compareWater)
                                .map(item =>
                                    <WaterHistory 
                                        key={item._id} 
                                        id={this.props.match.params.id}
                                        taskId={item._id}
                                        data={item} />
                                )
                            }
                        </div>
                    </Tab>
                </Tabs>
                    
                </div>
            </div>
        );
    }
}

export default DetallePlanta;