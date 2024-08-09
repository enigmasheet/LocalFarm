// src/components/GHcard.jsx
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const GHcard = ({ GH }) => {
  return (
    <Link to={`/${GH.id}`}>
      <div className="border p-2 rounded-lg hover:bg-slate-600 py-2 my-1">
        <h1>{GH.name}</h1>
        <h2>{GH.plantname}</h2>
      </div>
    </Link>
  );
};

// Add prop types validation
GHcard.propTypes = {
  GH: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    plantname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GHcard;
