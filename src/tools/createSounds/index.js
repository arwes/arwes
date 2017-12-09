import extend from 'extend';
import sounds from './sounds';

/**
 * Extend the default sounds with new properties.
 * @param  {Object} overwrite
 * @return {Object}
 */
export default (overwrite) => {
  return extend(true, {}, sounds, overwrite);
};
