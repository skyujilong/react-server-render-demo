'use strict';

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = require('react-redux');

var _reactHotLoader = require('react-hot-loader');

var _store = require('../mods/data/store');

var _store2 = _interopRequireDefault(_store);

var _testapp = require('../mods/ui/testapp');

var _testapp2 = _interopRequireDefault(_testapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// main.js
var render = function render(Component) {
    // 当判断是 hot模式的时候 不是服务器渲染模式 采用render api
    if (module.hot) {
        _reactDom2.default.render(
        // 全局函数  初始化的state内容
        _react2.default.createElement(
            _reactRedux.Provider,
            { store: (0, _store2.default)(window.__initState__) },
            _react2.default.createElement(
                _reactHotLoader.AppContainer,
                null,
                _react2.default.createElement(Component, null)
            )
        ), document.getElementById('root'));
    } else {
        _reactDom2.default.hydrate(
        // 全局函数  初始化的state内容
        _react2.default.createElement(
            _reactRedux.Provider,
            { store: (0, _store2.default)(window.__initState__) },
            _react2.default.createElement(
                _reactHotLoader.AppContainer,
                null,
                _react2.default.createElement(Component, null)
            )
        ), document.getElementById('root'));
    }
};

render(_testapp2.default);

// Webpack Hot Module Replacement API
if (module.hot) {
    module.hot.accept('../mods/ui/testapp', function () {
        render(_testapp2.default);
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(render, 'render', 'src/client/pages/js/page/index.js');
}();

;