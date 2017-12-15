import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

import AnimationComponent from '../Animation';
import FrameComponent from '../Frame';
import WordsComponent from '../Words';

export default function Project (props) {

  const {
    theme,
    classes,
    sounds,
    Animation,
    Frame,
    Words,
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
                  <h1>
                    <Words animate={animate} show={frameAnim.entered}>
                      {header}
                    </Words>
                  </h1>
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
  animation: PropTypes.object,
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  sounds: PropTypes.object,
  animate: PropTypes.bool,
  show: PropTypes.bool,
  node: PropTypes.string,
  header: PropTypes.string.isRequired,
  headerSize: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  icon: PropTypes.any,
};

Project.defaultProps = {
  Animation: AnimationComponent,
  Frame: FrameComponent,
  Words: WordsComponent,
  animate: false,
  show: true,
  sounds: {},
  node: 'article',
  headerSize: 'h2',
  icon: <i className='mdi mdi-package' />,
};
