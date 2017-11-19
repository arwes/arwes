import extend from 'extend';
import theme from './theme';

/**
 * Extend the default theme with new properties.
 * @param  {Object} overwrite
 * @return {Object}
 */
export default (overwrite) => {
  return extend(true, {}, theme, overwrite);
};
