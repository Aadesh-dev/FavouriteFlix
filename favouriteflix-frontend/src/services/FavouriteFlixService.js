import axios from "axios";

const FAVOURITEFLIX_API_BASE_URL = process.env.REACT_APP_API_BASE_URL + "/favflix";

class FavouriteFlixService {
  addFavFlix(favFlix) {
    return axios.post(FAVOURITEFLIX_API_BASE_URL + "/addFavFlix", favFlix);
  }

  getAllFavFlix() {
    return axios.get(FAVOURITEFLIX_API_BASE_URL + "/getAllFavFlix");
  }

  deleteFavFlix(imdbID) {
    return axios.delete(
      FAVOURITEFLIX_API_BASE_URL + "/deleteFavFlix/" + imdbID
    );
  }
}

export default new FavouriteFlixService();
