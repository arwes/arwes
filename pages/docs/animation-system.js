import React from 'react';
import withDocs from '../../site/withDocs';

const AnimationSystem = ({ compile }) => {
  return (
    <div>
      {compile(`

# Animation System

Work in progress.

      `).tree}
    </div>
  );
}

export default withDocs(AnimationSystem);
