'use strict';


export function info(state = {title:'hello world2333'},action){
    if(action.type === ''){
        return {info:action.data};
    }else{
        return state;   
    }
}