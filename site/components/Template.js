import React from 'react';
import { googleAnalytics } from '../settings';

export default class Template extends React.Component {

  componentDidMount () {
    this.removeServerStyles();
    this.setGA();
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

    const gaScript = document.createElement('script');
    gaScript.async = true;
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=' + googleAnalytics;
    document.body.appendChild(gaScript);

    const gaBody = document.createElement('script');
    gaBody.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag () {dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${googleAnalytics}');
    `;
    document.body.appendChild(gaBody);
  }
}
