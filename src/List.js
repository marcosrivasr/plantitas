import React from 'react';
import Item from './Item'

class List extends React.Component{

    constructor(props){
      super(props);
    }
  
    render(){
      return(
        <div className="list-container">
          {
            this.props.list.map(item => 
              <Item name={item.name} key={item.id} />
            )
          }
        </div>
      );
    }
  }

  export default List;