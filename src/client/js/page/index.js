// main.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { AppContainer } from 'react-hot-loader';
import create from '../mods/data/store';
import App from '../mods/ui/testapp';
import "../../scss/base.scss";
const render = Component => {
    // 当判断是 hot模式的时候 不是服务器渲染模式 采用render api
    if(module.hot){
        ReactDOM.render(
            // 全局函数  初始化的state内容
            <Provider store={create(window.__initState__)}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </Provider>,
            document.getElementById('root'),
        )
    }else{
        ReactDOM.hydrate(
            // 全局函数  初始化的state内容
            <Provider store={create(window.__initState__)}>
                <AppContainer>
                    <Component />
                </AppContainer>
            </Provider>,
            document.getElementById('root'),
        )
    }
    
}



render(App);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../mods/ui/testapp',() => { render(App) });
    module.hot.accept('../mods/data/reducers',()=>{
        const nextRootReducer = require('../mods/data/reducers');
        store.replaceReducer(nextRootReducer);
    });
}