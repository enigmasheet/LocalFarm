import React from 'react';
import { ReferenceLine } from 'recharts';

const CustomReferenceLine = ({ y, stroke, strokeDasharray, label }) => {
  return (
    <ReferenceLine
      y={y}
      stroke={stroke}
      strokeDasharray={strokeDasharray}
      label={{ position: 'right', value: label, fill: stroke, fontSize: 12 }}
    />
  );
};

export default CustomReferenceLine;
