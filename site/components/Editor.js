import React from 'react';
import cx from 'classnames';
import { LiveEditor } from 'react-live';

import withStyles from '../../src/tools/withStyles';
import getCodeStyles from '../../src/Code/styles';

const styles = theme => {
  const { root, ...others } = getCodeStyles(theme);
  return {
    ...others,
    root: {
      display: 'flex',
      backgroundColor: theme.code.background,
      '& $editor': {
        ...root,
        display: 'block',
      }
    },
    editor: {
      flex: 1,
    },
  };
};

const Editor = props => {
  const { theme, classes, className, onChange, ...etc } = props;
  return (
    <div className={cx(classes.root, className)} {...etc}>
      <LiveEditor className={classes.editor} onChange={onChange} />
    </div>
  );
};

export default withStyles(styles)(Editor);
