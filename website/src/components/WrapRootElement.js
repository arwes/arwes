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

const SimpleInput = props => {
  const { type, checked, disabled } = props;

  if (type === 'checkbox') {
    return (
      <span style={{
        position: 'relative',
        display: 'inline-block',
        border: '1px solid #7efcf6',
        width: '15px',
        height: '15px',
        userSelect: 'none',
        cursor: disabled ? 'default' : 'pointer',
        verticalAlign: 'baseline'
      }}>
        <input
          style={{
            position: 'absolute',
            opacity: 0,
            width: 0,
            height: 0
          }}
          type='checkbox'
          checked={checked}
          disabled={disabled}
        />
        {checked && (
          <span
            style={{
              position: 'absolute',
              left: '3px',
              top: '3px',
              width: '7px',
              height: '7px',
              backgroundColor: '#7efcf6'
            }}
          />
        )}
      </span>
    );
  }
  return <input {...props} />;
};

const globalComponents = {
  pre: MDEPre,
  input: SimpleInput
};

const WrapRootElement = ({ element }) => {
  return (
    <ArwesThemeProvider themeSettings={{
      typography: {
        content: '"Titillium Web", sans-serif',
        monospace: '"Source Code Pro", monospace'
      }
    }}>
      <MDXProvider components={globalComponents}>
        {element}
      </MDXProvider>
    </ArwesThemeProvider>
  );
};

WrapRootElement.propTypes = {
  element: PropTypes.any
};

export { WrapRootElement };
