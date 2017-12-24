import React from 'react';
import cx from 'classnames';

import withStyles from '../../src/tools/withStyles';
import Arwes from '../../src/Arwes';
import Frame from '../../src/Frame';
import { Row } from '../../src/Grid';

import withTemplate from '../withTemplate';
import { getTitle } from '../utils';
import createCompiler from '../createCompiler';
import Header from './Header';
import Footer from './Footer';
import Wrap from './Wrap';
import Link from './Link';

const styles = (theme) => {
  return {
    root: {
      display: 'flex',
      flexDirection: 'column',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },
    header: {
      zIndex: 2,
    },
    main: {
      zIndex: 1,
      flex: 1,
      overflowY: 'auto',
    },
    wrap: {
      padding: [theme.margin, 0],
    },
    content: {
      padding: theme.padding,
    },
    footer: {
      zIndex: 2,
    },
  };
};

class Content extends React.Component {

  constructor () {
    super(...arguments);

    this.state = {
      show: false,
      framed: false,
    };

    // Markdown compiler
    this.compile = createCompiler({
      elements: {
        a: ({ href, children, ...etc }) => {
          return <Link href={href} onLink={this.onLink} {...etc}>{children}</Link>;
        }
      }
    });
  }

  componentDidMount () {
    this.setState({ show: true });
    document.title = getTitle(location.pathname);
  }

  render () {
    const { classes, resources, markdown, html } = this.props;
    const { show, framed } = this.state;

    return (
      <Arwes
        animate
        show={show}
        showResources={show}
        resources={resources}
      >
        {anim => (
        <div className={classes.root}>

          <Header
            className={classes.header}
            animate
            show={anim.entered}
            animation={{
              onEntered: () => this.setState({ framed: true })
            }}
            title='Arwes'
            onLink={this.onLink}
          />

          <main className={classes.main}>
            <Wrap className={classes.wrap}>
              <Row noMargin col s={12}>
                <Frame
                  animate
                  show={framed}
                  corners={4}
                >
                  {anim2 => (
                  <div
                    className={cx(
                      classes.content,
                      'anim',
                      anim2.entered && 'animEntered'
                    )}
                  >
                    {html ? html : this.compile(markdown).tree}
                  </div>
                  )}
                </Frame>
              </Row>
            </Wrap>
          </main>

          <Footer
            className={classes.footer}
            animate
            show={anim.entered}
            onLink={this.onLink}
          />

        </div>
        )}
      </Arwes>
    );
  }

  onLink = () => {
    this.setState({ show: false });
  }
}

export default withTemplate(withStyles(styles)(Content));
