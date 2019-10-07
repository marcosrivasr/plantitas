import React from 'react';
import './App.css';

import SmartSearch from './components/SmartSearch'
import List from './components/List'

import Configuration from './config.js';



class App extends React.Component{
  
  constructor(props){
    super(props);
    this.state = {
      //plantas: ['girasol', 'tomate', 'serrano', 'lechuga', 'menta', 'lavanda', 'tuna', 'albahaca'],
      plantas: [],
      copia:[]
    };
  }

  async componentDidMount(){
    const plantas = await this.loadPlantitas(); 
    this.setState({plantas: [...plantas]});
    this.setState({copia: [...this.state.plantas]});

  }

  async loadPlantitas(){
    const res = await fetch(Configuration.url + '/get', {method: 'GET', 'Content-type': 'text/json'})
    .then(res => res.json())
    .catch(err =>console.error(err.message));
    
    return res;
  }

  onSearch = (query) =>{
    if(query.trim() === ''){
      this.setState({copia: [...this.state.plantas]}); //se clona si no ha busqueda
    }else{
      let datos = this.state.plantas.filter(item =>{
        return item.name.toLowerCase().includes(query.toLowerCase());
      });
      this.setState({copia: [...datos]}); //se filtra
    }
  }

  onUpdateData = (data) =>{
    switch(data.action){
      case 'delete':
          this.removeItem(data);
        break;
      default:
        break;
    }
  }

  removeItem = (item) =>{
    const temp = [...this.state.plantas];
    const res = this.removeItemFromArray(temp, item);
    this.setState({plantas: [...res]});
    this.setState({copia: [...res]});
  }

  removeItemFromArray = (array, item) =>{
    const index = array.map(i => i.id).indexOf(item.id);
    const newArray = [...array];
    newArray.splice(index, 1);
    return newArray;
  }

  

  render(){
    return (
      <div className="main-container">
        <SmartSearch 
          list={this.state.copia}
          onSearch={this.onSearch} />
          
        <List 
          list={this.state.copia}
          onUpdateData={this.onUpdateData}/>
      </div>
    );
  }
}


export default App;
