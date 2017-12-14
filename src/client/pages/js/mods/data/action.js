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
        console.log(fetch);
        fetch('http://test.sina.com.cn/api/info').then((res)=>{
            console.log('fetching ..........');
            return res.json();
        }).then((res)=>{
            if(res.code === 200){
                dispatch(reqInfoSucc(res.data));
            }else{
                dispatch(reqInfoErr());
            }
        },(res)=>{
            dispatch(reqInfoErr());
        }).catch((e)=>{
            console.log(e);
        }); 
    }
}
