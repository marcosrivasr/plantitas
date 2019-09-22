import React from 'react';

import Button from 'react-bootstrap/Button';
import Configuration from '../config';

class ConfigStage extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            isOpen: false, // para controlar la UI
            new_stage: 0,
            new_date: '',
            new_comment: '',
            new_image: null
        };
    }

    componentDidMount(){
    }

    // open or close dialog
    onClick = (e) =>{
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    // handle key:value in the inputs
    handleChange = (e) =>{
        this.setState({
                [e.target.name]: e.target.value
        });
    }

    // handle file input
    handleFile = (e) =>{
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    onClickSubmit = () =>{
        // we get the values of state
        const newStage = this.state.new_stage;
        const newDate = this.state.new_date;
        const newComment = this.state.new_comment;
        const newImage = this.state.new_image;

        if(newDate.trim() === '' || newComment.trim() === ''){
            alert('Completa los campos para continuar');
            return false;
        }

        // create a new object with those values
        const newObject = {
            stage: newStage, 
            date: newDate, 
            comment: newComment, 
            image: newImage
        };

        // append those values for the http request
        const formData = new FormData();
        formData.append('image', newImage);
        formData.append('id', this.props.itemId);
        formData.append('stage', newStage);
        formData.append('date', newDate);
        formData.append('comment', newComment);

        // send the http request
        fetch(Configuration.url + '/add-stage', {
            method: 'post', 
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            console.log(data);
            newObject.image = data.image_name;
            // send the new object to the parent to update view
            this.props.onAddStage(newObject);
        });
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
                    <textarea placeholder="Comentarios de esta etapa" name="new_comment" onChange={this.handleChange} />
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
                    <Button variant="link" onClick={this.onClick}>Cancelar</Button>
                </div>
            </div>
        );
    }
}

export default ConfigStage;