'use strict';
import co from 'co';
import fs from 'fs';
import thunkify from 'thunkify';
import path from 'path';
import vm from 'vm';
import { inspect } from 'util';

// import('./demo');
// console.log(__webpack_require__(35));
// 可以通过 采用webpack的内置方法，进行操作
__webpack_require__.e(0).then(__webpack_require__.bind(null,35)).then((m)=>{
    console.log('-------------');
    console.log(m);
    console.log('-------------');
});
export default co(function *(){
    let files = yield thunkify(fs.readdir)(path.resolve(__dirname,'js'));
    let modulesNameReg = /^(.*)-chunk-[a-f0-9]{6}\.js$/;
    //获取异步加载模块的id
    let eIdReg = /exports.ids\s=\s\[(\d+)\]/;
    //模块的id
    let moduleId = /\/\*\*\*\/\s+(\d+):/;
    let moduleList = [];
    for(let fileName of files){
        console.log(fileName);
        let result = modulesNameReg.exec(files);
        if (!result) {
            continue;
        }
        let codeContext = yield thunkify(fs.readFile)('js/' + fileName,'utf-8');
        console.log(codeContext);
        console.log(codeContext.split(/\n/));
    }
    
});