import React from 'react';

class Select extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    handleChange = (e) =>{
        onChange(e.target.value);
    }

    render(){
        return(
            <select onChange={this.handleChange}>
                <option value="0">Semilla</option>
                <option value="1">Germinación</option>
                <option value="2">Maceta</option>
                <option value="3">Tierra</option>
                <option value="4">Hojas verdaderas</option>
                <option value="5">Poda</option>
                <option value="6">Flor</option>
                <option value="7">Fruto</option>
                <option value="8">Cambio de abono</option>
                <option value="9">Muerte</option>
            </select> 
        );
    }
}

export default Select;