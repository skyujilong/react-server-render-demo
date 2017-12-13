'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getInfo}  from '../../data/action';
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
        console.log('render');
        let { title } = this.props;
        return (
            <div>
                <p>{title}</p>
                <p>hehe!2</p>
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