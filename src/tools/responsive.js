import getDimensions from './get-dimensions';

export default (getTheme) => {
  return {

    /**
     * Get the current responsive stats.
     * @return {Object} { small: Boolean, medium: Boolean, large: Boolean }
     */
    get () {

      const theme = getTheme();
      const { width } = getDimensions();
      const { small, medium } = theme.responsive;

      if (width <= small) {
        return { small: true };
      }
      else if (width <= medium) {
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
    on (callback) {

      const onChange = () => {
        const stats = this.get();
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
    off (onChange) {
      window.removeEventListener('resize', onChange);
    },

  };
};
