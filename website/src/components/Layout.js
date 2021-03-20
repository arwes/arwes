import React from 'react';
import PropTypes from 'prop-types';
import { Global } from '@emotion/react';
import { lighten, rgba } from 'polished';

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
            lineHeight: 1.35,
            fontSize: 16,
            scrollbarWidth: 'thin',
            scrollbarColor: lighten(0.1, theme.color.neutral) + ' ' + lighten(0.05, theme.color.neutral),

            '& ::-webkit-scrollbar': {
              width: 10,
              height: 10
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
          'h1, h2, h3, h4, h5, h6, p, ul, ol, blockquote, pre, img, hr': {
            display: 'block',
            margin: '0 0 20px'
          },
          a: {
            color: theme.color.link,
            textDecoration: 'none',
            transition: 'color 150ms ease-out',

            '&:hover, &:focus': {
              color: theme.color.active
            }
          },
          'h1, h2, h3, h4, h5, h6': {
            color: theme.color.headings
          },
          h1: { fontSize: 28 },
          h2: { fontSize: 26, marginTop: 40 },
          h3: { fontSize: 24, marginTop: 30 },
          h4: { fontSize: 22 },
          h5: { fontSize: 20 },
          h6: { fontSize: 18 },
          'ul, ol': {
            padding: '0 0 0 40px',

            '& img': {
              display: 'inline-block',
              margin: 0,
              verticalAlign: 'middle'
            }
          },
          blockquote: {
            display: 'block',
            marginLeft: 10,
            borderLeft: `4px solid ${theme.color.content}`,
            padding: '0 0 0 10px'
          },
          'pre, code': {
            fontFamily: theme.typography.monospace,
            backgroundColor: rgba(theme.color.content, 0.2)
          },
          pre: {
            overflowX: 'auto',
            border: `1px solid ${rgba(theme.color.content, 0.5)}`,
            padding: 10,
            lineHeight: 1.2,
            fontSize: '0.9em'
          },
          img: {
            display: 'block',
            maxWidth: '100%'
          },
          hr: {
            width: '100%',
            height: 0,
            borderStyle: 'solid',
            borderColor: theme.color.content,
            borderWidth: '0 0 1px 0'
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
