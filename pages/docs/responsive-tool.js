import React from 'react';
import withDocs from '../../site/withDocs';

const ResponsiveTool = ({ compile }) => {
  return (
    <div>
      {compile(`

# Responsive Tool

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(ResponsiveTool);
