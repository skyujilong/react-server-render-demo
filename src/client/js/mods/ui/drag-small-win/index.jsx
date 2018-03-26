import React,{PureComponent} from 'react';

let styles = {
    'position':'absolute',
    'height':'40px',
    'background':'red',
    'width':'120px',
    'transition':'transform 100ms ease-out'
};
export default class DragSmallWin extends PureComponent{
    constructor(props){
        super(props);
    }
    render(){
        let { top, left, mouseUp, tranLeft, tranTop} = this.props;
        return (
            <div onMouseUp={mouseUp} style={{
                ...styles,
                top: top - 20 + 'px',
                left: left - 60 + 'px',
                transform:`translate3d(${tranLeft}px,${tranTop}px,0)`
            }}></div>
        );
    }
}