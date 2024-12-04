import React from 'react';
import MovieCard from './MovieCard';

const MovieList = () => {
  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 9, description: "A mind-bending thriller by Christopher Nolan.", releaseDate: "2010-07-16" },
    { title: "The Dark Knight", genre: "Action", rating: 9.5, description: "The epic Batman sequel.", releaseDate: "2008-07-18" },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, description: "A journey through space and time to save humanity.", releaseDate: "2014-11-07" },
    { title: "The Matrix", genre: "Sci-Fi", rating: 8.7, description: "A hacker discovers the shocking reality of his world.", releaseDate: "1999-03-31" },
    { title: "Parasite", genre: "Thriller", rating: 8.6, description: "A gripping tale of class struggles in South Korea.", releaseDate: "2019-05-30" },
    { title: "Avengers: Endgame", genre: "Action", rating: 8.4, description: "The Avengers unite for their final showdown.", releaseDate: "2019-04-26" },
    { title: "Forrest Gump", genre: "Drama", rating: 8.8, description: "The inspiring life story of a kind-hearted man.", releaseDate: "1994-07-06" },
    { title: "The Godfather", genre: "Crime", rating: 9.2, description: "The story of a powerful Italian-American crime family.", releaseDate: "1972-03-24" },
    { title: "Pulp Fiction", genre: "Crime", rating: 8.9, description: "An intertwined series of tales from the criminal underworld.", releaseDate: "1994-10-14" },
    { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, description: "A story of hope and friendship inside a prison.", releaseDate: "1994-09-23" }
  ];

  return (
    <div className="movie-list">
      {movies.map((movie, index) => (
        <MovieCard key={index} movie={movie} />
      ))}
    </div>
  );
};

export default MovieList;
