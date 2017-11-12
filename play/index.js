import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { LiveProvider, LiveEditor, LiveError, LivePreview } from 'react-live';
import Navigo from 'navigo';

import * as arwes from '../src';
import { ThemeProvider } from '../src';
import components from './components';

class App extends Component {

  constructor () {
    super(...arguments);

    this.state = {
      selectedComponentName: '',
    };
  }

  componentDidMount () {
    this.router = new Navigo(null, true);

    this.router.on('/', () => {
      this.setState({ selectedComponentName: '' });
    });

    components.forEach(component => {
      this.router.on(component.name, () => {
        this.setState({ selectedComponentName: component.name });
      }).resolve();
    });
  }

  render () {

    const { selectedComponentName } = this.state;
    const selectedComponent = components.find(el => el.name === selectedComponentName);

    return (
      <div className='play'>
        <div className='play-header'>
          <div className='play-header-title'>Arwes</div>
          <select
            className='play-header-select'
            value={selectedComponentName}
            onChange={ev => this.onChange(ev.target.value)}
          >
            <option value=''>-- select --</option>
            {components.map((el, index) => {
              if (!el) return null;
              return <option key={index} value={el.name}>{el.name}</option>;
            })}
          </select>
        </div>
        <div className='play-content'>
          {!selectedComponent && (
            <p className='play-content-msg'>Select a component to play with.</p>
          )}
          {!!selectedComponent && (
          <LiveProvider
            noInline
            code={selectedComponent.code}
            scope={arwes}
            className='play-content-live'
          >
            <LiveEditor className='play-content-editor' />
            <LiveError className='play-content-error' />
            <LivePreview className='play-content-preview' />
          </LiveProvider>
          )}
        </div>
      </div>
    );
  }

  onChange = (selectedComponentName) => {
    this.router.navigate(selectedComponentName);
  }
}

ReactDOM.render(
  <ThemeProvider theme={arwes.theme}>
    <App />
  </ThemeProvider>,
  document.querySelector('#app')
);
