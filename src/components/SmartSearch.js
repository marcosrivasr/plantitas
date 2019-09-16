import React from 'react';
import Button from 'react-bootstrap/Button';

class SmartSearch extends React.Component{
    constructor(props){
      super(props);
      this.state = {value: ''};
    }
  
    handleSubmit = (e) =>{
      this.props.onSearch(this.state.value);
      e.preventDefault();
    }
  
    handleChange = (e) =>{
      this.setState({value: e.target.value});
      this.props.onSearch(e.target.value);
    }
  
    render(){
      return(
        <div className="search-container">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onKeyUp={this.handleChange} placeholder="Buscar..."/>
            <Button>Buscar</Button>
          </form>
        </div>
      );
    }
}

  export default SmartSearch;