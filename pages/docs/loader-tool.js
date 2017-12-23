import React from 'react';
import withDocs from '../../site/withDocs';
import markdown from '../../site/docs/loader-tool.md';

export default withDocs(({ compile }) => compile(markdown).tree);
