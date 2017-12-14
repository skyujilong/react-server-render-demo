'use strict';

var entryConfig = require('./entry.conf.js');
module.exports = {
    entry: function () {
        var entries = entryConfig.entry;
        var key = void 0,
            cfg = {};
        for (key in entries) {
            cfg[key] = ['babel-polyfill', 'react-hot-loader/patch', entries[key]];
        }
        return cfg;
    }()
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }
}();

;