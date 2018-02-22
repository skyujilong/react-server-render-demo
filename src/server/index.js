'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const serve = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
const ReactDOMServer = require('react-dom/server');
import React from 'React';
import { Provider } from 'react-redux';
import App from '../client/js/mods/ui/testapp/index';
import create from '../client/js/mods/data/store';
import {getInfo} from '../client/js/mods/data/action';
import preload from './pre-load-module';
import { initDynamicModule } from '../client/js/mods/ui/dynamic/fn';

// import(/* webpackChunkName: "dynamic" */'../client/js/mods/ui/testapp/dynamic.jsx').then(function(){
//     console.log('sss');
// });
// import(/*webpackChunkName: "dynamic"*/'./demo.js').then(function(){

// });

//中间件配置位置
app.use(logger());
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
            sourceFilePath: item.sourceFilePath,
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
    yield* next;
});
let modules = [];
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
    //并发的时候可以用Promise.all的这个方法来进行。
    console.log(store.getState());
    //redux 异步同构

    //这里是一个同步操作啊 这里可以进行可以将异步模块注入到dynamic模块中，然后进行渲染标记。之后直出要加载的script标签。
    // initDynamicModule(__modules);
    initDynamicModule(this.__modules);
    let html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
    //TODO: 判定出来 具体哪个异步模块被使用到了，之后给他的script内容动态插入到页面内，从而实现，整体静态直出。 
    let dynamicScript = [];
    for (let dynamicMoudle of this.__modules){
        if (dynamicMoudle.isMark){
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
                    </script>
                </head>
                <body>
                    <div id="root">${html}</div>
                    <script>
                        // 添加这个click事件，进行测试，是否body上的节点进行渲染了2次。 实际证明上述节点并没有渲染2次。
                        // 但是react的生命周期走了两次，一次是在服务器端，一次是在浏览器端，节点还能响应点击事件，证明react进行了vdom节点的比较对，发现没有不一致，所以不进行实际dom的渲染操作。
                        document.querySelector('p').addEventListener('click',function(){
                            console.log('click...');
                        },false);
                    </script>
                    <script src="http://test.sina.com.cn/js/manifest.js"></script>
                    <script src="http://test.sina.com.cn/js/vendor.js"></script>
                    <!-- 
                    <script src="http://test.sina.com.cn/js/dynamic-chunk-697ebf.js"></script>
                    -->
                    ${dynamicScript.join('')}
                    <script src="http://test.sina.com.cn/js/index.js"></script>
                    <script>
                        for(let i = 0; i<document.querySelectorAll('span').length; i++){
                            let node = document.querySelectorAll('span')[i];
                            node.addEventListener('click',function(){
                                console.log(123456);
                            },false);
                        }
                        
                    </script>
                </body>
            </html>
    `
    yield next;
});
router.get('/api/info',function*(next){
    this.body = JSON.stringify({
        'code':200,
        'data':'hello jilong5!'
    })
    yield next;
});

app.use(router.routes());
app.use(router.allowedMethods());
//提前保证加载完毕异步modules
preload.then(function(data){
    // console.log(data);
    modules = data;
    //要是将这里的内容
    app.listen(80, () => {
        console.log('server start on: http://localhost:80');
    });
},function(e){
    console.log(e.stack);
})
