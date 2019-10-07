import React from 'react';
import Configuration from '../config';
import Stage from './Stage';
import DateFormat from './DateFormat';
import DaysBetween from './DaysBetween';

class StageHistory extends React.Component{

    render(){
        return(
            <div className="stage-story-item">
                <div className="title"><h4><Stage stage={this.props.data.stage} /></h4></div>
                <div className="date"><DateFormat date={this.props.data.date} /> (<DaysBetween startDate={new Date(this.props.data.date)} endDate={new Date()} /> días)</div>
                <div className="comment">{this.props.data.comment}</div>
                <div className="image">{(this.props.data.image) ? <img alt="" src={Configuration.url + '/' + this.props.data.image} width="100%" /> : '' }</div>
            </div>
        );
    }
}

export default StageHistory;