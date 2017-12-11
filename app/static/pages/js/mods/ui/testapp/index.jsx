'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import { getInfo}  from '../../data/action';
class App extends Component{
    componentWillMount(){
        let {getInfo} = this.props;
        getInfo('hello');
    }
    render(){
        let { title } = this.props;
        return (
            <div>
                <div>{title}</div>
                <div>hehe!</div>
            </div>
        );
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