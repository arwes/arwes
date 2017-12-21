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
        return { small: true, status: 'small' };
      }
      else if (width <= medium) {
        return { medium: true, status: 'medium' };
      }
      else if (width <= large) {
        return { large: true, status: 'large' };
      }

      return { xlarge: true, status: 'xlarge' };
    },

    /**
     * Register a on resize window callback to know when the current browser viewport
     * dimentions make the breakpoint change.
     * @param  {Function} callback - It's called on every change on the breakpoint
     * and receives and object defining the current viewport size.
     * @return {Function} The event listener.
     */
    on (callback) {

      const current = this.get();
      let state = current.status;

      const onChange = () => {
        const stats = this.get();
        if (stats.status !== state) {
          callback(stats);
          state = stats.status;
        }
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
