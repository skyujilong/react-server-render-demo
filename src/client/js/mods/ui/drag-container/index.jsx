import React,{Component} from 'react';
import DragItem from '../drag-item';
import DragSmallWin, { DragDownView} from '../drag-small-win';
import './scss/index.scss';
class DragContainer extends Component{

    constructor(props){
        super(props);
        this.mouseMove = this.mouseMove.bind(this);
        this.mouseDown = this.mouseDown.bind(this);
        this.mouseUp = this.mouseUp.bind(this);
        this._mouseDown = this._mouseDown.bind(this);
        this.dragItemDidMount = this.dragItemDidMount.bind(this);
        let list = [];
        let color = ['#000033', '#000066', '#000099', '#003333', '#003366', '#003399', '#006633', '#006666', '#006699', '#009966']
        for (let i = 0; i < 10; i++) {
            list.push(
                {
                    id: 'id-'+i,
                    name: '编号为：' + i,
                    color: color[i],
                    el:null
                }
            );
        }
        this.el = null;
        this.state = {
            list: list,//可拖拽组件对象列表
            currentMove:null,//当前拖拽的对象
            currentMoveIn:null,//当前所处拖拽的对象
            isDrag: false,//是否处于拖拽状态
            top:0,//拖拽对象 位置
            left: 0,//拖拽对象 位置
            tranTop: 0,//拖拽对象 移动位置
            tranLeft: 0,//拖拽对象 移动位置
            mouseLeft:0,//当前鼠标的位置
            mouseTop:0//当前鼠标的位置
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
        let { list, isDrag, left, top, tranLeft, tranTop, currentMoveIn} = this.state;
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
                {list.map((item,index) => {
                    if (currentMoveIn === index){
                        return <div key={item.id}><DragDownView></DragDownView><DragItem dragItemDidMount={this.dragItemDidMount}  id={item.id} color={item.color} mouseDown={this.mouseDown}>{item.name}</DragItem></div>
                    }
                    return <DragItem dragItemDidMount={this.dragItemDidMount} key={item.id} id={item.id} color={item.color} mouseDown={this.mouseDown}>{item.name}</DragItem>
                })}
            </div>
        )
    }
    componentDidMount(){
        console.log(this.el);
    }
    //TODO: 点击之后，生成一个小框，然后这个框与鼠标一同移动，松开鼠标，更改要更换位置的标签位置
    mouseMove(e){
        // console.log(e.clientY);
        let { isDrag, mouseLeft, mouseTop, list} = this.state;
        if(!isDrag){
            return ;
        }
        this.setState({
            tranTop: e.clientY - mouseTop,
            tranLeft: e.clientX - mouseLeft
        });
        //TODO: 根据当前鼠标的位置来确定，移动到具体的那个dragItem上了
        let mousePos = {
            offsetTop:e.clientY + window.pageYOffset,
            offsetLeft:e.clientX + window.pageXOffset
        };
        list.forEach((item,index)=>{
            if (item.el.offsetTop + item.el.offsetParent.offsetTop <= mousePos.offsetTop && mousePos.offsetTop < item.el.offsetTop + item.el.offsetParent.offsetTop + (window.getComputedStyle(item.el).height.replace('px','') - 0) ){
                this.setState({
                    currentMoveIn: index
                });
            }
        });
    }
    mouseDown(msg){
        this.setState({
            currentMove: msg
        });
    }
    _mouseDown(e){
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
            tranLeft:0,
            currentMoveIn:null,
            currentMove:null
        });
    }
    dragItemDidMount(id,el){
        let {list} = this.state;
        list.forEach((item,index)=>{
            if(item.id === id){
                list[index] = {
                    ...item,
                    el:el
                };
            }
        });
        this.setState({
            list:list
        });
    }
}

export default DragContainer;