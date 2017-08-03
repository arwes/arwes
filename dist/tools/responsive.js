'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _settings = require('../settings');

var _settings2 = _interopRequireDefault(_settings);

var _getDims2 = require('./get-dims');

var _getDims3 = _interopRequireDefault(_getDims2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var responsive = {

  /**
   * Get the current responsive stats.
   * @return {Object} { small: Boolean, medium: Boolean, large: Boolean }
   */
  get: function get() {
    var _getDims = (0, _getDims3.default)(),
        width = _getDims.width;

    var _settings$responsive = _settings2.default.responsive,
        small = _settings$responsive.small,
        medium = _settings$responsive.medium;


    if (width <= small) {
      return { small: true };
    } else if (width <= medium) {
      return { medium: true };
    }

    return { large: true };
  },


  /**
   * Register a on resize window callback to know the current browser viewport
   * dimentions.
   * @param  {Function} callback - It's called on every window resize and receives
   * and object defining the current viewport size.
   * @return {Function} The event callback.
   */
  on: function on(callback) {

    var onChange = function onChange() {
      var stats = responsive.get();
      callback(stats);
    };

    window.addEventListener('resize', onChange);

    onChange();

    return onChange;
  },


  /**
   * Turns off a window on resize callback previously created.
   * @param  {Function} - The event callback.
   */
  off: function off(onChange) {
    window.removeEventListener('resize', onChange);
  }
};

exports.default = responsive;