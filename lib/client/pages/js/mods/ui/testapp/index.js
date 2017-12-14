'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _action = require('../../data/action');

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

            getInfo('hello');
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

    __REACT_HOT_LOADER__.register(App, 'App', 'src/client/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(mapStateToProps, 'mapStateToProps', 'src/client/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(mapDispatchToProps, 'mapDispatchToProps', 'src/client/pages/js/mods/ui/testapp/index.jsx');

    __REACT_HOT_LOADER__.register(_default, 'default', 'src/client/pages/js/mods/ui/testapp/index.jsx');
}();

;