import React from 'react';
import { ReferenceLine, Label } from 'recharts';

const CustomReferenceLine = ({ y, stroke, strokeDasharray, label }) => (
  <ReferenceLine y={y} stroke={stroke} strokeDasharray={strokeDasharray}>
    <Label value={label} position="top" />
  </ReferenceLine>
);

export default CustomReferenceLine;
