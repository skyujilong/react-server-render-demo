'use strict';
import co from 'co';
import fs from 'fs';
import thunkify from 'thunkify';
import path from 'path';
import vm from 'vm';
import { inspect } from 'util';

export default co(function *(){
    let moduleList = [];
    let serverBundleListStr = yield thunkify(fs.readFile)(path.resolve(__dirname,'./server-dynamic-bundle.json'));
    let serverBundleList = JSON.parse(serverBundleListStr.toString());
    let clientBundleListStr = yield thunkify(fs.readFile)(path.resolve(__dirname, '../static/client-dynamic-bundle.json'));
    let clientBundleList = JSON.parse(clientBundleListStr.toString());
    
    for (let serverBundle of serverBundleList){
        for (let clientBundle of clientBundleList){
            if (serverBundle.keyPath === clientBundle.keyPath){
                //利用webpack的内部方法__webpack_require__ 将依赖进行提前加载
                let __module = yield __webpack_require__.e(serverBundle.chunk.id).then(__webpack_require__.bind(null, serverBundle.id));
                moduleList.push({
                    //比对的key值 位置
                    sourceFilePath: serverBundle.keyPath,
                    //异步module对象
                    module: __module,
                    //线上文件对应的地址
                    bundleFileOnlinePath: clientBundle.chunk.path
                });
            }
        }
    }

    return [moduleList, clientBundleListStr];

});
// import('./demo');
// console.log(__webpack_require__(35));
// 可以通过 采用webpack的内置方法，进行操作
// export default co(function *(){
//     let feFiles = yield thunkify(fs.readdir)(path.resolve(__dirname,'../static/js'));
//     let files = yield thunkify(fs.readdir)(path.resolve(__dirname,'js'));
//     let modulesNameReg = /^(.*)-chunk-[a-f0-9]{6}\.js$/;
//     //获取异步加载模块的id
//     let eIdReg = /exports.ids\s=\s\[(\d+)\]/;
//     //模块的id
//     let moduleId = /\/\*\*\*\/\s+(\d+):/;
//     let moduleList = [];
//     for(let fileName of files){
//         let __feFileName;
//         let result = modulesNameReg.exec(fileName);
//         if (!result) {
//             continue;
//         }
//         for (let feFileName of feFiles){
//             let feResult = modulesNameReg.exec(feFileName);
//             if (feResult && feResult[1] === result[1]){
//                 __feFileName = feFileName;
//             }
//         }

//         let codeContent = yield thunkify(fs.readFile)('js/' + fileName,'utf-8');
//         // console.log(codeContent);
//         let listContent = codeContent.split(/\n/);
//         //chunkId
//         let chunkId = eIdReg.exec(listContent[0])[1];
//         //chunkId中的moduleId
//         let __moduleId = moduleId.exec(listContent[3])[1];
//         //利用webpack的内部方法__webpack_require__ 将依赖进行提前加载
//         let __module = yield __webpack_require__.e(chunkId).then(__webpack_require__.bind(null, __moduleId));
//         //将该模块放入到代理list中，进行按需替换到对应的class中
//         // put(result[1],__module);
//         moduleList.push({
//             key: result[1],
//             module: __module,
//             fileName: __feFileName            
//         });
//     }
//     return moduleList;
    
// });