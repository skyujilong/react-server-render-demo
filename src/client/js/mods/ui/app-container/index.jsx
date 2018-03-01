'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,Switch,Route} from 'react-router-dom';
import { withRouter } from 'react-router'
import Home from '../Home';
import dynamic from '../dynamic/fn';
class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div className={"wrapper"}>
                <nav>
                    <Link to="/">首页</Link>        
                    <Link to="/dir">博文目录</Link>
                    <Link to="/pic">图片</Link>
                    <Link to="/about">关于我</Link>
                </nav>
                <div>
                    <Switch>
                        <Route exact path="/" component={Home}></Route>
                        <Route exact path="/dir" render={(props)=>{
                            // 将 props 对象传递到里面
                            let Dir = dynamic(import(/* webpackChunkName: "dir" */'../dir/index.jsx'), {
                                isSSR: true
                            });
                            return (
                                <Dir {...props}></Dir>
                            );
                        }}></Route>
                        {/* <Route exact path="/pic" component={Pic}></Route> */}
                        {/* <Route exact path="/about" component={About}></Route> */}
                        {/* <Route exact path="/:articleId" component={Article}></Route> */}
                        {/* <Route component={Notmatch}></Route> */}
                    </Switch>
                </div>
            </div>
        );
    }
}

export default App;