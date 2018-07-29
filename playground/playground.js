import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'react-jss';
import Navigo from 'navigo';

import createTheme from '../packages/arwes/src/tools/createTheme';
import ThemeProvider from '../packages/arwes/src/ThemeProvider';
import createSounds from '../packages/sounds/src/createSounds';
import SoundsProvider from '../packages/sounds/src/SoundsProvider';
import sandboxes from './sandboxes';

const theme = createTheme();
const sounds = createSounds({
  shared: { volume: 1 },
  players: {
    click: {
      sound: { src: ['/sound/click.mp3'] },
      settings: { oneAtATime: true }
    },
    typing: {
      sound: { src: ['/sound/typing.mp3'] },
      settings: { oneAtATime: true }
    },
    deploy: {
      sound: { src: ['/sound/deploy.mp3'] },
      settings: { oneAtATime: true }
    }
  }
});
const styles = {
  '@global': {
    html: {
      boxSizing: 'border-box'
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit'
    },
    'html, body': {
      margin: 0,
      padding: 0,
      backgroundColor: '#000'
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
    overflow: 'hidden',
    width: '100%',
    height: 40,
    borderBottom: '1px solid #0ff',
    backgroundColor: '#111',
    fontFamily: 'Monaco, Terminal, monospace',
    color: '#0ff'
  },
  headerTitle: {
    display: 'inline-block',
    margin: [0, 10],
    lineHeight: '40px',
    fontSize: 20,
    fontWeight: 'bold'
  },
  headerSelect: {
    display: 'inline-block',
    margin: [5, 0],
    height: 30,
    border: 'none',
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',

    backgroundColor: 'transparent',
    fontFamily: 'Monaco, Terminal, monospace',
    lineHeight: '30px',
    fontSize: 14,
    color: '#0ff',

    '& option': {
      backgroundColor: '#000',
      color: '#0ff'
    }
  },
  content: {
    flex: 1,
    position: 'relative',
    display: 'block',
    overflowY: 'auto'
  }
};

class PlaygroundSource extends React.Component {
  constructor() {
    super(...arguments);

    this.state = {
      sandboxName: ''
    };
  }

  componentDidMount() {
    this.router = new Navigo(null, true);

    this.router.on('/', () => {
      this.setState({ sandboxName: '' });
    });

    sandboxes.forEach(sandbox => {
      this.router
        .on(sandbox.name, () => this.setState({ sandboxName: sandbox.name }))
        .resolve();
    });
  }

  onChange = ev => {
    const sandboxName = ev.target.value;
    this.router.navigate(sandboxName);
  };

  render() {
    const { classes } = this.props;
    const { sandboxName } = this.state;

    const sandbox = sandboxes.find(item => item.name === sandboxName);

    return (
      <div className={classes.root}>
        <header className={classes.header}>
          <h1 className={classes.headerTitle}>Arwes Playground</h1>
          <select
            className={classes.headerSelect}
            value={sandboxName}
            onChange={this.onChange}
          >
            <option value="">-- Select component --</option>
            {sandboxes.map((item, index) => (
              <option key={index} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>
        </header>
        <main className={classes.content}>
          <ThemeProvider theme={theme}>
            <SoundsProvider sounds={sounds}>
              <div>{!!sandbox && <sandbox.component />}</div>
            </SoundsProvider>
          </ThemeProvider>
        </main>
      </div>
    );
  }
}

const Playground = withStyles(styles)(PlaygroundSource);

ReactDOM.render(<Playground />, document.querySelector('#root'));
