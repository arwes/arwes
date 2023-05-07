import { type ReactElement } from 'react';
import { Highlight, themes } from 'prism-react-renderer';
import { type AnimatedProp, Animated, cx } from '@arwes/react';

import * as classes from './CodeBlock.css';

interface CodeBlockProps {
  className?: string
  animated?: AnimatedProp
  code: string
}

const CodeBlock = (props: CodeBlockProps): ReactElement => {
  const { className: classNameExternal, animated, code } = props;

  return (
    <Highlight
      theme={themes.vsDark}
      code={code}
      language="tsx"
    >
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <Animated
          as='pre'
          className={cx(classes.root, className, classNameExternal)}
          style={{
            ...style,
            backgroundColor: 'hsl(180deg 25% 15% / 25%)'
          }}
          animated={animated}
        >
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </Animated>
      )}
    </Highlight>
  );
};

export type { CodeBlockProps };
export { CodeBlock };
