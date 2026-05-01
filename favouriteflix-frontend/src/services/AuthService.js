import axios from "axios";

const AUTH_API_URL = process.env.REACT_APP_API_BASE_URL + "/api/auth";

const register = (username, email, password) => {
  return axios.post(AUTH_API_URL + "/signup", {
    username,
    email,
    password,
  });
};

const login = (usernameOrEmail, password) => {
  return axios
    .post(AUTH_API_URL + "/signin", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("token", response.data.accessToken);
      }

      localStorage.setItem("favflixuser", usernameOrEmail);

      return response.data;
    });
};

const isUserLoggedIn = () => {
  return localStorage.getItem("favflixuser");
};

const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("favflixuser");

  return axios.post(AUTH_API_URL + "/signout").then((response) => {
    return response.data;
  });
};

const AuthService = {
  register,
  login,
  isUserLoggedIn,
  logout,
};

export default AuthService;
