import React from 'react';

class Select extends React.Component{

    constructor(props){
        super(props);
        this.state = {};
    }

    render(){
        return(
            <select name="new_stage" onChange={this.handleChange}>
                <option value="0">Semilla</option>
                <option value="1">Germinación</option>
                <option value="2">Maceta</option>
                <option value="3">Tierra</option>
                <option value="4">Hojas verdaderas</option>
            </select> 
        );
    }
}

export default Select;