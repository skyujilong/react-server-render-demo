'use strict';
'use store';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _reduxThunk = require('redux-thunk');

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = require('redux');

var _reducers = require('./reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootReducers = (0, _redux.combineReducers)({
    info: _reducers.info
});
// let store = createStore(rootReducers, applyMiddleware(ReduxThunk));
function create(preloadedState) {
    return (0, _redux.createStore)(rootReducers, preloadedState, (0, _redux.applyMiddleware)(_reduxThunk2.default));
};
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(create, 'create', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/mods/data/store.js');

    __REACT_HOT_LOADER__.register(rootReducers, 'rootReducers', '/Users/jilong5/git-workspace/react-server-render-demo/src/client/pages/js/mods/data/store.js');
}();

;