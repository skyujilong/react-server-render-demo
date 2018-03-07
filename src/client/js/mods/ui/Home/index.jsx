'use strict';
import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import {getArticle} from '../../data/action'
class Home extends Component{
    constructor(props){
        super(props);
        this.textChange = this.textChange.bind(this);
        this.state = {
            inputValue:''
        };
    }
    render(){
        let {article} = this.props;
        let {inputValue} = this.state;
        return (
            <div>
                <input type="text" value={inputValue} onChange={this.textChange}/>
                <p><b>{inputValue}</b></p>
                <div style={{
                    width: '1100px',
                    margin: '20px auto'
                }}>
                    {article ? <div dangerouslySetInnerHTML={{ __html: article }}></div> : 'loading....'}
                </div>
            </div>
            
        );
    }

    textChange(e){
        this.setState({
            inputValue: e.target.value
        });
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