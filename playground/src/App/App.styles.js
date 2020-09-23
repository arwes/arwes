const styles = {
  '@global': {
    '*, *:before, *:after': {
      boxSizing: 'border-box'
    },
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: '#000909'
    }
  },

  root: {
    position: 'fixed',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column'
  },

  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    overflow: 'hidden',
    width: '100%',
    height: 40,
    borderBottom: '1px solid #06d8d7',
    backgroundColor: '#031214',
    fontFamily: '"Titillium Web", sans-serif',
    color: '#a1ecfb',
    userSelect: 'none',

    '& a': {
      textDecoration: 'none',
      color: 'inherit',
      outline: 'none',

      '&hover, &:focus': {
        outline: 'none'
      }
    }
  },
  headerHeading: {
    display: 'flex',
    flexDirection: 'row'
  },
  headerLogo: {
    display: 'inline-block',
    margin: 7,
    width: 26,
    height: 26
  },
  headerTitle: {
    display: 'inline-block',
    margin: [0, 10, 0, 0],
    lineHeight: '40px',
    fontSize: 20,
    fontWeight: 'bold'
  },

  body: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row'
  },

  controls: {
    borderRight: '1px solid #06d8d7',
    padding: 10,
    width: 200,
    backgroundColor: '#031214'
  },

  content: {
    flex: 1,
    position: 'relative',
    display: 'block',
    overflowY: 'auto',
    padding: 20
  },

  select: {
    display: 'block',
    border: 'none',
    margin: [0, 0, 10],
    padding: 0,
    width: '100%',
    height: 26,
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    fontFamily: '"Titillium Web", sans-serif',
    lineHeight: '26px',
    fontSize: 14,
    color: '#a1ecfb',

    '& option, & optgroup': {
      backgroundColor: '#031214',
      color: '#a1ecfb'
    }
  }
};

export { styles };
