'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const serve = require('koa-static');
const path = require('path');
// const render = require('koa-ejs');
const ReactDOMServer = require('react-dom/server');
import React from 'React';
import { Provider } from 'react-redux';
import { StaticRouter } from 'react-router-dom'
import App from '../client/js/mods/ui/app-container';
import create from '../client/js/mods/data/store';
import {getInfo,getArticle} from '../client/js/mods/data/action';
import preload from './pre-load-module';
import { initDynamicModule } from '../client/js/mods/ui/dynamic/fn';
import articleText from './article';
// import(/* webpackChunkName: "dynamic" */'../client/js/mods/ui/testapp/dynamic.jsx').then(function(){
//     console.log('sss');
// });
// import(/*webpackChunkName: "dynamic"*/'./demo.js').then(function(){

// });

//中间件配置位置
// app.use(logger());
//ejs配置
// render(app, {
//     root: path.join(__dirname, 'static','assets'),
//     layout: false,
//     viewExt: 'html',
//     cache: false,
//     debug: true,
//     open:'{{',
//     close:'}}'
// });
app.use(serve(path.resolve(__dirname, '..', 'static')));
app.use(function *(next){
    let __modules = modules.map((item) => {
        let __item = {
            keyPath: item.keyPath,
            module: item.module,
            bundleFileOnlinePath: item.bundleFileOnlinePath,
            // ...item,
            isMark: false,
            marked: function () {
                this.isMark = true;
            }
        }
        return __item;
    });
    this.__modules = __modules;
    yield next;
});
let modules = [], clientModuleInfo;
// app.use(serve(path.resolve(__dirname, '..', 'static', 'dll')));
router.get('/',function * (next){
    // console.log(this.__modules);
    // let __modules = modules.map((item)=>{
    //     let __item = {
    //         sourceFilePath: item.sourceFilePath,
    //         module: item.module,
    //         bundleFileOnlinePath: item.bundleFileOnlinePath,
    //         // ...item,
    //         isMark:false,
    //         marked: function(){
    //             this.isMark = true;
    //         }
    //     }
    //     return __item;
    // });
    // 异步模块
    // console.log(__modules);

    // console.log('get req!');
    let store = create({ info: { title:'hello world!'}});
    //想要在redux-thunk中完全的同构，需要进行在action中，return promise
    yield store.dispatch(getInfo('haha'));
    yield store.dispatch(getArticle());
    //并发的时候可以用Promise.all的这个方法来进行。
    // console.log(store.getState());
    //redux 异步同构

    //这里是一个同步操作啊 这里可以进行可以将异步模块注入到dynamic模块中，然后进行渲染标记。之后直出要加载的script标签。
    // initDynamicModule(__modules);
    // render.call(this, store);

    render.call(this,store);
    yield next;
});

function render(store){
    initDynamicModule(this.__modules);
    let context = {};
    let html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <StaticRouter location={this.request.url} context={context}>
                <App />
            </StaticRouter>
        </Provider>
    );
    //TODO: 判定出来 具体哪个异步模块被使用到了，之后给他的script内容动态插入到页面内，从而实现，整体静态直出。 
    let dynamicScript = [];
    for (let dynamicMoudle of this.__modules) {
        if (dynamicMoudle.isMark) {
            //这里版本号是不同步的 我勒个槽啊，注册的moduleid也是不同的，不过内容是一样的，我们来替换一下这里的版本号
            dynamicScript.push('<script src="http://test.sina.com.cn/' + dynamicMoudle.bundleFileOnlinePath + '"></script>');
        }
    }


    // console.log(store.getState());
    // console.log(html);
    // yield this.render('index',{data:{
    //     text:'<span>hello world</span>',
    //     num:1
    // }});
    this.body = `
        <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>TODO</title>
                    <link href="http://test.sina.com.cn/css/index.css" rel="stylesheet">
                    <script>
                        __initState__ = ${JSON.stringify(store.getState())};
                        __clientModuleInfo__ = ${clientModuleInfo};
                    </script>
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-shim.js"></script>
                    <script src="https://cdn.bootcss.com/es5-shim/4.5.10/es5-sham.js"></script>
                    <script src="http://test.sina.com.cn/js/manifest.js?_=${new Date().getTime()}"></script>
                    <!--
                    <script src="http://test.sina.com.cn/js/vendor.js?_=${new Date().getTime()}"></script>
                    -->
                    ${dynamicScript.join('')}
                    <script>
                    // 测试
                        // for(let i = 0; i<document.querySelectorAll('span').length; i++){
                        //     console.log(i);
                        //     let node = document.querySelectorAll('span')[i];
                        //     node.addEventListener('click',function(){
                        //         console.log(123456);
                        //     },false);
                        // }
                        
                    </script>
                    <script src="http://test.sina.com.cn/js/index.js?_=${new Date().getTime()}"></script>
                    
                </body>
            </html>
    `;
}


router.get('/dir',function*(next){
    let store = create({ info: { title: 'hello world!' } });
    render.call(this, store);
    // console.log(this.request.url);
    // this.body = JSON.stringify({code:200,data:'haha'});
    yield next;
});



router.get('/api/info',function*(next){
    this.body = JSON.stringify({
        'code':200,
        'data':'hello jilong5!'
    })
    yield next;
});

router.get('/api/solgen',function*(next){
    this.body = JSON.stringify({
        'code':200,
        'data':'http://simg.sinajs.cn/blog7newtpl/image/33/33_7/images/sinablogb.jpg'
    });
})

router.get('/api/article',function* (next){
    this.body = JSON.stringify({
        'code':200,
        'data': articleText
    });
    yield next;
});
router.get('/api/artList',function*(next){
    this.body = JSON.stringify({
        'code':200,
        'data': [{ "url": "http://blog.sina.com.cn/s/blog_519d678a0102xp76.html", "title": "被前妻骗走1000万自杀：如何有效防…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xp4r.html", "title": "薛之谦复婚：和前任复合是件很危险…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xoy2.html", "title": "榆林孕妇坠楼揭露出女人婚后惨淡的…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xovl.html", "title": "女人都是这样，被婚姻一步步套牢的…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xotz.html", "title": "有多少女人，被等待掩埋了一生？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xosk.html", "title": "命好的女人，都把时间留给了自己！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xooa.html", "title": "爱情才是女性世界里最毒的春药" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xokl.html", "title": "为啥你走到哪里，都特别容易让人讨…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xoig.html", "title": "七夕：世俗的节日，婚姻的劫日？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xohf.html", "title": "那些剽悍的小三都是哪里来的底气？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xods.html", "title": "只有这10种男人才有可能不出轨！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xoba.html", "title": "是什么原因导致现代人越来越性开放…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xo9h.html", "title": "怨不得别人，是你太早放弃了自己！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xo8p.html", "title": "真正幸福的婚姻，是能“各就各位”！…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xo65.html", "title": "那些出轨的女人都长什么样？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xo5t.html", "title": "每个女人都应该告诉老公这八句话！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xo3o.html", "title": "宁愿一个人孤独，也不要两个人寂寞…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnxx.html", "title": "对男人最大的绝望，莫过于你看到了…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnv2.html", "title": "对女人来说，比婚姻和孩子更重要的…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnn1.html", "title": "对老婆的态度，藏着一个男人最真实…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnlz.html", "title": "女人的直觉究竟有多准？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnl6.html", "title": "当一个女人总以这样的理由离家出走" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnhe.html", "title": "男女在婚姻中必须尽早明白的10个真…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xngh.html", "title": "曲面电视有哪些优势？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnge.html", "title": "陈俊生：坏男人出轨上天堂，好男人…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnfs.html", "title": "最能考验女人本性的，恰恰是老金这…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnbm.html", "title": "给你一个贺涵，你就真的能幸福吗？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xnay.html", "title": "女人，切莫让婚姻毁在了自己的嘴上…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn99.html", "title": "很多事情，挺过了今天就是胜利！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn86.html", "title": "男人所说的“我养你”，只不过是一种…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn5a.html", "title": "《我的前半生》：教你识别高段位小…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn4s.html", "title": "你有多偏激，你的婚姻就有多危险！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn3p.html", "title": "马伊琍《我的前半生》：不怕小三是…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xn26.html", "title": "自律地拒绝，才是最为高级的爱！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmxu.html", "title": "有些女人，一辈子都在和婚姻讲条件…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmwh.html", "title": "娶一个爱干净的女人做老婆有多重要…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmtw.html", "title": "女人有种品质，叫做自己赚钱自己花…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmqf.html", "title": "莫等病了再检查身体，别等老了再需…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmoc.html", "title": "不是男人太渣，而是女人高估了自己…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmmy.html", "title": "女人最怕的不是穷和丑，而是没有心…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmlb.html", "title": "莫让矫情的春药变成了婚姻的毒药" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmkt.html", "title": "男人最喜欢的“坏女人”是什么样子？…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmhp.html", "title": "为什么男人会心甘情愿被老婆“欺负”…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xme2.html", "title": "女人没骨气，婚姻没底气！" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xmbo.html", "title": "女人到底应不应该爱钱？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xm89.html", "title": "女人喜欢的“坏男人”是什么样子？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xm5q.html", "title": "为什么中国会有这么多的怨妇？" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xm4a.html", "title": "保卫婚姻不能光有正气，还得有邪气…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xm0m.html", "title": "为什么会有那么多人在离婚后越过越…" }, { "url": "http://blog.sina.com.cn/s/blog_519d678a0102xlza.html", "title": "别忘了给你的婚姻好好做个体检" }]
    });
    yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());
//提前保证加载完毕异步modules
preload.then(function(data){
    // console.log(data);
    modules = data[0];
    clientModuleInfo = data[1];
    // app.listen(80, () => {
    //     console.log('server start on: http://localhost:80');
    // });
    app.listen(3000,()=>{
        console.log('server start on: http://localhost:3000');
    });
},function(e){
    console.log(e.stack);
})
