'use strict';
const path = require('path');
const config = require('../../common-config/config.js');
//雪碧图生成的快捷路径
// let spriteAlias = (() => {
//     let obj = {};
//     config.sprites.forEach((item) => {
//         obj[item.name] = path.join(__dirname, '../../', 'client', 'img', item.name + '-sprite.png')
//     });
//     return obj;
// })();

function spriteAlias() {
    let spritesList = config.sprites;
    let scssPath = path.resolve(__dirname, '../../client/scss/');
    let imgPath = path.resolve(__dirname, '../../client/img/');
    let alias = {};
    spritesList.forEach((item) => {
        alias[`${item.name}-sprite`] = path.join(scssPath, `${item.name}-sprite.scss`);
        alias[item.name] = path.join(imgPath, `${item.name}-sprite.png`);
    });
    return alias;
}


module.exports = {
    module: {
        //将不会解析这些组件
        noParse: /jquery|zepto/
    },
    resolve: {
        modules: ["node_modules"],
        extensions: ['.js', , '.jsx', '.json', '.css', '.jpeg', '.png', '.jpg', '.tpl'],
        alias: Object.assign({
            /**
             * 自定义的别名在这里写
             */
        }, spriteAlias())
    },
    context: path.resolve(__dirname, '../../client/'),
    target: 'web'
};