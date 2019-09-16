import React from 'react';
import Configuration from '../config';

class NuevaPlanta extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            name: '',
            type: '',
            stage: 0,
            date: ''
        };
    }

    handleSubmit = (e) =>{
        e.preventDefault();
        fetch(Configuration.url + '/add', 
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: this.state.name,
                    type: this.state.type,
                    stage: this.state.stage,
                    date: this.state.date
                })
            })
        .then(res => res.json())
        .then(data => console.log(data));
    }

    handleChange = (e) =>{
        const name = e.target.name;
        const nameValue = e.target.value;
        console.log(nameValue);

        this.setState({[name]: nameValue });
        
    }

    render(){
        return(
            <div id="main-container">
                <form onSubmit={this.handleSubmit} method="POST">
                    <p>
                        Nombre de planta: <br/>
                        <input type="text" name="name" onKeyUp={this.handleChange} />
                    </p>
                    <p>
                        Tipo de planta: <br/>
                        <input type="text" name="type" onKeyUp={this.handleChange} />
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
                        <input type="date" name="date" onChange={this.handleChange} />
                    </p>
                    <p>
                        <input type="submit" />
                    </p> 
                </form>
            </div>
        );
    }
}

export default NuevaPlanta;
