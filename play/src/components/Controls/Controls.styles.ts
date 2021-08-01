import { rgba } from 'polished';
import { CSSObject } from '@emotion/react';

import { theme } from '../../theme';

const styles: Record<string, CSSObject> = {
  root: {
    display: 'none'
  },
  rootIsVisible: {
    display: 'block'
  },
  container: {
    zIndex: 1000,
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'grid',
    padding: '2rem',
    backgroundColor: rgba(theme.color.section, 0.5),

    [theme.breakpoints.tabletUp]: {
      position: 'static',
      padding: 0,
      width: '100%',
      height: '100%',
      backgroundColor: 'transparent'
    }
  },
  content: {
    display: 'grid',
    gridTemplateColumns: 'auto',
    gridTemplateRows: 'auto 1fr',
    margin: '0 auto',
    minHeight: 0, // Height overview issue.
    width: '100%',
    maxWidth: 400,
    backgroundColor: rgba(theme.color.section, 0.9),

    [theme.breakpoints.tabletUp]: {
      backgroundColor: theme.color.section
    }
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottom: `1px solid ${theme.color.border}`,
    padding: '1rem',

    [theme.breakpoints.tabletUp]: {
      display: 'none'
    }
  },
  title: {
    margin: 0,
    fontSize: '1rem',
    lineHeight: '1rem'
  },
  buttonClose: {},
  body: {
    overflowY: 'auto',

    [theme.breakpoints.tabletUp]: {
      minHeight: 0
    }
  },
  packages: {
    padding: '1rem'
  },
  package: {
    '& + &': {
      marginTop: '0.5rem',
      borderTop: `1px solid ${theme.color.border}`,
      paddingTop: '0.5rem'
    }
  },
  packageName: {
    position: 'sticky',
    top: 0,
    display: 'block',
    marginBottom: '0.5rem',
    color: theme.color.content,
    fontWeight: 'bold',
    fontFamily: theme.typography.monospace,
    backgroundColor: theme.color.section
  },
  components: {
    marginLeft: '1rem'
  },
  component: {},
  componentName: {
    color: theme.color.content,
    fontFamily: theme.typography.monospace,
    backgroundColor: rgba(theme.color.content, 0.1)
  },
  sandboxes: {
    marginLeft: '1rem'
  },
  sandboxLink: {
    display: 'block',
    lineHeight: 1.5
  },
  sandboxLinkActive: {
    color: theme.color.linkActive
  },
  buttons: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: '15px 0',

    [theme.breakpoints.tabletUp]: {
      display: 'none'
    }
  }
};

export { styles };
