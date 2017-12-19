import React from 'react';
import withDocs from '../../site/withDocs';

const LoaderTool = ({ compile }) => {
  return (
    <div>
      {compile(`

# Loader Tool

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(LoaderTool);
