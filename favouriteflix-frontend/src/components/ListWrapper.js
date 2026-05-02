import React, { useState } from "react";
import MovieList from "./MovieList";
import FavouriteList from "./FavouriteList";
import SlickArrow from "../icons/SlickArrow";

function ListWrapper(props) {
  const { movies } = props;
  const [favouriteMovies, setFavouriteMovies] = useState([]);
  const slideSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    nextArrow: <SlickArrow aria-label="Next arrow" />,
    prevArrow: <SlickArrow aria-label="Previous arrow" />,
    responsive: [
      {
        breakpoint: 1199,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <>
      <MovieList
        movies={movies}
        slideSettings={slideSettings}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
      />
      <FavouriteList
        slideSettings={slideSettings}
        favouriteMovies={favouriteMovies}
        setFavouriteMovies={setFavouriteMovies}
      />
    </>
  );
}

export default ListWrapper;
