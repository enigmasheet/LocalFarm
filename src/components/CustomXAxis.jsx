import PropTypes from 'prop-types';
import { XAxis } from 'recharts';

const CustomXAxis = ({ dataKey }) => {
  return (
    <XAxis dataKey={dataKey} />
  );
};

CustomXAxis.propTypes = {
  dataKey: PropTypes.string.isRequired,
};

export default CustomXAxis;
