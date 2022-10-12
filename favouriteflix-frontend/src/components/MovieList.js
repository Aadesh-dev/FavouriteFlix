import React, { memo } from "react";
import Slider from "react-slick";
import Movie from "./Movie";

function MovieList(props) {
  const { movies, slideSettings, lsMovies, setlsMovies } = props;

  const displayData = () => {
    if (!movies.length) {
      return (
        <p className="movielist__emptyMsg">
          Enter any movie or series name in the search bar.
        </p>
      );
    } else {
      if (Array.isArray(movies)) {
        return (
          <Slider {...slideSettings}>
            {movies.map((movie) => (
              <Movie movie={movie} key={movie.imdbID + "-mov"} setlsMovies={setlsMovies} lsMovies={lsMovies} />
            ))}
          </Slider>
        );
      } else {
        return <p className="movielist__errorMsg">{movies}</p>;
      }
    }
  };

  return (
    <section className="movielist">
      <h3 className="movielist__header mt-4 mb-3">Movies</h3>
      {displayData()}
    </section>
  );
}

export default memo(MovieList);
