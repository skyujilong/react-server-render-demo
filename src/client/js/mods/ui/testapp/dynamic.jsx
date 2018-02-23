'use strict';
// export default function say(){
//     return 'hello world';
// }
import React, { PureComponent} from 'react'
import {test} from './demo2.jsx';
import * as abcdImg from './abcd.jpeg';
// export default class Wtf extends PureComponent{
//     render(){
//         return (
//             <div>
//                 wtf!!!!!!
//             </div>
//         );
//     }
// }
export default function Wtf(){
    return (
        <div>
            <p>
                <span>wtf!!!!</span>
                <img src={abcdImg.default} alt=""/>
            </p>
        </div>
    );
}