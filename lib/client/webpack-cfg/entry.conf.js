/**
 * @auth jilong5 <jilong5@staff.sina.com.cn> 2016年11月29日13:56:08
 * 扫描目标节点，根据需要转化成对应的内容
 */
'use strict';

var glob = require('glob');
var path = require("path");
/**
 * 扫描入口文件
 * @return {Object}    返回扫描结果对象key值为入口文件的名字，value值为当前文件的绝对地址
 */
module.exports = {
    entry: function () {
        var jsDir = path.resolve(__dirname, '..', 'pages', 'js', 'page');
        var entryFiles = glob.sync(jsDir + '/*.js');
        var map = {};
        entryFiles.forEach(function (filePath) {
            var filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
            map[filename] = filePath;
        });
        return map;
    }()
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;