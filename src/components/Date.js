import React from 'react';

function Date(){

    getDaystoToday(initialDate =>{

    }); 

    getFormatDate(date =>{

    });

    return(
        <span>{(props.format ? getFormatDate(props.format): getDaystoToday(props.daysto))}</span>
    );
}

export default Date;