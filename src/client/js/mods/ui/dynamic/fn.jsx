'use strict';
import React, {
    Component
} from 'react';
/**
 * 异步模块聚合
 */
let moduleList = [];

export default function dynamic(p, opts) {
    // console.log(p.keyPath);
    let {isSSR} = opts;
    class Dynamic extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
                Component: null
            };
            if (isSSR){
                this.load();
            }
        }
        load() {
            //防止二次加载
            if (this.state.Component){
                return;
            }

            if (__isomorphic__ && isSSR){
                for (let item of moduleList){
                    if (item.sourceFilePath === p.keyPath){
                        this.state.Component = item.module.default || item.module;
                        item.marked();
                        break;
                    }
                }
                return;
            }else if(isSSR){
                //读取 客户端module信息，直接本地加载内容
                if (window.__clientModuleInfo__ && window.__clientModuleInfo__.length > 0){
                    for (let clientInfo of window.__clientModuleInfo__){
                        if(clientInfo.keyPath === p.keyPath){
                            let __module__ = __webpack_require__(clientInfo.id);
                            this.state.Component = __module__.default || __module__;
                            return;
                        }
                    }
                }
            }
            //最后行不通了走 p加载方式
            p.then((m) => {
                this.setState({
                    Component: m.default || m
                });
            }, () => {
                console.log('error........');
            });
        }
        render() {
            let { Component } = this.state;
            return (
                <div>
                    {Component ? <Component {...this.props} /> : <p>loading.......</p>}
                </div>
            );
        }
        componentDidMount() {
            this.load();
        }
    };

    return Dynamic;
}

export function initDynamicModule(list){
    moduleList = list;
}