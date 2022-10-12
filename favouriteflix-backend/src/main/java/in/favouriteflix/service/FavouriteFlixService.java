package in.favouriteflix.service;

import java.util.List;

import in.favouriteflix.entities.FavouriteFlix;

public interface FavouriteFlixService {
	public List<FavouriteFlix> getAllFavFlix();
	public FavouriteFlix addFavFlix(FavouriteFlix favouriteFlix);
	public void deleteFavFlix(String imdbID);
}
