import React from 'react';
import { Link } from 'react-router-dom';
import './PageNotFound.css';

const PageNotFound = () => {
  return (
    <div className="notfound-page">
      <div className="notfound-container">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">Oops! Page Not Found</p>
        <Link to="/" className="notfound-link">← Back to Home</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
