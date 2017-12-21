'use strict';


export function info(state = {title:'hello world2333'},action){
    if (action.type === 'reqInfoSucc'){
        return { title:action.data};
    }else{
        return state;   
    }
}