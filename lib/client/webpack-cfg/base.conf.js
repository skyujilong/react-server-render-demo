'use strict';
// 基础文件

module.exports = {
    entry: 'replace',
    module: {
        rules: ['append'],
        noParse: 'replace'
    },
    output: 'replace',
    resolve: 'replace',
    context: 'replace',
    target: 'replace',
    plugins: ['append']
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;