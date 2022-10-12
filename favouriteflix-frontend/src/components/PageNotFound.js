import React, { useEffect } from "react";
import { Link } from "react-router-dom";

function PageNotFound(props) {
  const { setIs404 } = props;

  useEffect(() => {
    setIs404(true);

    return () => setIs404(false);
  }, []);

  return (
    <div className="pageNotFound">
      <h1 className="pnfHeader mb-3">404 Not Found</h1>
      <p>The page you are looking for doesn't exist.</p>
      <p>Please visit <Link to="/home">home</Link> or <Link to="/signin">sign in</Link> to continue.</p>
    </div>
  );
}

export default PageNotFound;
