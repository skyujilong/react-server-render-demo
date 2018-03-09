'use strict';
import React, {
    Component
} from 'react';
export default class Dir extends Component{
    render(){
        // console.log(this.props);
        let list = [
            '一个学生的开学典礼，任性不是人性',
            '海南“天价机票”是“趁雾打劫”吗?',
            '新春祝福：因为烦恼，所以幸福',
            '茅台酒限价与首套房利率大涨',
            '饭店有人抽烟，你要不要管一管?'
        ];
        let array = [], key = 1;
        for (let item of list){
            array.push((
                <li key={'dir-'+ key}>
                    <a href="javascript:void(0);">{item}</a>
                </li>
            ));
            key++;
        }
        //2000个节点进行测试
        let list2 = [];
        for ( let i = 0; i< 1000 ; i++){
            list2.push((<li key={'new-key' + i}>i</li>));
        }
        return (
            <div>
                <ul>
                    {array}
                    {list2}
                </ul>
            </div>
        );
    }
}