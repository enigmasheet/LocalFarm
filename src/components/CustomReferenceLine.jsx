import PropTypes from 'prop-types';
import { ReferenceLine, Label } from 'recharts';

const CustomReferenceLine = ({ y, stroke, strokeDasharray, label }) => (
  <ReferenceLine y={y} stroke={stroke} strokeDasharray={strokeDasharray}>
    <Label value={label} position="top" />
  </ReferenceLine>
);

CustomReferenceLine.propTypes = {
  y: PropTypes.number.isRequired,
  stroke: PropTypes.string.isRequired,
  strokeDasharray: PropTypes.string,
  label: PropTypes.string.isRequired,
};

CustomReferenceLine.defaultProps = {
  strokeDasharray: 'solid',
};

export default CustomReferenceLine;
