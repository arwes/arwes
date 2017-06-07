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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Frame = function (_Component) {
  _inherits(Frame, _Component);

  function Frame() {
    _classCallCheck(this, Frame);

    return _possibleConstructorReturn(this, (Frame.__proto__ || Object.getPrototypeOf(Frame)).apply(this, arguments));
  }

  _createClass(Frame, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          component = _props.component,
          border = _props.border,
          corners = _props.corners,
          content = _props.content,
          theme = _props.theme,
          className = _props.className,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['component', 'border', 'corners', 'content', 'theme', 'className', 'children']);

      var cls = (0, _classnames2.default)('arwes-frame', {
        'arwes-frame--content': content,
        'arwes-frame--border-up': border === 'up',
        'arwes-frame--border-down': border === 'down',
        'arwes-frame--corners1': corners === 1,
        'arwes-frame--corners2': corners === 2
      }, className);

      var clsCorners = (0, _classnames2.default)('arwes-frame__corner', 'arwes-frame__corner--l' + corners);

      return _react2.default.createElement(component, _extends({ className: cls, 'data-theme': theme }, rest), _react2.default.createElement(
        'div',
        { className: 'arwes-frame__box' },
        !!corners && _react2.default.createElement('div', { className: clsCorners + ' arwes-frame__lt' }),
        !!corners && _react2.default.createElement('div', { className: clsCorners + ' arwes-frame__lb' }),
        !!corners && _react2.default.createElement('div', { className: clsCorners + ' arwes-frame__rt' }),
        !!corners && _react2.default.createElement('div', { className: clsCorners + ' arwes-frame__rb' }),
        _react2.default.createElement(
          'div',
          { className: 'arwes-frame__content' },
          children
        )
      ));
    }
  }]);

  return Frame;
}(_react.Component);

exports.default = Frame;


Frame.propTypes = {
  component: _react.PropTypes.string,
  border: _react.PropTypes.oneOf(['up', 'down']),
  theme: _react.PropTypes.oneOf(['success', 'alert', 'disabled']),
  corners: _react.PropTypes.number
};

Frame.defaultProps = {
  component: 'div',
  border: null,
  theme: null,
  corners: 0
};