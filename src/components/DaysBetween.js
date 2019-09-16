import React from 'react';



class DaysBetween extends React.Component{

    daysBetween = (date1, date2) =>{
        // The number of milliseconds in one day
        var ONE_DAY = 1000 * 60 * 60 * 24;
    
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
    
        // Calculate the difference in milliseconds
        var difference_ms = Math.abs(date2_ms - date1_ms);
    
        // Convert back to days and return
        return Math.round(difference_ms/ONE_DAY) - 1;
    };

    render(){
        return (
            <span>{(this.props.startDate && this.props.endDate) ? this.daysBetween(this.props.startDate, this.props.endDate) : ""}</span>
        );
    }
}

export default DaysBetween;