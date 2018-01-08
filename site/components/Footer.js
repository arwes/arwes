import React from 'react';
import cx from 'classnames';

import withStyles from '../../src/tools/withStyles';
import ArwesFooter from '../../src/Footer';
import Words from '../../src/Words';
import { Row } from '../../src/Grid';
import Appear from '../../src/Appear';

import Wrap from './Wrap';
import Link from './Link';

const styles = (theme) => ({
  root: {
    textAlign: 'left',
  },
  wrap: {
    padding: [theme.padding, 0],
  },
  content: {
    display: 'flex',
  },
  left: {
    flex: '1 1 auto',
  },
  right: {
    flex: '1 1 auto',
    textAlign: 'right',
    '& a': {
      textAlign: 'left',
    },
  },
});

const Footer = props => {
  const {
    onLink,
    classes,
    className,
    ...etc
  } = props;

  const cls = cx(classes.root, className);

  return (
    <ArwesFooter className={cls} {...etc}>
      {anim => (
      <Wrap className={classes.wrap}>
        <Row noMargin col s={12}>
          <div className={classes.content}>

            <div className={classes.left}>
              <Link href='https://github.com/romelperez/arwes' onLink={onLink}>
                <Appear className='mdi mdi-github-circle' animate show={anim.entered} />
                {' '}
                <Words animate show={anim.entered}>
                  GitHub
                </Words>
              </Link>
            </div>

            <div className={classes.right}>
              <Link href='https://romelperez.com' onLink={onLink}>
                <Appear className='mdi mdi-copyright' animate show={anim.entered} />
                {' '}
                <Words animate show={anim.entered}>
                  2018 Romel Pérez
                </Words>
              </Link>
            </div>

          </div>
        </Row>
      </Wrap>
      )}
    </ArwesFooter>
  );
};

export default withStyles(styles)(Footer);
