import React, { memo, useContext } from "react";
import { UserContext } from "../App";
import FavouriteFlixService from "../services/FavouriteFlixService";

const Movie = (props) => {
  const {
    movie,
    fromFavouritesList = false,
    lsMovies,
    setlsMovies,
    deleteOp,
    setDeleteOp,
  } = props;
  const isUserLoggedIn = useContext(UserContext);

  const addToFavourites = () => {
    if (isUserLoggedIn) {
      FavouriteFlixService.addFavFlix(movie)
        .then(() => {
          if (
            lsMovies.filter((lsMovie) => lsMovie.imdbID === movie.imdbID)
              .length === 0
          )
            setlsMovies([...lsMovies, movie]);
        })
        .catch((error) => console.log(error));
    } else {
      localStorage.setItem(movie.imdbID, JSON.stringify(movie));
      if (
        lsMovies.filter((lsMovie) => lsMovie.imdbID === movie.imdbID).length ===
        0
      )
        setlsMovies([...lsMovies, movie]);
    }
  };

  const removeFromFavourites = () => {
    if (isUserLoggedIn) {
      FavouriteFlixService.deleteFavFlix(movie.imdbID)
        .then(() => {
          setlsMovies(
            lsMovies.filter((lsMovie) => lsMovie.imdbID !== movie.imdbID)
          );
          setDeleteOp(!deleteOp);
        })
        .catch((error) => console.log(error));
    } else {
      localStorage.removeItem(movie.imdbID);
      setlsMovies(
        lsMovies.filter((lsMovie) => lsMovie.imdbID !== movie.imdbID)
      );
      setDeleteOp(!deleteOp);
    }
  };

  return (
    <>
      <div className="img-container">
        <img src={movie.Poster} alt={movie.Title} />
        {!fromFavouritesList ? (
          <button className="addFav p-2 m-0" onClick={addToFavourites}>
            <span>
              Add to favourites <i className="fa-solid fa-heart ms-1"></i>
            </span>
          </button>
        ) : (
          <button className="removeFav p-2 m-0" onClick={removeFromFavourites}>
            <span>
              Remove from favourites{" "}
              <i className="fa-regular fa-circle-xmark ms-1"></i>
            </span>
          </button>
        )}
      </div>
      <p className="mt-2 mb-0">{movie.Title}</p>
    </>
  );
};

export default memo(Movie);
