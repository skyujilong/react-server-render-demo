'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInfo = getInfo;

var _isomorphicFetch = require('isomorphic-fetch');

var _isomorphicFetch2 = _interopRequireDefault(_isomorphicFetch);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function reqInfo() {
    return {
        type: 'reqInfo'
    };
}
function reqInfoSucc(data) {
    return {
        type: 'reqInfoSucc',
        data: data
    };
}
function reqInfoErr() {
    return {
        type: 'reqInfoErr'
    };
}

function getInfo(args) {
    //采用thunk中间件，因此这里return 
    return function (dispatch) {
        dispatch(reqInfo());
        console.log(_isomorphicFetch2.default);
        (0, _isomorphicFetch2.default)('http://test.sina.com.cn/api/info').then(function (res) {
            console.log('fetching ..........');
            return res.json();
        }).then(function (res) {
            if (res.code === 200) {
                dispatch(reqInfoSucc(res.data));
            } else {
                dispatch(reqInfoErr());
            }
        }, function (res) {
            dispatch(reqInfoErr());
        }).catch(function (e) {
            console.log(e);
        });
    };
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(reqInfo, 'reqInfo', 'src/client/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(reqInfoSucc, 'reqInfoSucc', 'src/client/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(reqInfoErr, 'reqInfoErr', 'src/client/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(getInfo, 'getInfo', 'src/client/pages/js/mods/data/action.js');
}();

;