'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getInfo}  from '../../data/action';
import {Button} from 'antd';
import './test.scss';   
import * as testimg from "../../../../img/testimg.jpg";
// import Dynmaic from '../dynamic';
import dynamic from '../dynamic/fn';
// syntax-dynamic-import 采用babel的这个组件来启动 动态import
// import('./dynamic.js').then((dynamic) => {
//     // 采用动态import方式构建 异步路由
//     console.log(dynamic.default);
// });



class App extends Component{

    //添加生命周期测试
    /**
     * 初始化构造器
     * @param {*} props 
     */
    constructor(props){
        super(props);
        console.log('constructor');
    }
    /**
     * 将要开始挂在
     */
    componentWillMount(){
        console.log('componentWillMount');
        let {getInfo} = this.props;
        getInfo('hello');
    }
    /**
     * 获取将要变更的props 与 store
     */
    componentWillReceiveProps(){
        console.log('componentWillReceiveProps');
    }

    /**
     * 组件是否要变更，走渲染逻辑（渲染前，回进行dom比对）
     */
    shouldComponentUpdate(){
        console.log('shouldComponentUpdate');
        return true;
    }

    /**
     * 渲染进行中
     */
    render(){
        let { title } = this.props;
        let Demo = dynamic(import(/* webpackChunkName: "dynamic" */'./dynamic.js'), 'dynamic');
        return (
            <div>
                <p>{title}</p>
                <p>hehe!2</p>
                <Button type="primary">hello jilong5!</Button>
                {/* suppressHydrationWarning 为true的时候不尽兴详细的dom或者属性对比，这个只能用在展示层的组件，就是没有children的组件 */}
                {/* <img suppressHydrationWarning={true} src={testimg.default} alt=""/> */}
                <img src={testimg.default} alt="" />
                <div className={'demomao helloworld'}></div>
                {/* <Dynmaic pComponent={import('./dynamic.js')}/> */}
                <Demo></Demo>
            </div>
        );
    }
    /**
     * 组件更新完毕
     */
    componentDidUpdate(){
        console.log('componentDidUpdate');
    }

    /**
     * 挂载完毕
     */
    componentDidMount(){
        console.log('componentDidMount');
    }
}
function mapStateToProps(state){
    return {
        title: state.info.title
    }
}
function mapDispatchToProps(dispatch){
    return {
        getInfo: function (...rest){
            dispatch(getInfo(rest));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);