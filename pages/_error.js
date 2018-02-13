import React from 'react';

import withStyles from '../src/tools/withStyles';
import Arwes from '../src/Arwes';
import ArwesContent from '../src/Content';
import Words from '../src/Words';
import Line from '../src/Line';

import withTemplate from '../site/withTemplate';

const styles = () => ({
  root: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    textAlign: 'center',
  },
  title: {
    lineHeight: '1',
  },
});

const Error = props => {
  const { classes, resources } = props;
  return (
    <Arwes
      animate
      background={resources.background}
      pattern={resources.pattern}
    >
      {anim => (
      <ArwesContent className={classes.root}>
        <Line animate show={anim.entered} layer='header' />
        <h1 className={classes.title}>
          <Words animate show={anim.entered}>Transmission error</Words>
        </h1>
        <Line animate show={anim.entered} layer='header' />
        <p><a href='/'>
          <Words animate show={anim.entered}>Go to Start</Words>
        </a></p>
      </ArwesContent>
      )}
    </Arwes>
  );
};

export default withTemplate(withStyles(styles)(Error));
