import React from 'react';
import Item from './Item';

class List extends React.Component{

    constructor(props){
      super(props);   
    }

    onDeleteItem = (id) =>{
      this.props.onUpdateData({action: 'delete', id: id});
    }
    
    getCount = () =>{
      return this.props.list.length;
    } 

    render(){
      return(
        <div>
          <div id="status-container">
            <h2>{this.getCount()} {this.getCount() === 1?'planta':'plantas'} en tu huerto</h2>
          </div>
          <div className="list-container">
            {
              this.props.list.map((item, index) => 
              
                <Item 
                  key={item.id}
                  id={item.id}
                  name={item.name} 
                  date={item.date}
                  stage={item.stages[item.stages.length-1].stage}
                  image={item.stages[item.stages.length-1].image}
                  irrigation={(item.irrigation.length == 0)? 'apagado': 'cada ' + item.irrigation[item.irrigation.length-1].days + ' días'}
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