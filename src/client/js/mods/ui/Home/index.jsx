'use strict';
import React from 'react';

export default ()=>{
    let i = 0,array = []; 
    for(;i<2000;i++){
        array.push((<div key={'key-' + i}>{i}</div>));
    }
    return (
        <div>
            {array}
        </div>
    );
}