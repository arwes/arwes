import isNode from 'detect-node';
import getDimensions from '../get-dimensions';

/**
 * Create a handler for responsive functionalities.
 * @param  {Object} depencencies - Depencencies.
 * @param  {Function} depencencies.getTheme - Inject the theme settings.
 * @param  {Function} depencencies.getDimensions - Inject the get dimensions tool.
 * @return {Object} - Handler.
 */
export default (depencencies) => {
  const deps = {
    getTheme: () => ({}),
    getDimensions,
    ...depencencies
  };
  return {

    /**
     * Get the current responsive stats.
     * @return {Object} { small: Boolean, medium: Boolean, large: Boolean }
     */
    get () {

      const theme = deps.getTheme();
      const { width } = deps.getDimensions();
      const { small, medium, large } = theme.responsive;

      if (width <= small) {
        return { small: true };
      }
      else if (width <= medium) {
        return { medium: true };
      }
      else if (width <= large) {
        return { large: true };
      }

      return { xlarge: true };
    },

    /**
     * Register a on resize window callback to know the current browser viewport
     * dimentions.
     * @param  {Function} callback - It's called on every window resize and receives
     * and object defining the current viewport size.
     * @return {Function} The event callback.
     */
    on (callback) {

      const onChange = () => {
        const stats = this.get();
        callback(stats);
      };

      if (!isNode) {
        window.addEventListener('resize', onChange, false);
      }

      return onChange;
    },

    /**
     * Turns off a window on resize callback previously created.
     * @param  {Function} - The event callback.
     */
    off (onChange) {
      if (!isNode) {
        window.removeEventListener('resize', onChange, false);
      }
    },

  };
};
