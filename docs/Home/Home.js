import React from 'react';

import Arwes from '../../src/Arwes';
import Loading from '../../src/Loading';
import Words from '../../src/Words';
import Button from '../../src/Button';
import Logo from '../../src/Logo';

import { getResponsiveResource } from '../../src/tools/utils';
import createLoader from '../../src/tools/createLoader';
import createResponsive from '../../src/tools/createResponsive';

export default class Home extends React.Component {
  constructor () {
    super(...arguments);
    this.state = {
      show: false,
    };

    this.loader = createLoader();
    this.responsive = createResponsive({
      getTheme: () => this.props.theme
    });
  }
  componentDidMount () {
    const responsive = this.responsive.get();
    const bg = getResponsiveResource(this.props.resources.bg, responsive);

    this.loader.load({ images: [bg] }, { timeout: 5 * 1000 }).
      then(() => {}, () => {}).
      then(() => this.setState({ show: true }));
  }
  render () {
    const {
      classes,
      resources,
    } = this.props;

    const {
      show,
    } = this.state;

    return (
      <div>
        <Loading
          full
          animate
          show={!show}
          animation={{
            unmountOnExit: true
          }}
        />
        <Arwes
          animate
          show={show}
          showResources={show}
          resources={resources}
        >
          {anim => (
            <div className={classes.root}>
              <main className={classes.main}>
                <Logo animate show={anim.entered} layer='header' />
                <h1><Words animate show={anim.entered}>
                  Arwes
                </Words></h1>
                <p><Words animate show={anim.entered}>
                  Futuristic Sci-Fi and Cyberpunk Graphical User Interface Framework for Web Apps
                </Words></p>
                <a className={classes.option} href='https://github.com/romelperez/arwes'>
                  <Button animate show={anim.entered}>
                    {btnAnim => (
                      <Words animate show={btnAnim.entered}>GitHub</Words>
                    )}
                  </Button>
                </a>
                {' '}
                <a className={classes.option} href='https://www.npmjs.com/package/arwes'>
                  <Button animate show={anim.entered}>
                    {btnAnim => (
                      <Words animate show={btnAnim.entered}>NPM</Words>
                    )}
                  </Button>
                </a>
              </main>
            </div>
          )}
        </Arwes>
      </div>
    );
  }
}
