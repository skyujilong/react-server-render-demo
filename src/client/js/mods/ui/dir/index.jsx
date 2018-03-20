import React,{Component} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import { getDir } from '../../data/action';
import './scss/index.scss';

class Dir extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {dir} = this.props;
        let dirList = dir.map(function(item){
            return (
                <li>
                    <div>
                        <a href={item.url}>{item.title}</a>
                    </div>
                    <div>
                        2017年12月11日
                    </div>
                </li>
            );
        });
        return(
            <div style={this.props.style}>
                {!!dir ? (<ul className={'dir-list'}>{dirList}</ul>) : 'loading.......'}
            </div>
        );
    }
    componentDidMount(){
        let {getDir} = this.props;
        getDir();
    }
}
function mapStateToProps(state){
    let {dir} = state;
    return {
        dir: dir
    }
}
function mapDispatchToProps(dispatch){
    return {
        getDir:function(){
            dispatch(getDir());
        }
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Dir));