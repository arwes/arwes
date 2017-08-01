import settings from '../settings';
import getDims from './get-dims';

export default {

  /**
   * Register a on resize window callback to know the current browser viewport
   * dimentions.
   * @param  {Function} callback - It's called on every window resize and receives
   * and object defining the current viewport size.
   * @return {Function} The event callback.
   */
  on (callback) {

    const onChange = function () {

      const { width } = getDims();
      const { small, medium } = settings.responsive;

      if (width <= small) {
        callback({ small: true });
      }
      else if (width <= medium) {
        callback({ medium: true });
      }
      else {
        callback({ large: true });
      }
    };

    window.addEventListener('resize', onChange);

    onChange();

    return onChange;
  },

  /**
   * Turns off a window on resize callback previously created.
   * @param  {Function} - The event callback.
   */
  off (onChange) {
    window.removeEventListener('resize', onChange);
  },

};
