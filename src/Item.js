
import Placeholder from './planta.jpg'
import React from 'react';

class Item extends React.Component{
    constructor(props){
      super(props);
      this.state = {isToogleOn: true};
    }
  
    handleClick = () =>{
      this.setState(state =>({
        isToogleOn : !state.isToogleOn
      }));
    }
  
    render(){
      return(
        <div className="item">
          <h3>{this.props.name}</h3>
          <img src={Placeholder}  width="100" alt="" />
          <p><button onClick={this.handleClick}>{this.state.isToogleOn?'On':'Off'}</button></p>
        </div>
      );
    }
  }

  export default Item;