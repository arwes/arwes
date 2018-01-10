import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Navigo from 'navigo';

import * as arwes from '../src';
import { ThemeProvider, createTheme, SoundsProvider, createSounds } from '../src';
import componentsList from './components';

const sounds = {
  shared: { volume: 1 },
  players: {
    click: {
      sound: { src: ['/static/sound/click.mp3'] },
      settings: { oneAtATime: true }
    },
    typing: {
      sound: { src: ['/static/sound/typing.mp3'] },
      settings: { oneAtATime: true }
    },
    deploy: {
      sound: { src: ['/static/sound/deploy.mp3'] },
      settings: { oneAtATime: true }
    },
  }
};

class PlayLive extends Component {
  static propTypes = {
    error: PropTypes.any.isRequired,
    onError: PropTypes.func.isRequired
  }
  componentDidCatch (error) {
    this.props.onError(error.message);
  }
  render () {
    if (this.props.error) {
      const error = String(this.props.error).replace(/[\r\n]/gm, '<br />');
      return (
        <p
          className='play-content-error'
          dangerouslySetInnerHTML={{ __html: error }}
        />
      );
    }
    return this.props.children;
  }
}

class App extends Component {

  constructor () {
    super(...arguments);

    this.state = {
      error: false,
      selectedComponentName: '',
    };

    this.components = componentsList.map(component => {
      const code = this.getComponentCode(component.code);
      return { ...component, code };
    });
  }

  componentDidMount () {
    this.router = new Navigo(null, true);

    this.router.on('/', () => {
      this.setState({ selectedComponentName: '' });
    });

    this.components.forEach(component => {
      this.router.on(component.name, () => {
        this.setState({ selectedComponentName: component.name });
      }).resolve();
    });
  }

  render () {
    const { name, component } = this.getSelected();
    return (
      <div className='play'>
        <div className='play-header'>
          <div className='play-header-title'>Arwes</div>
          <select
            className='play-header-select'
            value={name}
            onChange={ev => this.onChange(ev.target.value)}
          >
            <option value=''>-- select --</option>
            {this.components.map((el, index) => {
              if (!el) return null;
              return <option key={index} value={el.name}>{el.name}</option>;
            })}
          </select>
        </div>
        <div className='play-content'>
          {!component && (
            <p className='play-content-msg'>Select a component to play with.</p>
          )}
          {!!component && (
            <LiveProvider
              noInline
              code={component.code}
              scope={arwes}
              className='play-content-live'
            >
              <LiveEditor
                className='play-content-editor'
                onChange={this.onCodeChange}
              />
              <LiveError className='play-content-error' />
              <PlayLive
                error={this.state.error}
                onError={this.onError}
              >
                <LivePreview className='play-content-preview' />
              </PlayLive>
            </LiveProvider>
          )}
        </div>
      </div>
    );
  }

  onChange = (selectedComponentName) => {
    this.router.navigate(selectedComponentName);
  }

  onCodeChange = () => {
    this.setState({ error: false });
  }

  onError = (error) => {
    this.setState({ error });
  }

  getSelected = () => {
    const { selectedComponentName } = this.state;
    const selectedComponent = this.components.find(el => el.name === selectedComponentName);
    return { name: selectedComponentName, component: selectedComponent };
  }

  getComponentCode (source) {
    const code = source.replace(/^\s*\`\`\`.*[\r\n]/gm, '');
    return code;
  }
}

ReactDOM.render(
  <ThemeProvider theme={createTheme()}>
    <SoundsProvider sounds={createSounds(sounds)}>
      <App />
    </SoundsProvider>
  </ThemeProvider>,
  document.querySelector('#app')
);
