import React, { FC } from 'react';
import { Html } from '@react-three/drei';

interface LabelProps {
  text: string;
  position: [number, number, number];
}

const Label: FC<LabelProps> = ({ text, position }) => {
  return (
    <Html position={position} center>
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '4px 8px',
          borderRadius: '4px',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
        }}
      >
        {text}
      </div>
    </Html>
  );
};

export default Label;
