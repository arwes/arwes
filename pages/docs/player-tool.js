import React from 'react';
import withDocs from '../../site/withDocs';

const PlayerTool = ({ compile }) => {
  return (
    <div>
      {compile(`

# Player Tool

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(PlayerTool);
