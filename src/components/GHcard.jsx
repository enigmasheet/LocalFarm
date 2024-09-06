import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const GHcard = ({ GH }) => {
  return (
    <Link to={`/${GH.id}`}>
      <div className="p-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 dark:bg-gray-800 py-2 my-1">
        <h1 className="font-bold text-lg dark:text-white">{GH.name}</h1>
        <h2 className="dark:text-gray-400">{GH.plantname}</h2>
      </div>
    </Link>
  );
};

GHcard.propTypes = {
  GH: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    plantname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GHcard;
