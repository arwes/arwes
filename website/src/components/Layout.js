import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { lighten } from 'polished';

const Layout = ({ children }) => {
  return (
    <>
      <Global
        styles={theme => ({
          '*, *:before, *:after': {
            boxSizing: 'border-box'
          },
          'html, body': {
            overflow: 'hidden',
            margin: 0,
            padding: 0,
            backgroundColor: theme.color.neutral,
            fontFamily: theme.typography.content,
            color: theme.color.content,
            lineHeight: 1.3,
            fontSize: 16,
            scrollbarWidth: 'thin',
            scrollbarColor: lighten(0.1, theme.color.neutral) + ' ' + lighten(0.05, theme.color.neutral),

            '& ::-webkit-scrollbar': {
              width: 8
            },
            '& ::-webkit-scrollbar-track': {
              background: lighten(0.05, theme.color.neutral)
            },
            '& ::-webkit-scrollbar-thumb': {
              background: lighten(0.1, theme.color.neutral)
            },
            '& ::selection': {
              backgroundColor: theme.color.content,
              color: theme.color.neutral
            }
          },
          a: {
            color: theme.color.link,
            textDecoration: 'none'
          }
        })}
      />
      {children}
    </>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export { Layout };
