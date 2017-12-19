import React from 'react';
import withDocs from '../../site/withDocs';

const GridSystem = ({ compile }) => {
  return (
    <div>
      {compile(`

# Grid System

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(GridSystem);
