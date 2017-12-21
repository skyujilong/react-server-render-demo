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
import App from '../client/pages/js/mods/ui/testapp/index';
import create from '../client/pages/js/mods/data/store';
import {getInfo} from '../client/pages/js/mods/data/action';
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
// app.use(serve(path.resolve(__dirname, '..', 'static', 'dll')));
router.get('/',function * (next){
    // console.log('get req!');
    let store = create({ info: { title:'hello world!'}});
    //想要在redux-thunk中完全的同构，需要进行在action中，return promise
    yield getInfo('haha')(store.dispatch);
    console.log(store.getState());
    // TODO: redux 异步同构

    let html = ReactDOMServer.renderToString(
        <Provider store={store}>
            <App />
        </Provider>
    );
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
                    <script src="http://test.sina.com.cn/js/index.js"></script>
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
app.listen(80, () => {
    console.log('server start on: http://localhost:80');
});