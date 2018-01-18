import React from 'react';
import cx from 'classnames';
import escape from 'lodash/escape';

import withStyles from '../../src/tools/withStyles';
import Appear from '../../src/Appear';

const styles = theme => ({
  root: {
    display: 'inline-block',
    fontFamily: theme.code.fontFamily,
    fontSize: theme.code.fontSize,
  }
});

const ErrorMessage = props => {

  const { classes, className, children, ...etc } = props;

  const message = escape(children).
    replace(/[\r\n]/gm, '<br/>').
    replace(/\s/g, '&nbsp;');

  return (
    <Appear animate className={cx(classes.root, className)} {...etc}>
      <div dangerouslySetInnerHTML={{ __html: message }} />
    </Appear>
  );
};

export default withStyles(styles)(ErrorMessage);
