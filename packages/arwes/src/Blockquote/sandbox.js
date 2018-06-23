import React from 'react';
import Blockquote from './index';
import Arwes from '../Arwes';

export default () => (
  <Arwes>
    <div style={{ padding: 20 }}>
      <Blockquote>
        Futuristic Sci-Fi and Cyberpunk Graphical User Interface Framework for
        Web Apps
      </Blockquote>

      <Blockquote data-layer="success">
        Futuristic Sci-Fi and Cyberpunk Graphical User Interface Framework for
        Web Apps
      </Blockquote>

      <Blockquote data-layer="alert">
        Futuristic Sci-Fi and Cyberpunk Graphical User Interface Framework for
        Web Apps
      </Blockquote>

      <Blockquote data-layer="disabled">
        Futuristic Sci-Fi and Cyberpunk Graphical User Interface Framework for
        Web Apps
      </Blockquote>
    </div>
  </Arwes>
);
