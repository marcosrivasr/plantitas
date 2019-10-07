import React from 'react';


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
      console.log(e.target.value);
    }
  
    render(){
      return(
        <div className="search-containerr">
          <form onSubmit={this.handleSubmit}>
            <input type="text" onKeyUp={this.handleChange} placeholder="Buscar en tu huerto..."/>
          </form>
        </div>
      );
    }
}

  export default SmartSearch;