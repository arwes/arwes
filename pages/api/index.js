import React from 'react';

import withStyles from '../../src/tools/withStyles';
import Arwes from '../../src/Arwes';

import withTemplate from '../../site/withTemplate';
import Link from '../../site/components/Link';

class Api extends React.Component {
  render () {
    const { classes, resources } = this.props;
    return (
      <Arwes
        animate
        show
        resources={resources}
      >
        <div className={classes.root}>
          <p>Work in progress.</p>
          <p><Link href='/'>Go Home</Link></p>
        </div>
      </Arwes>
    );
  }
}

export default withTemplate(withStyles()(Api));
