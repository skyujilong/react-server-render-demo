import React,{Component} from 'react';


class DragItem extends Component{
    constructor(props){
        super(props);
        this.el = null;
        this.mouseDown = this.mouseDown.bind(this);
    }
    render(){
        let { name,color} = this.props;
        return (
            <div ref={(el)=>{
                this.el = el;
            }} onMouseDown={this.mouseDown} style={{
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
    componentDidMount(){
        let { dragItemDidMount,id} = this.props;
        //这里初始化 这个对象的高度与位置
        dragItemDidMount(id, this.el);
    }
    mouseDown(e){
        let {mouseDown,id} = this.props;
        mouseDown(id);
    }
}

export default DragItem;