'use strict';

var path = require('path');
var fs = require('fs');
var SpritesmithPlugin = require('webpack-spritesmith');
var config = require('../config.js');
var spritePlugins = [];
config.sprites.forEach(function (item) {
    var name = item.name.trim();
    var dir = path.resolve(__dirname, '..', 'pages', 'sprite', name);
    //如果没有这个文件夹就建立这个文件夹
    fs.stat(dir, function (err) {
        if (err) {
            fs.mkdir(dir, function () {
                console.log('generate dir' + name);
            });
        }
    });
    spritePlugins.push(new SpritesmithPlugin({
        src: {
            cwd: dir,
            glob: '*.*'
        },
        target: {
            image: path.resolve(__dirname, '..', 'pages/img/' + name + '-sprite.png'),
            css: path.resolve(__dirname, '..', 'pages/scss/' + name + '-sprite.scss')
        },
        apiOptions: {
            cssImageRef: '~' + name
        }
    }));
});
module.exports = {
    plugins: spritePlugins
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(spritePlugins, 'spritePlugins', 'src/client/webpack-cfg/sprite-plugins-config.js');
}();

;