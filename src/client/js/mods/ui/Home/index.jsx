'use strict';
import React,{Component} from 'react';
import Article from '../article';
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
                <Article {...this.props} style={{
                    'marginLeft':'220px'
                }}/>
            </div>
            
        );
    }
}
export default Home;