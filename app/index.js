'use strict';
const logger = require('koa-logger');
const koa = require('koa');
const app = koa();
const router = require('koa-router')();
const serve = require('koa-static');
const path = require('path');
const render = require('koa-ejs');
const ReactDOMServer = require('react-dom/server');

//中间件配置位置
app.use(logger());
//ejs配置
render(app, {
    root: path.join(__dirname, 'static','assets'),
    layout: false,
    viewExt: 'html',
    cache: false,
    debug: true,
    open:'{{',
    close:'}}'
});
app.use(serve(path.resolve(__dirname, 'static', 'assets')));
// app.use(serve(path.resolve(__dirname, '..', 'static', 'dll')));
router.get('/',function * (next){
    //TODO: react server render!!!
    // ReactDOMServer.renderToString();
    yield this.render('index',{data:{
        text:'<span>hello world</span>',
        num:1
    }});
    yield next;
});
app.use(router.routes());
app.use(router.allowedMethods());

app.listen(80, () => {
    console.log('server start on: http://localhost:80');
});