import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Movie from "./Movie";
import FavouriteFlixService from "../services/FavouriteFlixService";
import { UserContext } from "../App";

function FavouriteList(props) {
  const { favouriteMovies, setFavouriteMovies, slideSettings } = props;
  const [deleteOp, setDeleteOp] = useState(false);
  const isUserLoggedIn = useContext(UserContext);
  const sliderRef = useRef();

  useEffect(() => {
    if (isUserLoggedIn) {
      FavouriteFlixService.getAllFavFlix()
        .then((response) => setFavouriteMovies(response.data))
        .catch((error) => console.log(error));
    } else {
      const item = [];
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "token")
          item.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
      setFavouriteMovies(item);
    }
  }, [isUserLoggedIn, setFavouriteMovies]);

  useEffect(() => {
    sliderRef.current?.slickGoTo(
      sliderRef.current.innerSlider.state.currentSlide,
    );
  }, [deleteOp]);

  return (
    <section className="favouriteslist">
      <h3 className="favouriteslist__header mt-4 mb-3">Favourites</h3>
      {!favouriteMovies.length ? (
        <p className="favouriteslist__emptyMsg mb-0">
          You don't have any favourites currently.
        </p>
      ) : (
        <Slider {...slideSettings} ref={sliderRef}>
          {favouriteMovies.map((lsMovie) => (
            <Movie
              movie={lsMovie}
              key={lsMovie.imdbID + "-fav"}
              fromFavouritesList={true}
              favouriteMovies={favouriteMovies}
              setFavouriteMovies={setFavouriteMovies}
              setDeleteOp={setDeleteOp}
              deleteOp={deleteOp}
            />
          ))}
        </Slider>
      )}
    </section>
  );
}

export default memo(FavouriteList);
