'use strict';
import React, {
    Component
} from 'react';
/**
 * 异步模块聚合
 */
let moduleList = [];

export default function dynamic(p) {
    let _m;
    if (__isomorphic__){
        p.then((m)=>{
            _m = m.default || m;
            console.log(_m);
        });
    }

    class Dynamic extends Component {
        constructor(props) {
            super(props);
            console.log('wtf......222211');
            console.log(_m);
            this.state = {
                loaded: false,
                Component: __isomorphic__ ? _m : null
            };
        }
        load() {
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

export function put(key,moudle){
    /**
     * 所有在js文件夹下生成的bundle文件 都先如到这个库内
     */
    moduleList.push({
        key,
        moudle
    });
}