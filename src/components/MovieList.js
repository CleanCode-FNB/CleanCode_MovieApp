import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const MovieList = () => {
  const API_KEY = '078df9dfba1da4749720454b9a3e1c14';
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;

  const [movies, setMovies] = useState([]); // State to hold movies
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSort, setSelectedSort] = useState('rating');

  // Fetch movies from the API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(API_URL);
        setMovies(response.data.results); // Set the fetched movies in the state
        setFilteredMovies(response.data.results); // Set the filtered list initially to all fetched movies
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies(); // Call the function to fetch data
  }, []); // Empty dependency array means this will only run once, on component mount

  // Handle the search, filter, and sort logic 
  const handleSearch = (query, selectedGenre, selectedSort) => {
    let filteredList = movies;

    // Apply search query filter 
    if (query) {
      filteredList = filteredList.filter((movie) =>
        movie.title.toLowerCase().includes(query.toLowerCase())
      );
    }

    // Apply genre filter 
    if (selectedGenre && selectedGenre !== 'All') {
      filteredList = filteredList.filter((movie) => movie.genre_ids.includes(selectedGenre)); // Assume genres are by IDs
    }

    // Apply sorting 
    if (selectedSort === 'rating') {
      filteredList = filteredList.sort((a, b) => b.vote_average - a.vote_average); // Using vote_average for rating
    } else if (selectedSort === 'title') {
      filteredList = filteredList.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Update the state with filtered and sorted list 
    setFilteredMovies(filteredList);
  };

  // Handle SearchBar changes 
  const handleSearchQueryChange = (newQuery) => {
    setQuery(newQuery);
    handleSearch(newQuery, selectedGenre, selectedSort);
  };

  const handleGenreChange = (newGenre) => {
    setSelectedGenre(newGenre);
    handleSearch(query, newGenre, selectedSort);
  };

  const handleSortChange = (newSort) => {
    setSelectedSort(newSort);
    handleSearch(query, selectedGenre, newSort);
  };

  return (
    <div>
      <SearchBar
        onSearch={handleSearchQueryChange}
        onGenreChange={handleGenreChange}
        onSortChange={handleSortChange}
        selectedGenre={selectedGenre}
        selectedSort={selectedSort}
      />
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => (
            <MovieCard key={index} movie={movie} />
          ))
        ) : (
          <p>No movies found</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;
