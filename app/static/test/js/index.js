webpackJsonp([1],{

/***/ "./pages/js/page/index.js":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _react = __webpack_require__(\"./node_modules/react/react.js\");\n\nvar _react2 = _interopRequireDefault(_react);\n\nvar _reactDom = __webpack_require__(\"./node_modules/react-dom/index.js\");\n\nvar _reactDom2 = _interopRequireDefault(_reactDom);\n\nvar _reactHotLoader = __webpack_require__(\"./node_modules/react-hot-loader/index.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar render = function render(Component) {\n    _reactDom2.default.render(_react2.default.createElement(\n        _reactHotLoader.AppContainer,\n        null,\n        _react2.default.createElement(Component, null)\n    ), document.getElementById('root'));\n}; // main.js\n//\"dev-hmr-build\": \"node ./node_modules/webpack-dev-server/bin/webpack-dev-server.js --config ./webpack.config.js --host test.sina.com.cn --port 80 --hot --env.NODE_ENV=dev-hmr\",\n\n\nfunction Text() {\n    return _react2.default.createElement(\n        'div',\n        null,\n        'helloworld!'\n    );\n}\n\nrender(Text);\n\n// Webpack Hot Module Replacement API\nif (true) {\n    module.hot.accept(function () {\n        render(Text);\n    });\n}\n;\n\nvar _temp = function () {\n    if (typeof __REACT_HOT_LOADER__ === 'undefined') {\n        return;\n    }\n\n    __REACT_HOT_LOADER__.register(render, 'render', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/page/index.js');\n\n    __REACT_HOT_LOADER__.register(Text, 'Text', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/page/index.js');\n}();\n\n;\n\n//////////////////\n// WEBPACK FOOTER\n// ./pages/js/page/index.js\n// module id = ./pages/js/page/index.js\n// module chunks = 1\n\n//# sourceURL=webpack:///./pages/js/page/index.js?");

/***/ }),

/***/ 1:
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(\"./node_modules/babel-polyfill/lib/index.js\");\n__webpack_require__(\"./node_modules/react-hot-loader/patch.js\");\nmodule.exports = __webpack_require__(\"./pages/js/page/index.js\");\n\n\n//////////////////\n// WEBPACK FOOTER\n// multi babel-polyfill react-hot-loader/patch ./pages/js/page/index.js\n// module id = 1\n// module chunks = 1\n\n//# sourceURL=webpack:///multi_babel-polyfill_react-hot-loader/patch_./pages/js/page/index.js?");

/***/ })

},[1]);