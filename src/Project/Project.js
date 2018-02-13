import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import FrameComponent from '../Frame';
import WordsComponent from '../Words';
import HeadingComponent from '../Heading';

export default function Project (props) {

  const {
    theme,
    classes,
    sounds,
    Animation,
    Frame,
    Words,
    Heading,
    animation,
    animate,
    show,
    node,
    header,
    headerSize,
    icon,
    className,
    children,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation
      animate={animate}
      show={show}
      timeout={theme.animTime}
      {...animation}
    >
      {anim => (
        React.createElement(
          node,
          {
            className: cx(cls, classes[anim.status]),
            ...etc,
          },
          <Frame
            animate={animate}
            show={show}
            timeout={theme.animTime}
            layer='primary'
            level={0}
            corners={4}
            hover
            noBackground
            onClick={() => sounds.click && sounds.click.play()}
          >
            {frameAnim => (
              <div>
                <header className={classes.header}>
                  <Heading node='h1'>
                    <Words animate={animate} show={frameAnim.entered}>
                      {header}
                    </Words>
                  </Heading>
                  <div className={classes.icon}>{icon}</div>
                </header>
                <div className={classes.separator} />
                <div className={classes.children}>
                  {typeof children === 'function' ? children(frameAnim) : children}
                </div>
              </div>
            )}
          </Frame>
        )
      )}
    </Animation>
  );
}

Project.propTypes = {
  Animation: PropTypes.any.isRequired,
  Frame: PropTypes.any.isRequired,
  Words: PropTypes.any.isRequired,
  Heading: PropTypes.any.isRequired,

  theme: PropTypes.any.isRequired,
  classes: PropTypes.any.isRequired,

  animate: PropTypes.bool,
  show: PropTypes.bool,
  animation: PropTypes.object,

  /**
   * It uses the `click` player.
   */
  sounds: PropTypes.object,

  /**
   * The HTML tag element to use.
   */
  node: PropTypes.string,

  /**
   * The HTML header used for the title.
   */
  header: PropTypes.string.isRequired,

  /**
   * The actual font size to use for the HTML header.
   */
  headerSize: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),

  /**
   * The icon to decorate the project.
   */
  icon: PropTypes.any,

  /**
   * If function, receives the animation status object.
   */
  children: PropTypes.any,
};

Project.defaultProps = {
  Animation: AnimationComponent,
  Frame: FrameComponent,
  Words: WordsComponent,
  Heading: HeadingComponent,
  show: true,
  sounds: {},
  node: 'article',
  headerSize: 'h2',
  icon: <i className='mdi mdi-package' />,
};
