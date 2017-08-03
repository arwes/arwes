'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Base container.
 */
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
          node = _props.node,
          border = _props.border,
          level = _props.level,
          corners = _props.corners,
          content = _props.content,
          theme = _props.theme,
          className = _props.className,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['node', 'border', 'level', 'corners', 'content', 'theme', 'className', 'children']);

      var cls = (0, _classnames2.default)('arwes-frame', {
        'arwes-frame--content': content,
        'arwes-frame--border': border,
        'arwes-frame--level1': level === 1,
        'arwes-frame--level2': level === 2,
        'arwes-frame--level3': level === 3,
        'arwes-frame--corners1': corners === 1,
        'arwes-frame--corners2': corners === 2,
        'arwes-frame--corners3': corners === 3
      }, className);

      var clsCorners = (0, _classnames2.default)('arwes-frame__corner', 'arwes-frame__corner--l' + corners);
      var boxStyle = border && { borderWidth: border === true ? '1px' : border };

      return _react2.default.createElement(node, _extends({ className: cls, 'data-theme': theme }, rest), _react2.default.createElement(
        'div',
        { className: 'arwes-frame__box', style: boxStyle },
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
  node: _propTypes2.default.string,
  border: _propTypes2.default.oneOfType([_propTypes2.default.bool, _propTypes2.default.string]),
  level: _propTypes2.default.oneOf([0, 1, 2, 3]),
  corners: _propTypes2.default.oneOf([0, 1, 2, 3]),
  theme: _propTypes2.default.oneOf(['success', 'alert', 'disabled'])
};

Frame.defaultProps = {
  node: 'div',
  border: null,
  level: 1,
  corners: 0,
  theme: null
};