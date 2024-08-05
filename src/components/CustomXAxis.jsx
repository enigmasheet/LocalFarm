import React from 'react';
import { XAxis } from 'recharts';

const CustomXAxis = ({ dataKey }) => {
  return (
    <XAxis dataKey={dataKey} />
  );
};

export default CustomXAxis;
