'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getArticle} from '../../data/action';
import UserProfile from '../user-profile';
class Home extends Component{
    constructor(props){
        super(props);

    }
    render(){
        let {article} = this.props;
        return (
            <div className={'clearfix'}>
                <UserProfile style={{
                    'float':'left'
                }}></UserProfile>
                <div style={{
                    width: '1100px',
                    margin: '20px auto'
                }}>
                    {article ? <div dangerouslySetInnerHTML={{ __html: article }}></div> : 'loading....'}
                </div>
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