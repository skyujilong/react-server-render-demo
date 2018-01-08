'use strict';
import React, {
    Component
} from 'react';

export default function dynamic(p) {
    let __p;
    if(__isomorphic__){
        //TODO loading?
        p.then((p)=>{
            __p = p.default || p;
        });
    }

    return class Dynamic extends Component {
        constructor(props) {
            super(props);
            
            this.state = {
                loaded: false,
                component: null
            };
            //服务器环境，率先load 新的模块
            if (__isomorphic__) {
                this.load();
            }

        }
        load() {
            if (__p && __isomorphic__){
                this.state.Component = __p;
            }else{
                p.then((m) => {

                    if (__isomorphic__) {
                        this.state.Component = m.default || m;
                    } else {
                        this.setState({
                            Component: m.default || m
                        });
                    }
                }, () => {
                    console.log('error........');
                });
            }
            
        }
        render() {
            let { Component } = this.state;
            return (
                <div>
                    {Component ? <Component /> : <p>loading.......</p>}
                </div>
            );
        }
        componentDidMount() {
            this.load();
        }
    }
}