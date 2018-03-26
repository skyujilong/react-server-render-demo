import React,{Component} from 'react';
import DragItem from '../drag-item';
import DragSmallWin from '../drag-small-win';
import './scss/index.scss';
class DragContainer extends Component{

    constructor(props){
        super(props);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this._mouseDown = this._mouseDown.bind(this);

        let list = [];
        let color = ['#000033', '#000066', '#000099', '#003333', '#003366', '#003399', '#006633', '#006666', '#006699', '#009966']
        for (let i = 0; i < 10; i++) {
            list.push(
                {
                    id: 'id-'+i,
                    name: '编号为：' + i,
                    color: color[i]
                }
            );
        }
        this.el = null;
        this.state = {
            list: list,
            currentMove:null,
            isDrag: false,
            top:0,
            left:0,
            tranTop:0,
            tranLeft:0,
            mouseLeft:0,
            mouseTop:0
        }
    }
    // shouldComponentUpdate(nextProps, nextState){
    //     if(this.state.list !== nextState.list){
    //         return true;
    //     }

    //     if (nextState.isDrag || nextState.isDrag !== this.state.isDrag){
    //         return true;
    //     }

    //     return false;
    // }
    render(){
        let { list, isDrag, left, top, tranLeft, tranTop} = this.state;
        return (
            <div ref={(el)=>{
                this.el = el;
            }} onSelect={(e)=>{
                //TODO:正常应该通过range对象，进行删除选区
                e.stopPropagation();
                e.preventDefault();
                return false;
            }} onMouseDown={this._mouseDown} onMouseMove={this.mouseMove} className={'drag-container'}>
                {isDrag ? (<DragSmallWin top={top} mouseUp={this.mouseUp} left={left} tranLeft={tranLeft} tranTop={tranTop}/>) : null}
                {list.map((item) => <DragItem key={item.id} id={item.id} color={item.color} mouseDown={this.mouseDown}>{item.name}</DragItem>)}
            </div>
        )
    }
    componentDidMount(){
        console.log(this.el);
    }
    //TODO: 点击之后，生成一个小框，然后这个框与鼠标一同移动，松开鼠标，更改要更换位置的标签位置
    mouseMove(e){
        // console.log(e.clientY);
        let { isDrag, mouseLeft, mouseTop} = this.state;
        if(!isDrag){
            return ;
        }
        this.setState({
            tranTop: e.clientY - mouseTop,
            tranLeft: e.clientX - mouseLeft
        });
    }
    mouseDown(msg){
        this.setState({
            currentMove: msg
        });
    }
    _mouseDown(e){
        console.log(e.clientY);
        //TODO: 生成一个小小的窗口，代替移动对向
        this.setState({
            isDrag:true,
            top: e.clientY + window.pageYOffset - this.el.offsetTop ,
            left:e.clientX - this.el.offsetLeft,
            mouseLeft:e.clientX,
            mouseTop:e.clientY
        });
    }
    mouseUp(){
        this.setState({
            isDrag:false,
            tranTop:0,
            tranLeft:0
        });
    }
}

export default DragContainer;