import React from 'react';

class Stage extends React.Component{

    getStage = (stage) =>{
        let name = ''
        switch(parseInt(stage)){
            case 0:
                name = 'Semilla';
                break;
            case 1:
                name = 'Germinación';
                break;
            case 2:
                name = 'Maceta';
                break;
            case 3:
                name = 'Tierra';
                break;
            case 4:
                name = 'Hojas verdaderas';
                break;
            default:
        }
        return name;
    }

    render(){
        return(
            <span>{this.getStage(this.props.stage)}</span>
        );
    }
}

export default Stage;
