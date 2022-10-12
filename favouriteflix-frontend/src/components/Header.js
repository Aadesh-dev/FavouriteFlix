import React, { memo } from "react";
import { useNavigate } from "react-router-dom";
import ClapboardIcon from "../icons/ClapboardIcon";
import AuthService from "../services/AuthService";

function Header(props) {
  const { setSearchText, isUserLoggedIn, setIsUserLoggedIn, isSignPage, is404 } =
    props;
  const navigate = useNavigate();
  //A way to get props passed from navigate()
  // const { state } = useLocation();
  // const isGuestUser = state && state.isGuestUser;

  const handleLogout = () => {
    AuthService.logout().then(() => {
      navigate("/");
      setIsUserLoggedIn(false);
    });
  };

  return (
    <header className="navbar navbar-dark pb-3 pb-md-2">
      <nav className="container-fluid flex-column flex-md-row">
        <h2 className="navbar-logo me-0 me-md-auto">
          <span className="me-2">FavouriteFlix</span>
          <ClapboardIcon />
        </h2>
        {!isSignPage && !is404 ? (
          <div className="navbar__search-container d-flex justify-content-between col">
            <div className="Search ms-md-auto me-3 col col-md-auto">
              <input
                type="search"
                placeholder="Search"
                className="form-control"
                onChange={(event) => setSearchText(event.target.value)}
              ></input>
            </div>
            {isUserLoggedIn ? (
              <button
                type="button"
                className="btn btn-outline signout__btn"
                onClick={handleLogout}
              >
                Sign out <i className="fa-solid fa-right-from-bracket"></i>
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-outline signin__btn"
                onClick={() => navigate("/signin")}
              >
                Sign in <i className="fa-solid fa-circle-user"></i>
              </button>
            )}
          </div>
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
}

export default memo(Header);
