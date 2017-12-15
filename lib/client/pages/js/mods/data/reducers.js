'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.info = info;
function info() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: 'hello world2333' };
    var action = arguments[1];

    if (action.type === '') {
        return { info: action.data };
    } else {
        return state;
    }
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(info, 'info', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/mods/data/reducers.js');
}();

;