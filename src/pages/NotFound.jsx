// src/pages/NotFound.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-[90vh] flex flex-col justify-center items-center px-4">
      <h1 className="text-teal-500 text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link to="/" className="mt-4 text-teal-400">Go back to Home</Link>
    </div>
  );
}

export default NotFound;
