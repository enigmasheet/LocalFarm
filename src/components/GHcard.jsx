import React from "react";
import { Link } from "react-router-dom";
import Body from "./Body";

const GHcard = ({ GH }) => {
  return (
    <>
      <Link to={`/${GH.id}`} element={<Body/>}>
        <div className="border p-2 rounded-lg hover:bg-slate-600 py-2 my-1">
          <h1>{GH.name}</h1>
          <h2>{GH.plantname}</h2>
        </div>
      </Link>
    </>
  );
};

export default GHcard;
