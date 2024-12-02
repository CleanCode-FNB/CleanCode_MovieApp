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
        <h1>{movie.title}</h1>
        <p>{movie.description}</p>
        <p>Genre: {movie.genre}</p>
        <p>Rating: {movie.rating}</p>
       
      </div>
    );
  }
}

export default MovieDetails;
