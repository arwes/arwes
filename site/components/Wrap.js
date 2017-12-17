import React from 'react';
import cx from 'classnames';
import withStyles from '../../src/tools/withStyles';

const styles = () => ({
  root: {
    margin: '0 auto',
    maxWidth: 800,
  }
});

const Wrap = props => {
  const {
    theme,
    classes,
    className,
    children,
    ...etc
  } = props;

  const cls = cx(classes.root, className);

  return (
    <div className={cls} {...etc}>
      {children}
    </div>
  );
};

export default withStyles(styles)(Wrap);
