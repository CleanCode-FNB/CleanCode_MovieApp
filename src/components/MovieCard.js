import React, { Component } from 'react';
import PropTypes from 'prop-types';


class MovieCard extends Component {
  render() {
    const { title, genre, rating, description } = this.props.movie;
    
    return (
      <div className="movie-card">
        <h3>{title}</h3>
        <p>{genre}</p>
        <p>{rating} / 10</p>
        <p>{description}</p>
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
  }).isRequired,
};

export default MovieCard;
