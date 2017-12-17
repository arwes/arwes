import React from 'react';
import withStyles from '../../src/tools/withStyles';

const styles = theme => ({
  '@global': {
    '.anim': {
      opacity: 0,
    },
    '.animEntered': {
      opacity: 1,
      transition: `all ${theme.animTime}ms ease-out`,
    },
  },
});

class Template extends React.Component {

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
    gaScript.src = 'https://www.googletagmanager.com/gtag/js?id=UA-50433259-2';
    document.body.appendChild(gaScript);

    const gaBody = document.createElement('script');
    gaBody.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag () {dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'UA-50433259-2');
    `;
    document.body.appendChild(gaBody);
  }
}

export default withStyles(styles)(Template);
