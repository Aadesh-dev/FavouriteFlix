import React, { useState, memo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import AuthService from "../services/AuthService";

function SignUp(props) {
  const { isUserLoggedIn, setIsSignPage } = props;
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signUpSuccess, setSignUpSuccess] = useState(false);
  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required("Username cannot be empty.")
      .min(5, "Username must contain between 5 and 30 characters")
      .max(30, "Username must contain between 5 and 30 characters"),
    // Below is an example of custom validation logic using test() method
    // username: Yup.string().test(
    //   "username-between-5-and-30-check",
    //   "Username must contain between 5 and 30 characters",
    //   (username) =>
    //     username.length === 0 || (username.length >= 5 && username.length <= 30)
    // ),
    email: Yup.string()
      .required("Username cannot be empty.")
      .email("Please enter a valid email."),
    password: Yup.string()
      .required("Password cannot be empty.")
      .min(8, "Password must contain between 8 and 50 characters")
      .max(50, "Password must contain between 8 and 50 characters"),
    confirm_password: Yup.string()
      .required("Confirm Password cannot be empty.")
      .oneOf([Yup.ref("password"), null], "Passwords do not match."),
    //acceptTerms: Yup.bool().oneOf([true], 'Accept Terms cannot be empty.')
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    criteriaMode: "all",
    mode: "all",
    resolver: yupResolver(validationSchema),
  });
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    AuthService.register(username, email, password)
      .then(() => {
        setSignUpSuccess(true);
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
    if (isUserLoggedIn) navigate("/home");
    setIsSignPage(true);

    return () => setIsSignPage(false);
  }, [isUserLoggedIn, navigate]);

  return (
    <div className="signup container-fluid mt-5">
      <div className="row d-flex justify-content-center align-items-center mx-0">
        <form
          className="signup__form col-12 col-md-8 col-xl-6 py-4 px-4 px-md-5"
          onSubmit={handleSubmit(handleSignUp)}
        >
          <h2 className={`signup__header ${!signUpSuccess ? "mb-5" : "mb-3"}`}>
            Sign Up
          </h2>
          {!signUpSuccess ? (
            <>
              {errorMessage && (
                <div className="signup__authError p-3">
                  {errorMessage === "Error: Username is already taken!" && (
                    <p className="mb-0">
                      An account already exists with this username. Please try
                      with a different username or{" "}
                      <Link to="/signin" className="signin-link-inside-error">
                        sign in
                      </Link>
                      .
                    </p>
                  )}
                  {errorMessage === "Error: Email is already in use!" && (
                    <p className="mb-0">
                      An account already exists with this email. Please try
                      with a different email or{" "}
                      <Link to="/signin" className="signin-link-inside-error">
                        sign in
                      </Link>
                      .
                    </p>
                  )}
                  {errorMessage === "Request failed with status code 504" && (
                    <p className="mb-0">
                      Sorry, we are unable to process your request due to
                      technical difficulties on our side. Please try again later
                      or continue as a guest user.
                    </p>
                  )}
                </div>
              )}
              <div className="signup__input-wrapper mb-5">
                <input
                  id="username"
                  type="text"
                  className={`form-control ${
                    errors.username ? "is-invalid" : ""
                  }`}
                  {...register("username", {
                    onChange: (e) => setUsername(e.target.value),
                  })}
                  placeholder=" "
                  aria-invalid={errors.username ? "true" : "false"}
                />
                <label htmlFor="username" className="signup__input-label">
                  Username
                </label>
                {errors.username && (
                  <p className="form-text-error mt-2 mb-0" id="usernameError">
                    {errors.username.message}
                  </p>
                )}
              </div>
              <div className="signup__input-wrapper mb-5">
                <input
                  id="email"
                  type="text"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  {...register("email", {
                    onChange: (e) => setEmail(e.target.value),
                  })}
                  placeholder=" "
                  aria-invalid={errors.email ? "true" : "false"}
                />
                <label htmlFor="email" className="signup__input-label">
                  Email
                </label>
                {errors.email && (
                  <p className="form-text-error mt-2 mb-0" id="emailError">
                    {errors.email.message}
                  </p>
                )}
              </div>
              <div className="signup__input-wrapper mb-5">
                <input
                  id="password"
                  type="password"
                  className={`form-control ${
                    errors.password ? "is-invalid" : ""
                  }`}
                  {...register("password", {
                    minLength: 8,
                    maxLength: 50,
                    onChange: (e) => setPassword(e.target.value),
                  })}
                  placeholder=" "
                  aria-invalid={errors.password ? "true" : "false"}
                />
                <label htmlFor="password" className="signup__input-label">
                  Password<span className="asterisk"> *</span>
                </label>
                {errors.password && (
                  <p className="form-text-error mt-2 mb-0" id="passwordError">
                    {errors.password.message}
                  </p>
                )}
              </div>
              <div className="signup__input-wrapper mb-4">
                <input
                  id="confirm_password"
                  type="password"
                  className={`form-control ${
                    errors.confirm_password ? "is-invalid" : ""
                  }`}
                  {...register("confirm_password", {
                    minLength: 6,
                    maxLength: 50,
                  })}
                  placeholder=" "
                  aria-invalid={errors.confirm_password ? "true" : "false"}
                />
                <label htmlFor="password" className="signup__input-label">
                  Confirm Password<span className="asterisk"> *</span>
                </label>
                {errors.confirm_password && (
                  <p className="form-text-error mt-2 mb-0" id="passwordError">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
              <div className="d-flex justify-content-center flex-column flex-md-row">
                <button
                  className="btn mb-3 mb-md-0 me-md-4 signup__button"
                  type="submit"
                >
                  Sign Up
                </button>
                <button type="button" className="btn signup__guest" onClick={guestUser}>
                  Continue as guest user
                </button>
              </div>
            </>
          ) : (
            <div className="signup__success p-3">
              Congratulations! You have sucessfully created an account. Please{" "}
              <Link to="/signin" className="signin-link">
                sign in
              </Link>{" "}
              to start saving all your favourite flix in one place.
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default memo(SignUp);
