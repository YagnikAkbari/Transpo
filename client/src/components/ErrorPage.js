import React from "react";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <>
      <div id="page-not-found">
        <h1>404</h1>
        <h2>Page not found!</h2>
        <p className="lowercase">
          THE PAGE YOU ARE LOOKING FOR MIGHT HAVE BEEN REMOVED HAD ITS NAME
          CHANGED OR IS TEMPORARILY UNAVAILABLE.
        </p>
        <Link to="/msignup" className="new-link uppercase">
          Back to HomePage
        </Link>
      </div>
    </>
  );
};

export default ErrorPage;
