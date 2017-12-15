export default (theme) => {
  return {
    root: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      display: 'flex',

      '& h1': {
        margin: [0, 0, theme.margin / 2],
        fontSize: 40,
      },
      '& p': {
        margin: [0, 0, theme.margin],
        maxWidth: 500,
      },
      '& $option + $option': {
        marginLeft: theme.padding / 2,
      },
    },

    main: {
      textAlign: 'center',
      margin: 'auto',
      padding: [0, theme.padding],
    },

    option: {},
  };
};
