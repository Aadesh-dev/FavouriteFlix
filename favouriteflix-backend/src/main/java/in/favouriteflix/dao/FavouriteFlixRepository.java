package in.favouriteflix.dao;

import org.springframework.data.repository.CrudRepository;

import in.favouriteflix.entities.FavouriteFlix;

public interface FavouriteFlixRepository extends CrudRepository<FavouriteFlix,String> {
}
