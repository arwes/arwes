'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _docReady = require('doc-ready');

var _docReady2 = _interopRequireDefault(_docReady);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Arwes = function (_Component) {
  _inherits(Arwes, _Component);

  function Arwes() {
    _classCallCheck(this, Arwes);

    var _this = _possibleConstructorReturn(this, (Arwes.__proto__ || Object.getPrototypeOf(Arwes)).apply(this, arguments));

    _this.state = {
      ready: false
    };
    return _this;
  }

  _createClass(Arwes, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      (0, _docReady2.default)(function () {
        _this2.setState({ ready: true });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props = this.props,
          resources = _props.resources,
          className = _props.className,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['resources', 'className', 'children']);

      var cls = (0, _classnames2.default)('arwes', {
        'arwes--resources': resources,
        'arwes--ready': this.state.ready
      }, className);

      return _react2.default.createElement(
        'div',
        _extends({ className: cls }, rest),
        _react2.default.createElement(
          'div',
          { className: 'arwes__pattern' },
          _react2.default.createElement('div', { className: 'arwes__intern' }),
          _react2.default.createElement(
            'div',
            { className: 'arwes__main' },
            children
          )
        )
      );
    }
  }]);

  return Arwes;
}(_react.Component);

exports.default = Arwes;


Arwes.propTypes = {
  resources: _react.PropTypes.bool
};

Arwes.defaultProps = {
  resources: false
};