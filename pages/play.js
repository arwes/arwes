import React from 'react';
import cx from 'classnames';
import { LiveProvider, LivePreview } from 'react-live';
import Navigo from 'navigo';

import * as arwes from '../src';
import withStyles from '../src/tools/withStyles';
import Arwes from '../src/Arwes';
import ArwesContent from '../src/Content';
import { Row, Col } from '../src/Grid';
import Header from '../src/Header';
import Words from '../src/Words';
import Button from '../src/Button';
import Appear from '../src/Appear';

import withTemplate from '../site/withTemplate';
import Brand from '../site/components/Brand';
import Editor from '../site/components/Editor';
import Playground from '../site/components/Playground';
import FooterGitHub from '../site/components/FooterGitHub';
import FooterAuthor from '../site/components/FooterAuthor';
import sandboxes from '../site/sandboxes';

const styles = theme => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
  },

  header: {
    zIndex: 2,
    textAlign: 'center',
  },
  headerRow: {
    padding: [theme.padding / 2, 0],
  },
  headerRight: {
    textAlign: 'center',
  },
  headerTabs: {
    display: 'inline-block',
  },
  headerTab: {
    height: 40,
  },
  selectorContainer: {
    marginRight: theme.padding / 2,
    marginTop: theme.margin / 2,
    marginBottom: theme.margin / 2,
    verticalAlign: 'top',
  },
  selector: {
    display: 'inline-block',
    margin: 0,
    paddingRight: theme.padding / 2,
    height: 40,
    border: 'none',
    borderBottom: '1px solid ' + theme.color.header.base,
    outline: 'none',
    boxShadow: 'none',
    cursor: 'pointer',
    verticalAlign: 'top',
    backgroundColor: 'transparent',
    fontFamily: theme.code.fontFamily,
    lineHeight: '40px',
    fontSize: theme.typography.fontSize / 1.25,
    color: theme.color.header.base,
    '& option': {
      color: theme.color.header.base,
      backgroundColor: theme.background.header.level0,
    }
  },

  content: {
    zIndex: 1,
    display: 'flex',
    flex: 1,
  },
  message: {
    display: 'block',
    padding: theme.padding / 2,
    wordBreak: 'break-all',
  },
  error: {
    color: theme.color.alert.base,
  },

  live: {
    flex: 1,
    position: 'relative',
    zIndex: 1,
    '& $tab + $tab': {
      borderLeft: '1px solid ' + theme.color.primary.dark,
    },
  },
  tab: {},
  editor: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    overflow: 'auto',
  },
  playground: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: '50%',
    overflow: 'auto',
    '& .arwes': {
      position: 'absolute !important',
    },
  },

  footerItem: {
    zIndex: 2,
    position: 'absolute',
    bottom: 0,
    fontSize: '80%',
    opacity: theme.alpha,
    backgroundColor: theme.background.primary.level0,
  },
  footerLeft: {
    left: 0,
  },
  footerRight: {
    right: 0,
  },

  '@media (min-width: 375px)': {
    selectorContainer: {
      marginTop: 0,
      marginBottom: 0,
    },
  },
  [`@media (min-width: ${theme.responsive.small + 1}px)`]: {
    header: {
      textAlign: 'left',
    },
    headerRight: {
      textAlign: 'right',
    },
  },
});

class Play extends React.Component {

  constructor () {
    super(...arguments);

    this.state = {
      show: false,
      error: false,
      componentName: '',
      tabs: {
        editor: true,
        playground: true,
      },
    };
  }

  componentDidMount () {
    this.router = new Navigo(null, true);

    this.router.on('/', () => {
      this.setState({ componentName: '' });
    });

    sandboxes.forEach(sandbox => {
      this.router.on(sandbox.name.toLowerCase(), () => {
        this.setState({ componentName: sandbox.name.toLowerCase() });
      }).resolve();
    });

    this.setState({ show: true });
  }

  render () {
    const { classes } = this.props;
    const { show, error, componentName, tabs } = this.state;

    const tabWidth = (100 / this.getTabsNumber()) + '%';
    const component = componentName && sandboxes.find(item => {
      return item.name.toLowerCase() === componentName.toLowerCase();
    });

    return (
      <Arwes
        animate
        show={show}
        puffsProps={{ animate: false }}
      >
        {anim => (
        <ArwesContent className={classes.root}>

          <Header animate show={anim.entered} className={classes.header}>
            {anim2 => (
            <Row className={classes.headerRow} noMargin>

              <Col s={12} m={4}>
                <Brand show={anim2.entered} onLink={this.onLink} />
              </Col>

              <Col s={12} m={8} className={classes.headerRight}>
                <Appear className={classes.selectorContainer} animate show={anim2.entered}>
                  <select
                    className={classes.selector}
                    value={componentName}
                    onChange={ev => this.onComponentSelect(ev.target.value)}
                  >
                    <option value=''>-- Select --</option>
                    {sandboxes.map((el, index) => {
                      if (!el) return null;
                      return (
                        <option key={index} value={el.name.toLowerCase()}>
                          {el.name}
                        </option>
                      );
                    })}
                  </select>
                </Appear>
                <div className={classes.headerTabs}>
                  <Button
                    className={classes.headerTab}
                    animate
                    show={anim2.entered}
                    layer='header'
                    disabled={!component}
                    active={tabs.editor}
                    onClick={() => this.onTabChange('editor')}
                  >
                    {anim3 => <Words animate show={anim3.entered}>Editor</Words>}
                  </Button>
                  <Button
                    className={classes.headerTab}
                    animate
                    show={anim2.entered}
                    layer='header'
                    disabled={!component}
                    active={tabs.playground}
                    onClick={() => this.onTabChange('playground')}
                  >
                    {anim3 => <Words animate show={anim3.entered}>Output</Words>}
                  </Button>
                </div>
              </Col>

            </Row>
            )}
          </Header>

          <div className={classes.content}>
            {!component && (
            <div className={classes.message}>
              <Words animate show={anim.entered}>Select a component to play with.</Words>
            </div>
            )}
            {!!component && (
            <LiveProvider
              ref={ref => (this.liveProvider = ref)}
              noInline
              code={component.code}
              scope={arwes}
              className={classes.live}
            >

              {tabs.editor && (
              <Editor
                style={{ width: tabWidth }}
                className={cx(classes.tab, classes.editor)}
                onChange={this.onCodeChange}
              />
              )}

              {tabs.playground && (
              <Playground
                style={{ width: tabWidth }}
                className={cx(classes.tab, classes.playground)}
                errorClassName={error && cx(classes.message, classes.error) || ''}
                error={error}
                onError={this.onError}
              >
                <LivePreview />
              </Playground>
              )}

            </LiveProvider>
            )}
            <FooterGitHub
              className={cx(classes.footerItem, classes.footerLeft)}
              show={anim.entered}
              onLink={this.onLink}
            />
            <FooterAuthor
              className={cx(classes.footerItem, classes.footerRight)}
              show={anim.entered}
              onLink={this.onLink}
            />
          </div>

        </ArwesContent>
        )}
      </Arwes>
    );
  }

  onCodeChange = () => {
    setTimeout(() => {
      const error = this.liveProvider.state.error || false;
      if (this.state.error !== error) {
        this.setState({ error });
      }
    }, 0);
  }

  onComponentSelect = (componentName) => {
    this.router.navigate(componentName);
  }

  onError = (error) => {
    this.setState({ error });
  }

  onLink = () => {
    this.setState({ show: false });
  }

  onTabChange = (tab) => {
    const tabs = { ...this.state.tabs, [tab]: !this.state.tabs[tab] };
    const atLeastOneSelected = Object.keys(tabs).reduce((total, key) => {
      return total || tabs[key];
    }, false);
    if (atLeastOneSelected) {
      this.setState({ tabs });
    }
  }

  getTabsNumber = () => {
    const { tabs } = this.state;
    return Object.keys(tabs).filter(key => tabs[key]).length;
  }
}

export default withTemplate(withStyles(styles)(Play));
