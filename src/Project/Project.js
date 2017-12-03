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
    Animation,
    Frame,
    Words,
    animate,
    show,
    node,
    header,
    headerSize,
    icon,
    body,
    footer,
    className,
    ...etc
  } = props;
  const cls = cx(classes.root, className);

  return (
    <Animation animate={animate} show={show} timeout={theme.animTime}>
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
          >
            {frameAnim => (
              <div>
                <div className={classes.header}>
                  <h1>
                    <Words animate={animate} show={frameAnim.entered}>
                      {header}
                    </Words>
                  </h1>
                  <div className={classes.icon}>{icon}</div>
                </div>
                <div className={classes.separator} />
                <div className={classes.content}>
                  <div className={classes.body}>
                    {typeof body === 'function' ? body(frameAnim) : body}
                  </div>
                  {!!footer && <div className={classes.footer}>
                    {typeof footer === 'function' ? footer(frameAnim) : footer}
                  </div>}
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
  theme: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  animate: PropTypes.bool,
  show: PropTypes.bool,
  node: PropTypes.string,
  header: PropTypes.string.isRequired,
  headerSize: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  icon: PropTypes.any,
  body: PropTypes.any.isRequired,
  footer: PropTypes.any,
};

Project.defaultProps = {
  Animation: AnimationComponent,
  Frame: FrameComponent,
  Words: WordsComponent,
  animate: false,
  show: true,
  node: 'article',
  headerSize: 'h2',
  icon: <i className='mdi mdi-package' />,
};
