import React, { Component } from 'react';
import PropTypes from 'prop-types';

class MovieCard extends Component {
  render() {
    const { title, genre, rating, description, releaseDate, posterUrl } = this.props.movie;

    return (
      <div className="movie-card">
        <img src={posterUrl} alt={`${title} poster`} className="movie-poster" />
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{rating} / 10</p>
        <p>{description}</p>
        <p><strong>Release Date:</strong> {releaseDate}</p>
      </div>
    );
  }
}

MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    releaseDate: PropTypes.string.isRequired,
    posterUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default MovieCard;
