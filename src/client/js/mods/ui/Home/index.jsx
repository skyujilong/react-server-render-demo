'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getArticle} from '../../data/action'
class Home extends Component{
    render(){
        let {article} = this.props;
        return (
            <div style={{
                width:'1100px',
                margin:'0 auto'
            }}>
                {article ? <div dangerouslySetInnerHTML={{__html:article}}></div> : 'loading....'}
            </div>
        );
    }
    componentDidMount(){
        let {getArticle} = this.props;
        getArticle();
    }
}

function mapStateToProps(state){
    let {article} = state;
    return {
        article: article
    }
}

function mapDispatchToProps(dispatch){
    return {
        getArticle: function () { 
            //dispatch action
            dispatch(getArticle());
        }
    }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(Home));