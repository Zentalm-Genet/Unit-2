import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./components/Header";
import MovieScreen from "./components/MovieScreen";
import Watchlist from "./components/Watchlist";
import "./App.css";

function App() {
  const [list, setList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const addMovie = (movie) => setList([...list, movie]);

  const removeMovie = (movie) => {
    const newState = list.filter((mov) => mov.id !== movie.id);
    setList(newState);
  };

  const getData = () => {
    setLoading(true);
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=${page}`
      )
      .then((res) => {
        console.log(res.data.results);
        setMovieList(res.data.results);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <div className="App">
      <Header />
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <MovieScreen
            addMovie={addMovie}
            movieList={movieList}
            page={page}
            setPage={setPage}
            list={list}
            removeMovie={removeMovie}
          />
        )}
        <Watchlist list={list} removeMovie={removeMovie} />
      </main>
    </div>
  );
}

export default App;
