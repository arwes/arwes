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

var _docReady = require('doc-ready');

var _docReady2 = _interopRequireDefault(_docReady);

var _getDims2 = require('../../tools/get-dims');

var _getDims3 = _interopRequireDefault(_getDims2);

var _responsive = require('../../tools/responsive');

var _responsive2 = _interopRequireDefault(_responsive);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// How often to create new puffs. Should be greater than 4 seconds.
var ARWES_PUFFS_INTERVAL = 5000;

/**
 * Application container.
 */

var Arwes = function (_Component) {
  _inherits(Arwes, _Component);

  function Arwes() {
    _classCallCheck(this, Arwes);

    var _this = _possibleConstructorReturn(this, (Arwes.__proto__ || Object.getPrototypeOf(Arwes)).apply(this, arguments));

    _this.onPuffs = function () {

      var puffs = [];
      for (var i = 0; i < 10; i++) {
        puffs.push(_this.createPuff());
      }

      puffs.forEach(function (puff) {
        return _this.elIntern.appendChild(puff);
      });

      _this.puffTimeout = setTimeout(function () {
        puffs.forEach(function (puff) {
          return puff.remove();
        });
      }, ARWES_PUFFS_INTERVAL - 100);
    };

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
        return _this2.setState({ ready: true });
      });

      this.puffInterval = setInterval(this.onPuffs, ARWES_PUFFS_INTERVAL);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      clearInterval(this.puffInterval);
      clearTimeout(this.puffTimeout);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props = this.props,
          anim = _props.anim,
          resources = _props.resources,
          className = _props.className,
          children = _props.children,
          rest = _objectWithoutProperties(_props, ['anim', 'resources', 'className', 'children']);

      var cls = (0, _classnames2.default)('arwes', {
        'arwes--ready': this.state.ready,
        'arwes--resources': resources,
        'arwes--anim': anim
      }, className);

      var _ref = resources || {},
          patternImage = _ref.pattern,
          bg = _ref.bg;

      var patternStyle = void 0;
      if (this.state.ready && patternImage) {
        patternStyle = { backgroundImage: 'url(' + patternImage + ')' };
      }

      var bgImage = void 0;
      var bgStyle = void 0;
      if (typeof bg === 'string') {
        bgImage = bg;
      } else if (bg) {
        var dims = _responsive2.default.get();
        bgImage = dims.small ? bg.small : dims.medium ? bg.medium : bg.large;
      }
      if (this.state.ready && bgImage) {
        bgStyle = { backgroundImage: 'url(' + bgImage + ')' };
      }

      return _react2.default.createElement(
        'div',
        _extends({ className: cls, style: bgStyle }, rest),
        _react2.default.createElement(
          'div',
          { className: 'arwes__pattern', style: patternStyle },
          _react2.default.createElement('div', { className: 'arwes__intern', ref: function ref(el) {
              return _this3.elIntern = el;
            } }),
          _react2.default.createElement(
            'div',
            { className: 'arwes__main' },
            children
          )
        )
      );
    }

    /**
     * Create a random set of puffs on the back of the container.
     */

  }, {
    key: 'createPuff',


    /**
     * Create a puff with random valid properties.
     * @return  {DOMElement}
     */
    value: function createPuff() {

      var el = document.createElement('div');
      el.setAttribute('class', 'arwes__puff');

      if (Math.round(Math.random())) {
        el.setAttribute('class', 'arwes__puff arwes__puff--1');
      }

      var time = 1000 + Math.round(Math.random() * 3000);
      el.style.animationDuration = time + 'ms';

      var _getDims = (0, _getDims3.default)(),
          width = _getDims.width,
          height = _getDims.height;

      el.style.left = 50 + Math.round(Math.random() * width - 100) + 'px';
      el.style.top = 100 + Math.round(Math.random() * height - 200) + 'px';

      return el;
    }
  }]);

  return Arwes;
}(_react.Component);

exports.default = Arwes;


Arwes.propTypes = {

  /**
   * Resources to render.
   */
  resources: _propTypes2.default.shape({

    // Background
    bg: _propTypes2.default.oneOfType([_propTypes2.default.string, _propTypes2.default.shape({
      small: _propTypes2.default.string,
      medium: _propTypes2.default.string,
      large: _propTypes2.default.string
    })]),

    // Pattern
    pattern: _propTypes2.default.string
  }),

  /**
   * Animations enabled.
   */
  anim: _propTypes2.default.bool
};

Arwes.defaultProps = {
  resources: null,
  anim: false
};