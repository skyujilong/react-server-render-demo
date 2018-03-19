import React,{ Component } from "react";
import { connect } from 'react-redux';
import { getSolgen } from '../../data/action';
import { withRouter} from 'react-router';
import './scss/solgen.scss';

class Solgen extends Component{
    constructor(props){
        super(props);
    }
    render(){
        let {solgen} = this.props;
        return (
            <div className={'solgen'} style={{
                backgroundImage: solgen ? `url(${solgen})` : null,
                height: solgen ? '566px': auto
            }}>
                {this.props.children ? this.props.children : ''}
            </div>
        );
    }

    componentDidMount(){
        let { getSolgen} = this.props;
        getSolgen();
    }
}
function mapStateToProps(state){
    let {solgen} = state;
    return {
        solgen : solgen
    }
}
function mapDispatchToProps(dispatch){
    return {
        getSolgen: function(){
            dispatch(getSolgen());
        }
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Solgen));