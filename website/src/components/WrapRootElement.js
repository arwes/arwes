import React from 'react';
import PropTypes from 'prop-types';
import { MDXProvider } from '@mdx-js/react';

import { ArwesThemeProvider } from '@repository/packages/core';

import { Code } from './Code';
import { Sandbox } from './Sandbox';

const MDEPre = ({ children }) => {
  const language = (children.props.className || '').replace('language-', '');
  const code = children.props.children;

  if (language === 'arwes_sandbox') {
    return <Sandbox language={language} children={code} />;
  }

  return <Code language={language} children={code} />;
};

MDEPre.propTypes = {
  children: PropTypes.shape({
    props: PropTypes.shape({
      className: PropTypes.string,
      children: PropTypes.string
    })
  })
};

const components = {
  pre: MDEPre
};

const WrapRootElement = ({ element }) => {
  return (
    <ArwesThemeProvider themeSettings={{
      typography: {
        content: '"Titillium Web", sans-serif',
        monospace: '"Source Code Pro", monospace'
      }
    }}>
      <MDXProvider components={components}>
        {element}
      </MDXProvider>
    </ArwesThemeProvider>
  );
};

WrapRootElement.propTypes = {
  element: PropTypes.any
};

export { WrapRootElement };
