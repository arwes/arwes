import React from 'react';

import withStyles from '../../src/tools/withStyles';
import Arwes from '../../src/Arwes';
import ArwesContent from '../../src/Content';
import Frame from '../../src/Frame';
import { Row } from '../../src/Grid';
import Appear from '../../src/Appear';

import withTemplate from '../withTemplate';
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
      display: 'block',
      padding: [theme.padding, theme.padding, 0],
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
  }

  render () {
    const { classes, resources, markdown, App, appProps } = this.props;
    const { show, framed } = this.state;

    return (
      <Arwes
        animate
        show={show}
        showResources={show}
        background={resources.background}
        pattern={resources.pattern}
      >
        {anim => (
        <ArwesContent className={classes.root}>

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
                  <Appear
                    className={classes.content}
                    animate
                    show={anim2.entered}
                  >
                    {App ? (
                      <App
                        compile={this.compile}
                        {...appProps}
                      />
                    ) : (
                      this.compile(markdown).tree
                    )}
                  </Appear>
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

        </ArwesContent>
        )}
      </Arwes>
    );
  }

  onLink = () => {
    this.setState({ show: false });
  }
}

export default withTemplate(withStyles(styles)(Content));
