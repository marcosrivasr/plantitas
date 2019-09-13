import React from 'react';
import Item from './Item'

class List extends React.Component{

    constructor(props){
      super(props);   
    }

    onDeleteItem = (id) =>{
      this.props.onUpdateData({action: 'delete', id: id});
    }

    render(){
      return(
        <div>
          <h2>{this.props.list.length} plantas en tu huerto</h2>
          <div className="list-container">
            {
              this.props.list.map(item => 
                <Item 
                  id={item.id}
                  name={item.name} 
                  date={item.date}
                  key={item.id}
                  onDeleteItem={this.onDeleteItem}
                   />
              )
            }
          </div>
        </div> 
      );
    }
  }

  export default List;