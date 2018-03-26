import React,{Component} from 'react';


class DragItem extends Component{
    constructor(props){
        super(props);
        this.mouseDown = this.mouseDown.bind(this);
    }
    render(){
        let { name,color} = this.props;
        return (
            <div onMouseDown={this.mouseDown} style={{
                backgroundColor: color,
                height:'60px',
                fontSize:'34px',
                lineHeight:'60px',
                textAlign:'center',
                color:'#fff'
            }}>
                {this.props.children}
            </div>
        );
    }
    mouseDown(e){
        let {mouseDown,id} = this.props;
        mouseDown(id);
    }
}

export default DragItem;