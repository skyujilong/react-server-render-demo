'use strict';
import React, {
    Component
} from 'react';
import UserProfile from '../user-profile';
import Dir from '../dir';
export default class DirContainer extends Component{
    render(){
        return (
            <div>
                <UserProfile style={{
                    'float': 'left'
                }}/>
                <Dir style={{
                    'marginLeft': '220px'
                }}></Dir>
            </div>
        );
    }
}