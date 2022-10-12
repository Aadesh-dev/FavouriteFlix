import React, { useState, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";

function SignIn(props) {
  const {isUserLoggedIn, setIsUserLoggedIn, setIsSignPage } = props;
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ criteriaMode: "all", mode: "all" });
  const navigate = useNavigate();

  const handleLogin = (data) => {
    AuthService.login(usernameOrEmail, password)
      .then(() => {
        navigate("/home");
        setIsUserLoggedIn(true);
      })
      .catch((error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setErrorMessage(resMessage);
      });
  };

  const guestUser = () => {
    navigate("/home")
  }

  useEffect(() => {
    if(isUserLoggedIn) navigate("/home");
    setIsSignPage(true);

    return () => setIsSignPage(false);
  }, [isUserLoggedIn, navigate, setIsSignPage]);

  return (
    <div className="signin container-fluid mt-5">
      <div className="row d-flex justify-content-center align-items-center mx-0">
        <form
          className="signin__form col-12 col-md-8 col-xl-6 py-4 px-4 px-md-5"
          onSubmit={handleSubmit(handleLogin)}
        >
          <h2 className="signin__header mb-5">Sign In</h2>
          {errorMessage && (
            <div className="signin__authError p-3">
              {errorMessage === "Bad credentials" && (
                <p className="mb-0">
                  Sorry, we cannot find an account with these credentials.
                  Please try again or{" "}
                  <Link to="/signup" className="signup-link">
                    create a new account
                  </Link>
                  .
                </p>
              )}
              {errorMessage === "Request failed with status code 504" && (
                <p className="mb-0">
                  Sorry, we are unable to process your request due to technical
                  difficulties on our side. Please try again later or continue
                  as a guest user.
                </p>
              )}
            </div>
          )}
          <div className="signin__input-wrapper mb-5">
            <input
              id="usernameOrEmail"
              type="text"
              className={`form-control ${errors.usernameOrEmail ? 'is-invalid' : ''}`}
              {...register("usernameOrEmail", {
                required: true,
                onChange: (e) => setUsernameOrEmail(e.target.value),
              })}
              placeholder=" "
              aria-required="true"
              aria-invalid={errors.usernameOrEmail ? "true" : "false"}
            />
            <label htmlFor="usernameOrEmail" className="signin__input-label">
              Username or Email<span className="asterisk"> *</span>
            </label>
            {errors.usernameOrEmail && (
              <p
                className="form-text-error mt-2 mb-0"
                id="usernameOrEmailError"
              >
                Username or email cannot be empty.
              </p>
            )}
          </div>
          <div className="signin__input-wrapper mb-4">
            <input
              id="password"
              type="password"
              className={`form-control ${errors.password ? 'is-invalid' : ''}`}
              {...register("password", {
                required: true,
                minLength: 8,
                maxLength: 50,
                onChange: (e) => setPassword(e.target.value),
              })}
              placeholder=" "
              aria-required="true"
              aria-invalid={errors.password ? "true" : "false"}
            />
            <label htmlFor="password" className="signin__input-label">
              Password<span className="asterisk"> *</span>
            </label>
            {errors.password?.type === "required" && (
              <p className="form-text-error mt-2 mb-0" id="passwordReqError">
                Password cannot be empty.
              </p>
            )}
            {(errors.password?.type === "minLength" ||
              errors.password?.type === "maxLength") && (
              <p className="form-text-error mt-2 mb-0" id="passwordMinMaxError">
                Password must contain between 8 and 50 characters.
              </p>
            )}
          </div>
          <div className="d-flex justify-content-center flex-column flex-md-row">
            <button
              className="btn mb-3 mb-md-0 me-md-4 signin__button"
              type="submit"
            >
              Sign In
            </button>
            <button type="button" className="btn signin__guest" onClick={guestUser}>
              Continue as guest user
            </button>
          </div>
          <p className="signin__signup-msg text-center mt-5">
            Don't have an account?{" "}
            <Link to="/signup" className="signup-link">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default memo(SignIn);
