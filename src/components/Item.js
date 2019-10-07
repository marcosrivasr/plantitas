
import Placeholder from '../planta.jpg'
import React from 'react';
import Stage from './Stage';
import DaysBetween from './DaysBetween';
import Button from 'react-bootstrap/Button'

import Configuration from '../config.js';

class Item extends React.Component{
    constructor(props){
      super(props);
      this.state = {isToogleOn: true};
    }
    /*
    * Se elimina el elemento y se manda
    * información al padre
    * 
    */
    handleDelete = () =>{
      //this.props.onDeleteItem(this.props.id);
      const dialog = window.confirm('Estás seguro de eliminar la plantita?');
      if(dialog === true){
        fetch(Configuration.url + '/delete/' + this.props.id)
        .then(res => res.text())
        .then(response => {
          alert(response);
          this.props.onDeleteItem(this.props.id);
        })
        .catch(err => console.error(err));
      }
    }
  
    handleClick = () =>{
      this.setState(state =>({
        isToogleOn : !state.isToogleOn
      }));
    }
  
    render(){
      return(
        <div className="item">
          <div className="title">{this.props.name}</div>
          <div className="image">
            <a href={'/ver-planta/' + this.props.id}>
            <img alt="" src={(this.props.image) ? Configuration.url + '/' + this.props.image : Placeholder} width="100%" />
            </a>
          </div>
          <div className="list-group-container">
            <div className="list-group-section">Edad: <DaysBetween startDate={new Date(this.props.date)} endDate={new Date()} /> días</div>
            <div className="list-group-section">Etapa: <Stage stage={this.props.stage} /></div>
            <div className="list-group-section">Riego: {this.props.irrigation}</div>
            <div className="list-group-section"><Button onClick={this.handleDelete}>Eliminar planta</Button></div>
          </div>
        </div>
      );
    }
  }

  export default Item;