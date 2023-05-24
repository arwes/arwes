import { type HTMLProps, type ReactElement } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './CodeBlock.css';

interface CodeBlockProps extends HTMLProps<HTMLPreElement> {
  className?: string
  animated?: AnimatedProp
  code: string
}

const CodeBlock = (props: CodeBlockProps): ReactElement => {
  const { className, animated, code, ...otherProps } = props;

  // TODO: Fix type.

  return (
    <Animated<HTMLPreElement, HTMLProps<HTMLPreElement>>
      {...otherProps as any}
      animated={animated}
      className={cx(classes.root, className)}
    >
      <Highlight
        theme={themes.vsDark}
        code={code}
        language="tsx"
      >
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={cx(classes.pre, className)}
            style={{
              ...style,
              backgroundColor: 'hsl(180deg 25% 15% / 25%)'
            }}
          >
            {tokens.map((line, i) => {
              // TODO: Fix overflow content parent resize.
              const tokenProps = getLineProps({ line });
              return (
                <div key={i} {...tokenProps} className={cx(classes.line, tokenProps.className)}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </div>
              );
            })}
          </pre>
        )}
      </Highlight>
    </Animated>
  );
};

export type { CodeBlockProps };
export { CodeBlock };
