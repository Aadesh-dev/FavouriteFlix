import React, { useState, useEffect } from "react";
import axios from "axios";
import MovieList from "./MovieList";
import FavouriteList from "./FavouriteList";
import SlickArrow from "../icons/SlickArrow";

function ListWrapper(props) {
  const { searchText, setSearchText} = props;
  const baseURI = "http://www.omdbapi.com/?apikey=3c28e594";
  const [movies, setMovies] = useState([]);
  const [lsMovies, setlsMovies] = useState([]);
  const slideSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    //initialSlide: 0,
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

  const getMovies = async (text) => {
    const moviesResponse = await axios.get(baseURI + `&s=${text}`);
    const moviesJson = moviesResponse.data;
    if (moviesJson.Search) {
      setMovies(moviesJson.Search);
      return;
    }
    if (moviesJson.Error === "Movie not found!") {
      setMovies("Your search query didn't return any results.");
      return;
    }
    if (moviesJson.Error === "Too many results.") {
      setMovies(
        "Enter something more specific to get relevant search results."
      );
      return;
    }
    setMovies([]);
  };

  useEffect(() => {
    getMovies(searchText);
  }, [searchText]);

  useEffect(() => {
    return () => setSearchText("");
  }, []);

  return (
    <>
      <MovieList
        movies={movies}
        slideSettings={slideSettings}
        lsMovies={lsMovies}
        setlsMovies={setlsMovies}
      />
      <FavouriteList
        slideSettings={slideSettings}
        lsMovies={lsMovies}
        setlsMovies={setlsMovies}
      />
    </>
  );
}

export default ListWrapper;
