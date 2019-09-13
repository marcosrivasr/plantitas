
import Placeholder from '../planta.jpg'
import React from 'react';

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
        fetch('http://localhost:3001/delete/' + this.props.id)
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
    
    days_between(date1, date2) {

      // The number of milliseconds in one day
      var ONE_DAY = 1000 * 60 * 60 * 24;
  
      // Convert both dates to milliseconds
      var date1_ms = date1.getTime();
      var date2_ms = date2.getTime();
  
      // Calculate the difference in milliseconds
      var difference_ms = Math.abs(date2_ms - date1_ms);
  
      // Convert back to days and return
      return Math.round(difference_ms/ONE_DAY) - 1;
  
  }
  
    render(){
      return(
        <div className="item">
          <a onClick={this.handleDelete}>Eliminar</a>
          <h3>{this.props.name}</h3>
          <div>{this.days_between(new Date(this.props.date), new Date())} days</div>
          <img src={Placeholder}  width="200" alt="" />
          <div>Riego: </div>
          <div>Etapa: </div>
          <a href={'/ver-planta/' + this.props.id}>Ver detalle</a>
        </div>
      );
    }
  }

  export default Item;