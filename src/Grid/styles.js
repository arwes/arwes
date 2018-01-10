const columnStyles = (width) => ({
  width,
  marginLeft: 'auto',
  left: 'auto',
  right: 'auto',
});

const columnBaseStyles = (theme, size) => {
  let styles = {};
  let width;

  for (let index = 1; index <= theme.columns; index++) {
    width = 100 / (theme.columns / index) + '%';
    styles = {
      ...styles,
      [size + index]: columnStyles(width),
    };
  }

  return styles;
};

const columnExtraStyles = (theme, size) => {
  let styles = {};
  let width;

  for (let index = 1; index <= theme.columns; index++) {
    width = 100 / (theme.columns / index) + '%';
    styles = {
      ...styles,
      [`offset-${size}${index}`]: {
        marginLeft: width,
      },
    };
  }

  return styles;
};

export default (theme) => {
  return {
    row: {
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: theme.margin,

      // Clear floating children
      '&:after': {
        content: '""',
        display: 'table',
        clear: 'both',
      },
    },

    // When the row is nested inside a col
    nested: {
      marginLeft: -(theme.margin / 2),
      marginRight: -(theme.margin / 2),
    },

    noMargin: {
      marginBottom: 0,
    },

    col: {
      float: 'left',
      boxSizing: 'border-box',
      padding: `0 ${theme.margin / 2}px`,
      minHeight: 1,
    },

    noGutter: {
      padding: 0,
    },

    ...columnBaseStyles(theme, 's'),
    ...columnExtraStyles(theme, 's'),

    [`@media screen and (min-width: ${theme.responsive.small + 1}px)`]: {
      ...columnBaseStyles(theme, 'm'),
      ...columnExtraStyles(theme, 'm'),
    },

    [`@media screen and (min-width: ${theme.responsive.medium + 1}px)`]: {
      ...columnBaseStyles(theme, 'l'),
      ...columnExtraStyles(theme, 'l'),
    },

    [`@media screen and (min-width: ${theme.responsive.large + 1}px)`]: {
      ...columnBaseStyles(theme, 'xl'),
      ...columnExtraStyles(theme, 'xl'),
    },
  };
};
