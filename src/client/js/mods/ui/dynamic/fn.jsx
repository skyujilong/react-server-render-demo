'use strict';
import React, {
    Component
} from 'react';
/**
 * 异步模块聚合
 */
let moduleList = [];

export default function dynamic(p,key) {

    class Dynamic extends Component {
        constructor(props) {
            super(props);
            this.state = {
                loaded: false,
                Component: null
            };
            if(__isomorphic__){
                this.load();
            }
        }
        load() {
            if(__isomorphic__){
                for (let item of moduleList){
                    console.log('-----------------');
                    console.log(item);
                    if (item.key === key){
                        this.state.Component = item.module.default || item.module;
                        break;
                    }
                }
            }else{
                p.then((m) => {
                    this.setState({
                        Component: m.default || m
                    });
                }, () => {
                    console.log('error........');
                });
            }
        }
        render() {
            let { Component } = this.state;
            console.log('wahahah.....');
            console.log(Component);
            return (
                <div>
                    {Component ? <Component /> : <p>loading.......</p>}
                </div>
            );
        }
        componentDidMount() {
            this.load();
        }
    };

    return Dynamic;
}

export function put(key, module){
    /**
     * 所有在js文件夹下生成的bundle文件 都先如到这个库内
     */
    moduleList.push({
        key,
        module
    });
}