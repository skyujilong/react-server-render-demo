'use strict';

var path = require('path');
var config = require('../config.js');

function spriteAlias() {
    var spritesList = config.sprites;
    var scssPath = path.resolve(__dirname, '..', 'pages', 'scss');
    var imgPath = path.resolve(__dirname, '..', 'pages', 'img');
    var alias = {};
    spritesList.forEach(function (item) {
        alias[item.name + '-sprite'] = path.join(scssPath, item.name + '-sprite.scss');
        alias[item.name] = path.join(imgPath, item.name + '-sprite.png');
    });
    return alias;
}

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.scss', '.png', '.tpl'],
        //modules模块下加入 扫描的文件夹
        // modules: ['scss', 'node_modules'],
        alias: Object.assign({
            /**
             * 自定义的别名在这里写
             */
        }, spriteAlias())
    }
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(spriteAlias, 'spriteAlias', 'src/client/webpack-cfg/resolve.conf.js');
}();

;