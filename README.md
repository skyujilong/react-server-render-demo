# react-server-render-demo
react server render demo
## 同构应用结论

*适用版本 16.2.0*

16.2.0版本最大的改进，添加hydrate方法，解决原来老版本，在服务器端添加事件造成的内存不能够释放的问题。   
性能上有巨大的提升。

+react优点：
+1. 无刷新的单页面应用，用户体验更友好。
+2. 纯view层的框架，配合redux能够有一个非常清晰的开发流程。后期维护也好维护。
+3. 性能因为vdom + diff算法，能够有一个更加高效的渲染流程。

优点：
1. 减少白屏时间，能够直出内容，加快用户首屏展示时间。（实际效果类似京东和天猫的首页）
2. 能够友好的支持seo相关。
3. 同构应用能够复用绝大部分代码，节约开发时间。
4. 同构应用与传统应用相比较，因为直出内容dom结构均是前端代码同步而来，相比传统的前端给后端模版的方式，同步性更好。不容易出现因为dom节点渲染错位而产生展示上的问题。

缺点：
1. 服务器端依然走了下面的几个声明周期constructor、componentWillMount、render,而client端则会走整个完整的生命周期，因此你在componentWillMount中发送的请求，会在服务器与client端都会发送，也就是说请求了二次服务器（通过编程手段应该能有予以取消）。
2. 因为如上生命周期的问题，因此vdom上的diff依然会发生，不过，取消了实际dom上的操作。（只不过，实际dom上的操作耗费时间更多！）
3. 前端需要懂得开发服务器相关的知识。
4. 跨域的请求是没有办法支持服务器端渲染的（服务器没有对应的window环境，不能支持jsonp，只能自己手动写解析）。


## TODO
1. 解决server端打包与client打包，常量配置相关内容。
2. 添加路由相关配置
3. 添加动画相关测试实践
4. 文件结构调整。根目录下要有两套webpack文件
5. 代码分离同步方案核心，依托于webpack dynimac import + 在服务器端提前加载这个类库 + 提前将dynimac import生成的js引入到页面上。
## 优化方案
1. 采用高版本react 16
2. 采用react prod环境变量
3. 配置babel的一个两个优化组件
4. 采用高版本的node来作为服务器 比如8.9
5. 代码分割，采用一个react的高阶函数，同时屏蔽掉全局对象判断是否是后台环境，还是前端的环境，判断如果是后端的环境，将会当时就加载promise引入的包，之后替换到this.state.renderCompent中。

## 采用路径的方式作为key值，的替换方案。
看看能否采用计算文件内容的md5值进行。这样不同机器打包出来的key值是一致的

## react router 方案
### server 端采用react router应该如下：
```javascript
import { createServer } from 'http'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'

createServer((req, res) => {

  // This context object contains the results of the render
  const context = {}

  const html = ReactDOMServer.renderToString(
    {/*这里将访问的url注入到这里，在外侧可以集成store相关内容，考虑根绝url的参数变换，更换组件的状态，可能都需要写在componentDidMount这个回调上面了，因为，写在这个生命周期之前，可能会产生不同的问题，这里的renderToString方法是一个同步的方法*/}
    <StaticRouter location={req.url} context={context}>
      <App/>
    </StaticRouter>
  )

  // context.url will contain the URL to redirect to if a <Redirect> was used
  if (context.url) {
    res.writeHead(302, {
      Location: context.url
    })
    res.end()
  } else {
    res.write(html)
    res.end()
  }
}).listen(3000)

```
