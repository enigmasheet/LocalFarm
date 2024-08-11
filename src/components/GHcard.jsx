import PropTypes from 'prop-types';
import { Link } from "react-router-dom";

const GHcard = ({ GH }) => {
  const id = Number(GH.id); // Convert id to a number

  return (
    <Link to={`/${id}`}>
      <div className="border p-2 rounded-lg hover:bg-slate-600 py-2 my-1">
        <h1>{GH.name}</h1>
        <h2>{GH.plantname}</h2>
      </div>
    </Link>
  );
};

GHcard.propTypes = {
  GH: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired, // Allow both number and string
    name: PropTypes.string.isRequired,
    plantname: PropTypes.string.isRequired,
  }).isRequired,
};

export default GHcard;
