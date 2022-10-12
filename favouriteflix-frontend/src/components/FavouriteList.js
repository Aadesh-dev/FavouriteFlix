import React, { memo, useContext, useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import Movie from "./Movie";
import FavouriteFlixService from "../services/FavouriteFlixService";
import { UserContext } from "../App";

function FavouriteList(props) {
  const { lsMovies, setlsMovies, slideSettings } = props;
  const [deleteOp, setDeleteOp] = useState(false);
  const isUserLoggedIn = useContext(UserContext);
  const sliderRef = useRef();

  useEffect(() => {
    if (isUserLoggedIn) {
      FavouriteFlixService.getAllFavFlix()
        .then((response) => setlsMovies(response.data))
        .catch((error) => console.log(error));
    } else {
      const item = [];
      for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.key(i) !== "favflixuser")
          item.push(JSON.parse(localStorage.getItem(localStorage.key(i))));
      }
      setlsMovies(item);
    }
  }, [isUserLoggedIn, setlsMovies]);

  useEffect(() => {
    sliderRef.current?.slickGoTo(sliderRef.current.innerSlider.state.currentSlide);
  }, [deleteOp])

  return (
    <section className="favouriteslist">
      <h3 className="favouriteslist__header mt-4 mb-3">Favourites</h3>
      {!lsMovies.length ? (
        <p className="favouriteslist__emptyMsg mb-0">
          You don't have any favourites currently.
        </p>
      ) : (
        <Slider {...slideSettings} ref={sliderRef}>
          {lsMovies.map((lsMovie) => (
            <Movie
              movie={lsMovie}
              key={lsMovie.imdbID + "-fav"}
              fromFavouritesList={true}
              lsMovies={lsMovies}
              setlsMovies={setlsMovies}
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
