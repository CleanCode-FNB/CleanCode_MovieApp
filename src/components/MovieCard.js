import React from "react";
import { Link } from "react-router-dom";

const MovieCard = ({ movie, isFavorite, toggleFavorite }) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <h2>{movie.title}</h2>
      <Link to={`/movie/${movie.id}`} className="details-link">
        View More Details
      </Link>
      <button className="favorite-btn" onClick={toggleFavorite}>
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
      
    </div>
  );
};

export default MovieCard;
