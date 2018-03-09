'use strict';
import React, {
    Component
} from 'react';
/**
 * 异步模块聚合
 */
let moduleList = [];

export default function dynamic(p, opts) {
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
            if (this.state.loaded){
                return;
            }

            if (__isomorphic__ && isSSR){
                //mark作用是标记需要客户端直接输出到页面上的script
                for (let item of moduleList){
                    if (item.sourceFilePath === p.keyPath){
                        this.state.Component = item.module.default || item.module;
                        item.marked();
                        break;
                    }
                }
                return;
            } else if (!__isomorphic__ && isSSR){
                //客户端上的操作
                //读取 客户端module信息，直接本地加载内容
                if (window.__clientModuleInfo__ && window.__clientModuleInfo__.length > 0){
                    for (let clientInfo of window.__clientModuleInfo__){
                        if(clientInfo.keyPath === p.keyPath){
                            if (!__webpack_require__.m[clientInfo.id]){
                                //代表那种没有将内容直接插入到，页面上的，这个时候需要，重新执行promise中的操作，完成后续内容的加载
                                p.then((m) => {
                                    this.setState({
                                        Component: m.default || m,
                                        loaded: true
                                    });
                                });
                            }else{
                                //代表 server端，已经将script注入到html中，这个时候就是已经有这个类块了，可以同步直出内容。
                                let __module__ = __webpack_require__(clientInfo.id);
                                this.state.Component = __module__.default || __module__;
                                this.state.loaded = true;
                            }
                            return;
                        }
                    }
                }
            }
            //最后行不通了走 p加载方式
            p.then((m) => {
                this.setState({
                    Component: m.default || m,
                    loaded: true
                });
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
            let { loaded } = this.state;
            if(!loaded){
                this.load();
            }
        }
    };

    return Dynamic;
}

export function initDynamicModule(list){
    moduleList = list;
}