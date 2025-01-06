import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import MovieCard from "../components/MovieCard";

const API_KEY = "078df9dfba1da4749720454b9a3e1c14";

function Home() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const MovieList = async () => {
    if (query) {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
      );
      const data = await response.json();
      setMovies(data.results || []);
    }
  };

  useEffect(() => {
    MovieList();
  }, [query]);

  return (
    <div>
      <SearchBar setQuery={setQuery} />
      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Home;
