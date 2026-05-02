import axios from "axios";

const AUTH_API_URL = process.env.REACT_APP_API_BASE_URL + "/api/auth";

class AuthService {
  register(username, email, password) {
    return axios.post(AUTH_API_URL + "/signup", {
      username,
      email,
      password,
    });
  }

  login(usernameOrEmail, password) {
    return axios
      .post(AUTH_API_URL + "/signin", {
        usernameOrEmail,
        password,
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("token", response.data.accessToken);
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("token");

    return axios.post(AUTH_API_URL + "/signout").then((response) => {
      return response.data;
    });
  }
}

export default new AuthService();
