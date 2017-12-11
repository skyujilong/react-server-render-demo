'use strict';
import fetch from 'isomorphic-fetch';

function reqInfo(){
    return {
        type:'reqInfo'
    };
}
function reqInfoSucc(data){
    return {
        type:'reqInfoSucc',
        data:data
    }
}
function reqInfoErr(){
    return {
        type:'reqInfoErr'
    }
}

export function getInfo(args){
    //采用thunk中间件，因此这里return 
    return function(dispatch){
        dispatch(reqInfo());
        fetch('//test.sina.com.cn/api/info').then((res)=>{
            return res.json();
        }).then((res)=>{
            if(res.code === 200){
                dispatch(reqInfoSucc());
            }else{
                dispatch(reqInfoErr());
            }
        },(res)=>{
            dispatch(reqInfoErr());
        }); 
    }
}
