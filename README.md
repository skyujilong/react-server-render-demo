# react-server-render-demo
react server render demo
## 同构应用结论
优点：
1. 减少白屏时间，能够直出内容，加快用户首屏展示时间。（实际效果类似京东和天猫的首页）
2. 能够友好的支持seo相关。
3. 同构应用能够复用绝大部分代码，节约开发时间。

缺点：
1. 服务器端依然走了下面的几个声明周期constructor、componentWillMount、render,而client端则会走整个完整的生命周期，因此你在componentWillMount中发送的请求，会在服务器与client端都会发送，也就是说请求了二次服务器（通过编程手段应该能有予以取消）。
2. 因为如上生命周期的问题，因此vdom上的diff依然会发生，不过，取消了实际dom上的操作。（只不过，实际dom上的操作耗费时间更多！）
3. 前端需要懂得开发服务器相关的知识。