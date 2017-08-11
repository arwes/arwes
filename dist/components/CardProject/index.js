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

var _fecha = require('fecha');

var _fecha2 = _interopRequireDefault(_fecha);

var _Frame = require('../Frame');

var _Frame2 = _interopRequireDefault(_Frame);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardProject = function (_Component) {
  _inherits(CardProject, _Component);

  function CardProject() {
    _classCallCheck(this, CardProject);

    return _possibleConstructorReturn(this, (CardProject.__proto__ || Object.getPrototypeOf(CardProject)).apply(this, arguments));
  }

  _createClass(CardProject, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          name = _props.name,
          stars = _props.stars,
          type = _props.type,
          date = _props.date,
          lang = _props.lang,
          className = _props.className,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['name', 'stars', 'type', 'date', 'lang', 'className', 'children']);

      var cls = (0, _classnames2.default)('arwes-card-project', className);

      var stats = [];

      // stars
      stats.push(_react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('i', { className: 'mdi mdi-circle' + (stars < 1 ? '-outline' : '') }),
        _react2.default.createElement('i', { className: 'mdi mdi-circle' + (stars < 2 ? '-outline' : '') }),
        _react2.default.createElement('i', { className: 'mdi mdi-circle' + (stars < 3 ? '-outline' : '') })
      ));

      // type
      stats.push(_react2.default.createElement(
        'span',
        null,
        _react2.default.createElement('i', { className: 'mdi mdi-' + type.icon }),
        ' ',
        type.name
      ));

      // date
      if (date) {
        stats.push(_react2.default.createElement(
          'time',
          { dateTime: _fecha2.default.format(date, 'YYYY-MM-DD') },
          _react2.default.createElement('i', { className: 'mdi mdi-calendar' }),
          ' ',
          _fecha2.default.format(date, 'YYYY-MM')
        ));
      }

      // lang
      stats.push(_react2.default.createElement(
        'span',
        { className: 'arwes-card-project__lang' },
        _react2.default.createElement('i', { className: 'mdi mdi-note-text' }),
        ' ',
        lang
      ));

      return _react2.default.createElement(
        'div',
        _extends({ className: cls, lang: lang }, rest),
        _react2.default.createElement(
          _Frame2.default,
          { border: true, corners: 2, level: -1 },
          _react2.default.createElement(
            'div',
            { className: 'arwes-card-project__head' },
            _react2.default.createElement(
              'h3',
              null,
              name
            ),
            _react2.default.createElement('i', { className: 'mdi mdi-package' })
          ),
          _react2.default.createElement(
            'div',
            { className: 'arwes-card-project__body' },
            _react2.default.createElement(
              'p',
              null,
              children
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'arwes-card-project__foot' },
            _react2.default.createElement(
              'p',
              null,
              stats.map(function (stat, index) {
                return stat && _react2.default.createElement(
                  'span',
                  { key: index, className: 'arwes-card-project__stat' },
                  stat
                );
              })
            )
          )
        )
      );
    }
  }]);

  return CardProject;
}(_react.Component);

exports.default = CardProject;


CardProject.propTypes = {
  name: _propTypes2.default.string.isRequired,
  children: _propTypes2.default.string.isRequired,
  stars: _propTypes2.default.oneOf([0, 1, 2, 3]),
  type: _propTypes2.default.shape({
    name: _propTypes2.default.string,
    icon: _propTypes2.default.string
  }),
  date: _propTypes2.default.object,
  lang: _propTypes2.default.string
};

CardProject.defaultProps = {
  stars: 0,
  type: {
    name: 'Project',
    icon: 'chip'
  },
  lang: 'en'
};