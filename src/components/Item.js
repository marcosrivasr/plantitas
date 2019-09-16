
import Placeholder from '../planta.jpg'
import React from 'react';
import Stage from './Stage';
import DaysBetween from './DaysBetween';
import Dropdown from 'react-bootstrap/Dropdown'

import Configuration from '../config.js';

class Item extends React.Component{
    constructor(props){
      super(props);
      this.state = {isToogleOn: true};
    }
    /*
    * Se elimina el elemento y se manda
    * información al padre
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
        /*
        <Card style={{maxWidth: "255px", marginBottom: "15px", flex: "1 0 15%" }}>
          <Card.Header>
            <Card.Title style={{fontWeight: "bolder"}}>{this.props.name}</Card.Title>
          </Card.Header>
          <a href={'/ver-planta/' + this.props.id}>
          <Card.Img variant="top" src={Placeholder} />
          </a>
          
          <ListGroup className="list-group-flush">
            <ListGroupItem>Edad: {this.days_between(new Date(this.props.date), new Date())} días</ListGroupItem>
            <ListGroupItem>Etapa: <Stage stage={this.props.stage} /></ListGroupItem>
            <ListGroupItem>Riego: cada 2 días</ListGroupItem>
            <ListGroupItem>
            <Dropdown className="text-center">
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Acciones
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href={'/ver-planta/' + this.props.id}>Ver detalle</Dropdown.Item>
                <Dropdown.Item onClick={this.handleDelete}>Eliminar</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            </ListGroupItem>
          </ListGroup>
        </Card>
        */
        <div className="item">
          <div className="title">{this.props.name}</div>
          <div className="image">
            <a href={'/ver-planta/' + this.props.id}>
            <img src={Placeholder} width="100%" />
            </a>
          </div>
          <div className="list-group-container">
            <div className="list-group-section">Edad: <DaysBetween startDate={new Date(this.props.date)} endDate={new Date()} /> días</div>
            <div className="list-group-section">Etapa: <Stage stage={this.props.stage} /></div>
            <div className="list-group-section">Riego: cada 2 días</div>
          </div>
        </div>
      );
    }
  }

  export default Item;