import React from 'react';

class DetallePlanta extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            name: '',
            date: '',
            type: '',
            stages: []
        };
    }

    componentDidMount(){
        fetch('http://localhost:3001/get/' + this.props.match.params.id)
        .then(res => res.json())
        .then(data => {
            this.setState({
                name: data.name,
                date: data.date,
                type: data.type,
                stages: data.stages
            });
        })
        .catch(err => console.error(err));

    }

    render(){
        return(
            <div id="main-container">{this.state.name}</div>
        );
    }
}

export default DetallePlanta;