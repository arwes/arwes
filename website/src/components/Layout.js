import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';

import { StylesBaseline } from '../../../packages/core';

const Layout = ({ styles, children }) => {
  return (
    <>
      <StylesBaseline styles={({ typography }) => ({
        'html, body': {
          fontFamily: typography.content
        },
        h2: {
          marginTop: 40
        },
        h3: {
          marginTop: 30
        },
        'code, pre': {
          fontFamily: typography.code
        },
        pre: {
          overflowX: 'auto'
        }
      })} />
      <Global styles={styles} />
      {children}
    </>
  );
};

Layout.propTypes = {
  styles: PropTypes.object,
  children: PropTypes.node.isRequired
};

export { Layout };
