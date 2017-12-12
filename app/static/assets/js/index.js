webpackJsonp([1],{

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

"use strict";

'use store';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = create;

var _reduxThunk = __webpack_require__(74);

var _reduxThunk2 = _interopRequireDefault(_reduxThunk);

var _redux = __webpack_require__(26);

var _reducers = __webpack_require__(34);

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

    __REACT_HOT_LOADER__.register(rootReducers, 'rootReducers', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/store.js');

    __REACT_HOT_LOADER__.register(create, 'create', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/store.js');
}();

;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactRedux = __webpack_require__(11);

var _action = __webpack_require__(33);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_Component) {
    _inherits(App, _Component);

    //添加生命周期测试
    /**
     * 初始化构造器
     * @param {*} props 
     */
    function App(props) {
        _classCallCheck(this, App);

        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

        console.log('constructor');
        return _this;
    }
    /**
     * 将要开始挂在
     */


    _createClass(App, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
            console.log('componentWillMount');
            var getInfo = this.props.getInfo;
            // getInfo('hello');
        }
        /**
         * 获取将要变更的props 与 store
         */

    }, {
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps() {
            console.log('componentWillReceiveProps');
        }

        /**
         * 组件是否要变更，走渲染逻辑（渲染前，回进行dom比对）
         */

    }, {
        key: 'shouldComponentUpdate',
        value: function shouldComponentUpdate() {
            console.log('shouldComponentUpdate');
            return true;
        }

        /**
         * 渲染进行中
         */

    }, {
        key: 'render',
        value: function render() {
            console.log('render');
            var title = this.props.title;

            return _react2.default.createElement(
                'div',
                null,
                _react2.default.createElement(
                    'p',
                    null,
                    title
                ),
                _react2.default.createElement(
                    'p',
                    null,
                    'hehe!2'
                )
            );
        }
        /**
         * 组件更新完毕
         */

    }, {
        key: 'componentDidUpdate',
        value: function componentDidUpdate() {
            console.log('componentDidUpdate');
        }

        /**
         * 挂载完毕
         */

    }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
            console.log('componentDidMount');
        }
    }]);

    return App;
}(_react.Component);

function mapStateToProps(state) {
    return {
        title: state.info.title
    };
}
function mapDispatchToProps(dispatch) {
    return {
        getInfo: function getInfo() {
            for (var _len = arguments.length, rest = Array(_len), _key = 0; _key < _len; _key++) {
                rest[_key] = arguments[_key];
            }

            dispatch((0, _action.getInfo)(rest));
        }
    };
}

var _default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

exports.default = _default;
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(App, 'App', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/ui/testapp/index.jsx');
}();

;

/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.getInfo = getInfo;

var _isomorphicFetch = __webpack_require__(46);

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
        (0, _isomorphicFetch2.default)('//test.sina.com.cn/api/info').then(function (res) {
            return res.json();
        }).then(function (res) {
            if (res.code === 200) {
                dispatch(reqInfoSucc());
            } else {
                dispatch(reqInfoErr());
            }
        }, function (res) {
            dispatch(reqInfoErr());
        });
    };
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(reqInfo, 'reqInfo', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(reqInfoSucc, 'reqInfoSucc', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(reqInfoErr, 'reqInfoErr', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/action.js');

    __REACT_HOT_LOADER__.register(getInfo, 'getInfo', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/action.js');
}();

;

/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.info = info;
function info() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { title: 'hello world' };
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

    __REACT_HOT_LOADER__.register(info, 'info', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/mods/data/reducers.js');
}();

;

/***/ }),

/***/ 36:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _react = __webpack_require__(2);

var _react2 = _interopRequireDefault(_react);

var _reactDom = __webpack_require__(31);

var _reactDom2 = _interopRequireDefault(_reactDom);

var _reactRedux = __webpack_require__(11);

var _reactHotLoader = __webpack_require__(32);

var _store = __webpack_require__(29);

var _store2 = _interopRequireDefault(_store);

var _testapp = __webpack_require__(30);

var _testapp2 = _interopRequireDefault(_testapp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// main.js
var render = function render(Component) {
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
};

render(_testapp2.default);

// Webpack Hot Module Replacement API
if (false) {
    module.hot.accept('../mods/ui/testapp', function () {
        render(_testapp2.default);
    });
}
;

var _temp = function () {
    if (typeof __REACT_HOT_LOADER__ === 'undefined') {
        return;
    }

    __REACT_HOT_LOADER__.register(render, 'render', '/Users/jilong5/git-workspace/react-server-render-demo/app/static/pages/js/page/index.js');
}();

;

/***/ })

},[36]);