'use strict';

const merge = require('webpack-merge');
const htmlWebpackPlugins = require('./config/html-plugins-handler.js');
//入口文件扫描结果
const entryConf = require('./config/entry.conf.js');
// hot react入口
const hotEntryConf = require('./config/react.hot.entry.js');
// webpack 相关配置文件
// 基础配置
const baseConf = require('./config/base.conf.js');
// 开发环境配置
const devConf = require('./config/dev.conf.js');
// 热部署环境配置
const hmrConf = require('./config/hmr.conf.js');
// 线上配置
const prodConf = require('./config/prod.conf.js');
// 服务器配置
const devServerConf = require('./config/dev-server.js');
// 雪碧图相关组件
const spritePlugins = require('./config/sprite-plugins-config.js');
// common config
const commonConf = require('./config/common.conf.js');
module.exports = (env) => {
    // 根据 env判断当前的环境，之后进行 选择具体的配置文件进行编译
    let webpackConfig;
    let runMode = env['NODE_ENV'];
    let baseMerge = merge.strategy(baseConf);
    let htmlPlugins = htmlWebpackPlugins(entryConf.entry);
    switch (runMode) {
        case 'dev-server':
            // 启用自刷新的开发服务
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, devConf, htmlPlugins, devServerConf);
            break;
        case 'dev-hmr':
            // 启用热部署替换的开发服务
            webpackConfig = baseMerge(commonConf, spritePlugins, hotEntryConf, hmrConf, htmlPlugins, devServerConf);
            break;
        case 'dev-watch':
            // 启用watch的本地文件模式
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, devConf, htmlPlugins);
            break;
        case 'prod':
            // 生产环境
            webpackConfig = baseMerge(commonConf, spritePlugins, entryConf, prodConf, htmlPlugins);
            break;
    }
    return webpackConfig;
}