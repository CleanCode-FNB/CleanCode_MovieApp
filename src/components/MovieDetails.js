import React, { Component } from 'react';
import axios from 'axios';

class MovieDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: null,
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { match } = this.props; // Assuming you're using React Router
    const movieId = match.params.id;

    axios.get(`http://localhost:5000/movies/${movieId}`)
      .then(response => {
        this.setState({ movie: response.data, loading: false });
      })
      .catch(error => {
        this.setState({ error: 'Failed to fetch movie details', loading: false });
      });
  }

  render() {
    const { loading, movie, error } = this.state;

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
      <div className="movie-details">
        <img src={movie.posterUrl} alt={`${movie.title} poster`} className="movie-poster" />
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p><strong>Genre:</strong> {movie.genre}</p>
        <p><strong>Rating:</strong> {movie.rating}</p>
        <p><strong>Release Date:</strong> {movie.releaseDate}</p>
      </div>
    );
  }
}

export default MovieDetails;

