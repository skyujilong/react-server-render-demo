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
        return fetch('http://test.sina.com.cn/api/info').then((res)=>{
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


/**article  */
export function getArticle(){
    return function(dispatch){
        dispatch(reqArt());
        return fetch('http://test.sina.com.cn/api/article').then(function(res){
            return res.json();
        }).then(function(res){
            let {data} = res;
            dispatch(reqSuccArt(data));
        },function(){
            dispatch(reqErrArt());
        })
    }
}

function reqArt(){
    return {
        type: 'reqArt'
    }
}
function reqSuccArt(data){
    return {
        type:'reqSuccArt',
        data: data
    }
}
function reqErrArt(){
    return {
        type:'reqErrArt'
    }
}