import React from "react";
import axios from "axios";
import { debounce } from "../utils";

const Search = (props) => {
  const { setMovies } = props;

  const getMovies = async (searchText) => {
    const moviesResponse = await axios.get("https://www.omdbapi.com/", {
      params: {
        apikey: process.env.REACT_APP_OMDB_API_KEY,
        s: searchText,
      },
    });

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
        "Enter something more specific to get relevant search results.",
      );
      return;
    }

    setMovies([]);
  };

  const debouncedGetMovies = debounce(getMovies, 500);

  return (
    <div className="Search ms-md-auto me-3 col col-md-auto">
      <input
        type="search"
        placeholder="Search"
        className="form-control"
        onChange={(event) => debouncedGetMovies(event.target.value)}
      ></input>
    </div>
  );
};

export default Search;
