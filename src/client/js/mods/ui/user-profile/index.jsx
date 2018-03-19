import React, {Component} from 'react';
import './scss/index.scss';

export default class UserProfile extends Component{
    constructor(props){
        super(props);
    }
    render(){
        return (
            <aside className={'user-profile'} style={this.props.style}>
                <div>
                    <div>
                        <span>个人资料</span>
                    </div>
                    <div>
                        <img src="http://portrait3.sinaimg.cn/1595082642/blog/180" alt=""/>
                    </div>
                    <ul className={'level-info'}>
                        <li>
                            <div>博客等级</div><div>9</div>
                        </li>
                        <li>
                            <div>博客积分</div><div>2041</div>
                        </li>
                        <li>
                            <div>博客访问</div><div>100000</div>
                        </li>
                        <li>
                            <div>关注人气</div><div>145</div>
                        </li>
                    </ul>
                </div>
            </aside>
        );
    }
}