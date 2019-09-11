import React from 'react';
import './App.css';

import SmartSearch from './SmartSearch'
import List from './List'



class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      //plantas: ['girasol', 'tomate', 'serrano', 'lechuga', 'menta', 'lavanda', 'tuna', 'albahaca'],
      plantas: [
        {id: 0, name:'girasol', days:20},
        {id: 0, name:'tomate', days:20},
        {id: 0, name:'serrano', days:20},
        {id: 0, name:'lechuga', days:20},
        {id: 0, name:'menta', days:20},
        {id: 0, name:'lavanda', days:20},
        {id: 0, name:'tuna', days:20}
      ],
      copia:[]
    };
  }

  componentDidMount(){
    this.setState({copia: [...this.state.plantas]});
  }

  actualizarLista = (query) =>{
    if(query.trim() === ''){
      this.setState({copia: [...this.state.plantas]}); //se clona si no ha busqueda
    }else{
      let datos = this.state.plantas.filter(item =>{
        return item.name.includes(query);
      });
      this.setState({copia: [...datos]}); //se filtra
    }
  }

  render(){
    return (
      <div className="main-container">
        <SmartSearch 
          list={this.state.copia}
          onSearch={this.actualizarLista} />
          
        <List list={this.state.copia}/>
      </div>
    );
  }
}
export default App;
