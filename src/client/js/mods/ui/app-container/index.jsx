'use strict';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Link,Switch,Route} from 'react-router-dom';
import { withRouter } from 'react-router'
import Home from '../home';
import Solgen from '../solgen';
import dynamic from '../dynamic/fn';
import './scss/container.scss';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
class App extends Component {
    constructor(props){
        super(props);
    }
    render(){
        return (
            <div>
                <Solgen>
                    <div className={"wrapper"}>
                        <nav>
                            <Link to="/">首页</Link>
                            <Link to="/dir">博文目录</Link>
                            <Link to="/pic">图片</Link>
                            <Link to="/about">关于我</Link>
                        </nav>
                    </div>
                </Solgen>
                <div className={"wrapper"}>
                {/* transitionGroup 用来管理组件装载与卸载的时候的组件的状态 */}
                    <TransitionGroup>
                        <Switch>
                            <Route exact path="/" component={Home}></Route>
                            
                            <Route exact path="/dir" render={(props) => {
                                // 将 props 对象传递到里面
                                let Dir = dynamic(import(/* webpackChunkName: "dir-container" */'../dir-container/index.jsx'), {
                                    isSSR: true
                                });
                                return (
                                    <CSSTransition
                                        in={true}
                                        timeout={10000}
                                        classNames="example">
                                        <Dir {...props}></Dir>
                                    </CSSTransition>
                                );
                            }}></Route>
                            {/* <Route exact path="/pic" component={Pic}></Route> */}
                            {/* <Route exact path="/about" component={About}></Route> */}
                            {/* <Route exact path="/:articleId" component={Article}></Route> */}
                            {/* <Route component={Notmatch}></Route> */}
                        </Switch>
                    </TransitionGroup>
                </div>
            </div>
        );
    }
}

export default App;