import React from 'react';

class DateFormat extends React.Component{
    format = (date) =>{
        var today = new Date(date);
        var dd = today.getDate();
        var mm = today.getMonth() + 1; //January is 0!

        var yyyy = today.getFullYear();
        if (dd < 10) {
        dd = '0' + dd;
        } 
        if (mm < 10) {
        mm = '0' + mm;
        } 
        var res = dd + '/' + mm + '/' + yyyy;
        return res;
    }

    render(){
        return(
            <span>{this.props.date ? this.format(this.props.date) : ""}</span>
        );
    }
}

export default DateFormat;