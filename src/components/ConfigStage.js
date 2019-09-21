import React from 'react';

import Button from 'react-bootstrap/Button';
import Configuration from '../config';

class ConfigStage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            name: '',
            date: '',
            type: '',
            stages: [],
            new_stage: 0,
            new_date: '',
            comment: '',
            image: null,
            new_image: null
        };
    }

    componentDidMount(){
        const id = this.props.itemId;
        fetch(Configuration.url + '/get/' + id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                id: id,
                name: data.name,
                date: data.date,
                type: data.type,
                stages: data.stages
            });
        })
        .catch(err => console.error(err));
    }

    onClick = (e) =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    handleChange = (e) =>{
        this.setState({
                [e.target.name]: e.target.value
        });
    }
    handleFile = (e) =>{
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    onClickSubmit = () =>{
        const stage = this.state.new_stage;
        const date = this.state.new_date;
        const stages = [...this.state.stages];
        const newObject = {stage: stage, date: date};
        
        //añadimos el nuevo objeto al arreglo de etapas
        stages.push(newObject);

        //datos para la solicitud http
        const formData = new FormData();
        formData.append('image', this.state.new_image);
        formData.append('id', this.state.id);
        formData.append('stage', stage);
        formData.append('date', date);
        formData.append('comment', this.state.comment);

        console.log(stage);

        fetch(Configuration.url + '/add-stage', {
            method: 'post', 
            //body: JSON.stringify({id: this.state.id, stage: stage, date: date})
            body: formData
        })
        .then(res => res.text())
        .then(data => console.log(data));
        this.setState({stages: stages});
    }

    render(){
        return(
            (!this.state.isOpen) ?
                <div id="placeholder-stage-config-container" onClick={this.onClick}>
                    Registrar una nueva etapa
                </div>
            :
            <div id="config-stage-container">
                <div className="config-stage-item"><div>Nueva etapa:</div></div>
                <div className="config-stage-item">
                    <textarea placeholder="Comentarios de esta etapa" name="comment" onChange={this.handleChange} />
                </div>
                <div className="config-stage-item">
                    <select name="new_stage" onChange={this.handleChange}>
                        <option value="0">Semilla</option>
                        <option value="1">Germinación</option>
                        <option value="2">Maceta</option>
                        <option value="3">Tierra</option>
                        <option value="4">Hojas verdaderas</option>
                    </select> 
                </div>
                <div className="config-stage-item">
                    <input type="file" name="new_image" onChange={this.handleFile}/>
                </div>
                <div className="config-stage-item">
                    <input type="date" name="new_date" onChange={this.handleChange} />
                </div>
                <div className="config-stage-item">
                    <Button onClick={this.onClickSubmit}>Añadir nueva etapa</Button>
                </div>
            </div>
        );
    }
}

export default ConfigStage;