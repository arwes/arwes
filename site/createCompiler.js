import React from 'react';
import marksy from 'marksy';
import Code from '../src/Code';
import Table from '../src/Table';

export default ({ elements } = {}) => {
  return marksy({
    createElement: React.createElement,
    elements: {
      code: ({ language, code }) => {
        return <Code type='pre' language={language}>{code}</Code>;
      },
      codespan: ({ children }) => {
        return <Code type='code'>{children}</Code>;
      },
      table: ({ children }) => {
        return <Table>{children}</Table>;
      },
      ...elements,
    },
  });
};
