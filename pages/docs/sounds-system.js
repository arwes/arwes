import React from 'react';
import withDocs from '../../site/withDocs';

const SoundsSystem = ({ compile }) => {
  return (
    <div>
      {compile(`

# Sounds System

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(SoundsSystem);
