'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.default = Button;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function Button(props) {
  var className = props.className,
      children = props.children,
      rest = _objectWithoutProperties(props, ['className', 'children']);

  var cls = (0, _classnames2.default)('arwes-button', className);

  return _react2.default.createElement(
    'button',
    _extends({ className: cls }, rest),
    children
  );
}

Button.propTypes = {
  children: _react.PropTypes.any
};

Button.defaultProps = {
  //
};