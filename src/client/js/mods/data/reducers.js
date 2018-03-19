'use strict';


export function info(state = {title:'hello world2333'},action){
    if (action.type === 'reqInfoSucc'){
        return { title:action.data};
    }else{
        return state;   
    }
}

export function article(state='',action){
    if (action.type === 'reqSuccArt'){
        return action.data;
    }else {
        return state;
    }
}

//solgen
export function solgen(state={},action){
    if (action.type === 'reqSolgenSucc'){
        return action.data;
    }else{
        return state;
    }
}