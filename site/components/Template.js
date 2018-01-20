import React from 'react';
import Router from 'next/router';
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

    /* eslint-disable */
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
    /* eslint-enable */

    window.ga('create', googleAnalytics, 'auto');
    window.ga('send', 'pageview');

    Router.onRouteChangeStart = url => {
      window.ga('send', 'pageview', url);
    };
  }
}
