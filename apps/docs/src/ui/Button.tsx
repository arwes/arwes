import { type ReactElement, type ReactNode, useRef } from 'react';
import {
  type StylesThemeCreator,
  type AnimatedSettings,
  aaOpacity,
  useThemeStyles,
  Animated,
  FrameSVGHexagon,
  Illuminator
} from '@arwes/react';

interface ButtonProps {
  className?: string
  animated?: AnimatedSettings
  variant?: 'primary' | 'secondary'
  children: ReactNode
}

const styles: StylesThemeCreator<ButtonProps> = (theme, props) => {
  const isPrimary = props.variant === 'primary';
  const color = isPrimary
    ? '#79F2F2'
    : 'hsl(60deg 100% 75%)';
  const textShadow = isPrimary
    ? '0px 0px 1px rgba(121, 242, 242, 0.5)'
    : '0px 0px 2px hsl(60deg 100% 75% / 50%)';
  const background = isPrimary
    ? '0px 0px 1px rgba(121, 242, 242, 0.5)'
    : 'transparent';

  return {
    root: {
      position: 'relative',
      display: 'inline-block',
      padding: '0 30px',
      minWidth: '80px',
      height: '30px',
      lineHeight: '30px',
      fontSize: 14,
      fontFamily: "'Titillium Web', sans-serif",
      fontWeight: '400',
      textTransform: 'uppercase',
      textDecoration: 'none',
      color,
      textAlign: 'center',
      textShadow,
      background,
      cursor: 'pointer',
      transitionProperty: 'color',
      transitionDuration: '200ms',
      transitionTimingFunction: 'ease-out',

      '.arwes-react-frames-framesvg': {
        zIndex: 1
      },
      path: {
        transitionProperty: 'color',
        transitionDuration: '200ms',
        transitionTimingFunction: 'ease-out'
      },
      'path[data-name="shape"]': {
        color: 'hsl(60deg 100% 40% / 8%)'
      },
      'path[data-name="decoration"]': {
        color: 'hsl(60deg 100% 40% / 14%)'
      },

      '&:hover': {
        color: 'hsl(60deg 100% 85%)',

        'path[data-name="shape"]': {
          color: 'hsl(60deg 100% 40% / 16%)'
        },
        'path[data-name="decoration"]': {
          color: 'hsl(60deg 100% 40% / 22%)',
          filter: 'drop-shadow(0 0 1px hsl(60deg 100% 40%))'
        }
      },

      '@media (min-width: 768px)': {
        padding: '0 40px',
        height: '36px',
        lineHeight: '36px',
        fontSize: '16px'
      },
      '@media (min-width: 1921px)': {
        padding: '0 60px',
        height: '44px',
        lineHeight: '44px',
        fontSize: '21px'
      }
    },
    illuminator: {
      position: 'absolute',
      zIndex: 0,
      inset: 0,
      display: 'block',
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      clipPath: `polygon(
        0 100%,
        0 12px,
        12px 0,
        100% 0,
        100% calc(100% - 12px),
        calc(100% - 12px) 100%
      )`
    },
    content: {
      position: 'relative',
      zIndex: 2
    }
  };
};

const Button = (props: ButtonProps): ReactElement => {
  const { variant, animated, className, children } = props;

  const svgRef = useRef<SVGSVGElement | null>(null);
  const css = useThemeStyles<ButtonProps>([styles], props, [variant]);

  return (
    <Animated
      as='button'
      className={className}
      css={css.root}
      animated={animated}
    >
      <div css={css.illuminator}>
        <Illuminator size={150} lightness='100%' />
      </div>
      <FrameSVGHexagon
        elementRef={svgRef}
        squareSize={12}
      />
      <Animated
        as='span'
        className='button__content'
        css={css.content}
        animated={aaOpacity()}
      >
        {children}
      </Animated>
    </Animated>
  );
};

export type { ButtonProps };
export { Button };
