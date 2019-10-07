import React from 'react';
import Item from './Item';

class List extends React.Component{

    onDeleteItem = (id) =>{
      this.props.onUpdateData({action: 'delete', id: id});
    }
    
    getCount = () =>{
      return this.props.list.length;
      
    };

    getGroups = () =>{
      const data = this.props.list;
      const groups = {};
      const res = [];
      data.forEach(element => {
        if(groups[element.type.toLowerCase().replace(' ', '_')] > 0){
          groups[element.type.toLowerCase().replace(' ', '_')]++;
        }else{
          groups[element.type.toLowerCase().replace(' ', '_')] = 1;
        }  
        //console.log(element.type.toLowerCase().replace(' ', '_'));
      });
      
      const keys = Object.keys(groups);
      keys.forEach(x =>{
        res.push({name: x, qty: groups[x]});
      });
      return res;
    };



    componentDidUpdate(){
      this.getGroups();
    }



    render(){
      return(
        <div>
          <div id="status-container">
            <h2>{this.getCount()} {this.getCount() === 1?'planta':'plantas'} en tu huerto</h2>
            <div>
              {
                this.getGroups().map(item =>
                  <div className="group" key={item.name}>{item.qty} {item.name.replace('_', ' ')}</div>
                )
              }
            </div>
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
                  //irrigation={item.water_turn_on}
                  irrigation={(item.water_turn_on === false)? 'apagado': 'cada ' + item.irrigation[item.irrigation.length-1].days + ' días'}
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