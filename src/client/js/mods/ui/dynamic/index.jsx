'use strict';

import React, {Component} from 'react';

export default class Dynmaic extends Component {
    constructor(props){
        super(props);
        let { pComponent } = this.props;
        this.state = {
            loaded: false,
            component: null
        };
        //服务器环境，率先load 新的模块
        if (__isomorphic__){
            this.load();
        }
       
    }
    load(){
        let { pComponent } = this.props;
        pComponent.then((m) => {
            if(__isomorphic__){
                this.state.Component = m.default || m;
            }else{
                this.setState({
                    Component: m.default || m
                });
            }
            
        }, () => {
            console.log('error........');
        });
    }
    render(){
        let { Component} = this.state;
        return (
            <div>
                {Component ? <Component/> : <p>loading.......</p>}
            </div>
        );
    }
    componentDidMount(){
        this.load();
    }
}