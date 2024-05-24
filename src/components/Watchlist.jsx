import React from "react";
import MovieCard from "./MovieCard";

const Watchlist = ({ list, removeMovie }) => {
  const movieDisplay = list.map((movie) => (
    <MovieCard key={movie.id} movie={movie} removeMovie={removeMovie} list={list} />
  ));

  return (
    <div className="watchlist">
      <h1>My Watchlist</h1>
      <div className="movie-container">
        {movieDisplay.length > 0 ? movieDisplay : <p>No movies in your watchlist. Add some!</p>}
      </div>
    </div>
  );
};

export default Watchlist;
