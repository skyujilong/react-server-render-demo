'use strict';
const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

// function spriteAlias() {
//     let spritesList = config.sprites;
//     let scssPath = path.resolve(__dirname, '../../client/scss/');
//     let imgPath = path.resolve(__dirname, '../../client/img/');
//     let alias = {};
//     spritesList.forEach((item) => {
//         alias[`${item.name}-sprite`] = path.join(scssPath, `${item.name}-sprite.scss`);
//         alias[item.name] = path.join(imgPath, `${item.name}-sprite.png`);
//     });
//     return alias;
// }



module.exports = {
    entry: {
        index: path.resolve(__dirname, '../server/index.js')
    },
    //target node的时候 context决定了 你的__filename 以及__dirname的值，目前context定在当前的webpack配置文件下，就是index.js同目录，那么你需要cd到同样的目录下 进行node index.js 前面如果有其他路径，会导致路径解析不准确。
    context: path.resolve(__dirname,'../server/'),
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader'
        }, {
            // 不输出内容
            test: /\.(scss|css)$/,
            loader: 'css-loader/locals'
        }, {
            // 同样不输出内容
            test: /\.(png|jpeg|jpg|gif)$/,
            loader: 'url-loader',
            options: {
                emitFile: false,
                limit: 1,
                name: 'img/[name].[ext]',
                publicPath: 'http://test.sina.com.cn/'
            }
        }]
    },
    output: {
        path: path.resolve(__dirname, '../../assets/server'),
        filename: '[name].js',
        publicPath: '/',
        chunkFilename: 'js/[name]-chunk-[chunkhash:6].js',
        libraryTarget: 'commonjs2'
    },
    plugins: [
        new CleanWebpackPlugin(['server'], {
            root: path.resolve(__dirname, '../../assets')
        })
    ],
    target: 'node',
    node: {
        __dirname: true,
        __filename: true
    },
    resolve: {
        extensions: ['.js', '.jsx', '.json', '.css', '.jpeg', '.png', '.jpg', '.tpl']
    },
    externals: [nodeExternals()]
}