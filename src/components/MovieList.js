import React, { useState } from 'react';
import MovieCard from './MovieCard';
import SearchBar from './SearchBar';

const MovieList = () => {
  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 9, description: "A mind-bending thriller by Christopher Nolan." },
    { title: "The Dark Knight", genre: "Action", rating: 9.5, description: "The epic Batman sequel." },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, description: "A journey through space and time to save humanity." },
    { title: "The Matrix", genre: "Sci-Fi", rating: 8.7, description: "A hacker discovers the shocking reality of his world." },
    { title: "Parasite", genre: "Thriller", rating: 8.6, description: "A gripping tale of class struggles in South Korea." },
    { title: "Avengers: Endgame", genre: "Action", rating: 8.4, description: "The Avengers unite for their final showdown." },
    { title: "Forrest Gump", genre: "Drama", rating: 8.8, description: "The inspiring life story of a kind-hearted man." },
    { title: "The Godfather", genre: "Crime", rating: 9.2, description: "The story of a powerful Italian-American crime family." },
    { title: "Pulp Fiction", genre: "Crime", rating: 8.9, description: "An intertwined series of tales from the criminal underworld." },
    { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, description: "A story of hope and friendship inside a prison." },
    { title: "Titanic", genre: "Romance", rating: 7.8, description: "An epic love story set on the doomed Titanic." },
    { title: "Gladiator", genre: "Action", rating: 8.5, description: "A Roman general seeks revenge for his family's murder." },
    { title: "Joker", genre: "Drama", rating: 8.4, description: "The origin story of Gotham's infamous villain." },
    { title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", rating: 9, description: "The final battle for Middle-earth." },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Sci-Fi", rating: 8.7, description: "The Rebel Alliance faces the mighty Empire." },
    { title: "Fight Club", genre: "Drama", rating: 8.8, description: "A man's ordinary life spirals into chaos." },
    { title: "The Lion King", genre: "Animation", rating: 8.5, description: "A young lion learns to embrace his destiny." },
    { title: "Black Panther", genre: "Action", rating: 7.3, description: "A new king must defend Wakanda from enemies." },
    { title: "Spider-Man: Into the Spider-Verse", genre: "Animation", rating: 8.4, description: "A teen discovers his superhero potential in a multiverse." },
    { title: "Frozen", genre: "Animation", rating: 7.4, description: "Two sisters navigate a magical adventure in Arendelle." }
  ];

  const [filteredMovies, setFilteredMovies] = useState(movies);
  const [query, setQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');
  const [selectedSort, setSelectedSort] = useState('rating');

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
      filteredList = filteredList.filter((movie) => movie.genre === selectedGenre);
    }

    // Apply sorting
    if (selectedSort === 'rating') {
      filteredList = filteredList.sort((a, b) => b.rating - a.rating);
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
