import axios from "axios";

const AUTH_API_URL = "http://localhost:3000/api/auth/";

const register = (username, email, password) => {
  return axios.post(AUTH_API_URL + "signup", {
    username,
    email,
    password,
  });
};

const login = (usernameOrEmail, password) => {
  return axios
    .post(AUTH_API_URL + "signin", {
      usernameOrEmail,
      password,
    })
    .then((response) => {
      if (response.data.message) {
        localStorage.setItem("favflixuser", response.data.message);
      }

      return response.data;
    })
};

const isUserLoggedIn = () => {
  return localStorage.getItem("favflixuser");
};

const logout = () => {
  localStorage.removeItem("favflixuser");
  return axios.post(AUTH_API_URL + "signout").then((response) => {
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
