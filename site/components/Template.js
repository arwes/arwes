import React from 'react';
import Router from 'next/router';
import GA from 'react-ga';

import { googleAnalytics } from '../settings';
import { getTitle } from '../utils';

export default class Template extends React.Component {

  componentDidMount () {
    this.removeServerStyles();
    this.setGA();
    this.setTitle();
  }

  render () {
    return this.props.children;
  }

  removeServerStyles () {
    const pagesStyles = document.querySelector('#pages-styles');
    if (pagesStyles) pagesStyles.remove();
  }

  setGA () {

    if (!location.origin.includes('arwes')) return;

    if (!window.GA_INITIALIZED) {
      GA.initialize(googleAnalytics);

      const { pathname, search } = window.location;
      GA.pageview(pathname + search);

      Router.onRouteChangeStart = url => {
        GA.pageview(url);
      };

      window.GA_INITIALIZED = true;
    }
  }

  setTitle () {
    document.title = getTitle(location.pathname);
  }
}
