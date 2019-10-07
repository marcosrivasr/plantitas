import React from 'react';
import Configuration from '../config';
import Button from 'react-bootstrap/Button';

class NuevaPlanta extends React.Component{

    constructor(props, context){
        super(props, context);
        this.state = {
            name: '',
            type: '',
            stage: 0,
            date: '',
            image: null
        };
    }
    handleFile = (e) =>{
        this.setState({
            [e.target.name]: e.target.files[0]
        });
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        if(this.state.name.trim() === '' || this.state.type.trim() === '' || this.state.date.trim() === ''){
            alert('Completa los campos para continuar');
            return false;
        }
        const formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('type', this.state.type);
        formData.append('stage', this.state.stage);
        formData.append('date', this.state.date);
        formData.append('image', this.state.image);

        fetch(Configuration.url + '/add', 
            {
                method: 'POST', 
                body: formData
            })
        .then(res => res.json())
        .then(data =>{
            
        });
    }

    handleChange = (e) =>{
        const name = e.target.name;
        const nameValue = e.target.value;
        console.log(nameValue);

        this.setState({[name]: nameValue });
        
    }

    render(){
        return(
            <div className="main-container nuevo-container">
                <form action="http://localhost:3001/add" method="post" encType="multipart/form-data" onSubmit={this.handleSubmit}>
                    <p>
                        Nombre de planta: <br/>
                        <input type="text" autoComplete="off" name="name" onKeyUp={this.handleChange}  />
                    </p>
                    <p>
                        Tipo de planta: <br/>
                        <input type="text" autoComplete="off" name="type" onKeyUp={this.handleChange} />
                    </p>
                    <p>
                        Etapa: <br/>
                        <select name="stage" onChange={this.handleChange}>
                            <option value="0">Semilla</option>
                            <option value="1">Germinación</option>
                            <option value="2">Maceta</option>
                            <option value="3">Tierra</option>
                            <option value="4">Hojas verdaderas</option>
                        </select>
                    </p>
                    <p>
                        Fecha: <br/>
                        <input type="date" name="date" onChange={this.handleChange}  />
                    </p>
                    <p>
                        Imagen: <br/>
                        <input type="file" name="image" onChange={this.handleFile} />
                    </p>
                    <p>
                        <Button onClick={this.handleSubmit}>Crear nueva planta</Button>
                    </p> 
                </form>
            </div>
        );
    }
}

export default NuevaPlanta;
