'use strict';

var merge = require('webpack-merge');
var htmlWebpackPlugins = require('./webpack-cfg/html-plugins-handler.js');
//入口文件扫描结果
var entryConf = require('./webpack-cfg/entry.conf.js');
// hot react入口
var hotEntryConf = require('./webpack-cfg/react.hot.entry.js');
// webpack 相关配置文件
// 基础配置
var baseConf = require('./webpack-cfg/base.conf.js');
// 开发环境配置
var devConf = require('./webpack-cfg/dev.conf.js');
// 热部署环境配置
var hmrConf = require('./webpack-cfg/hmr.conf.js');
// 线上配置
var prodConf = require('./webpack-cfg/prod.conf.js');
// resovle相关配置
var resovle = require('./webpack-cfg/resolve.conf.js');
// 服务器配置
var devServerConf = require('./webpack-cfg/dev-server.js');
// 雪碧图相关组件
var spritePlugins = require('./webpack-cfg/sprite-plugins-config.js');
// common config
var commonConf = require('./webpack-cfg/common.conf.js');
module.exports = function (env) {
    // 根据 env判断当前的环境，之后进行 选择具体的配置文件进行编译
    var webpackConfig = void 0;
    var runMode = env['NODE_ENV'];
    var baseMerge = merge.strategy(baseConf);
    var htmlPlugins = htmlWebpackPlugins(entryConf.entry);
    switch (runMode) {
        case 'dev-server':
            // 启用自刷新的开发服务
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, devConf, resovle, htmlPlugins, devServerConf);
            break;
        case 'dev-hmr':
            // 启用热部署替换的开发服务
            webpackConfig = baseMerge(commonConf, spritePlugins, hotEntryConf, hmrConf, resovle, htmlPlugins, devServerConf);
            break;
        case 'dev-watch':
            // 启用watch的本地文件模式
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, devConf, resovle, htmlPlugins);
            break;
        case 'prod':
            // 生产环境
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, prodConf, resovle, htmlPlugins);
            break;
    }
    return webpackConfig;
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;