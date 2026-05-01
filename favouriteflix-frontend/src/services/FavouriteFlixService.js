import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL + "/api/favflix",
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

class FavouriteFlixService {
  addFavFlix(favFlix) {
    return api.post("/addFavFlix", favFlix);
  }

  getAllFavFlix() {
    return api.get("/getAllFavFlix");
  }

  deleteFavFlix(imdbID) {
    return api.delete("/deleteFavFlix/" + imdbID);
  }
}

export default new FavouriteFlixService();
