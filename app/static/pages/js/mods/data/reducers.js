'use strict';


export function info(state = {title:'hello world'},action){
    if(action.type === ''){
        return {info:action.data};
    }else{
        return state;   
    }
}