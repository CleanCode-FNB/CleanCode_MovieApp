import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Userdashboard.css'

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-content">
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
        </ul>
        <button onClick={handleLogout} className="logout-button">
          Logout
        </button>
      </div>
    </nav>
  );
};

const MovieCard = ({ movie }) => {
  const { title, genre, rating, description } = movie;
  return (
    <div className="movie-card">
      <div className="movie-content">
        <h3 className="movie-title">{title}</h3>
        <div className="movie-meta">
          <span className="movie-genre">{genre}</span>
          <span className="movie-rating">★ {rating}/10</span>
        </div>
        <p className="movie-description">{description}</p>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 9, description: "A mind-bending thriller by Christopher Nolan." },
    { title: "The Dark Knight", genre: "Action", rating: 9.5, description: "The epic Batman sequel." },
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, description: "A journey through space and time to save humanity." },
    { title: "The Matrix", genre: "Sci-Fi", rating: 8.7, description: "A hacker discovers the shocking reality of his world." },
    { title: "Parasite", genre: "Thriller", rating: 8.6, description: "A gripping tale of class struggles in South Korea." },
    { title: "Avengers: Endgame", genre: "Action", rating: 8.4, description: "The Avengers unite for their final showdown." }
  ];

  const calculateFavoriteGenre = () => {
    const genreCounts = movies.reduce((acc, movie) => {
      acc[movie.genre] = (acc[movie.genre] || 0) + 1;
      return acc;
    }, {});
    return Object.entries(genreCounts).sort((a, b) => b[1] - a[1])[0][0];
  };

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
          <p className="dashboard-subtitle">Your personal movie collection and recommendations</p>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <h3 className="stat-title">Total Movies</h3>
            <p className="stat-value">{movies.length}</p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Average Rating</h3>
            <p className="stat-value">
              {(movies.reduce((acc, movie) => acc + movie.rating, 0) / movies.length).toFixed(1)}
            </p>
          </div>
          <div className="stat-card">
            <h3 className="stat-title">Favorite Genre</h3>
            <p className="stat-value">{calculateFavoriteGenre()}</p>
          </div>
        </div>

        <div className="movies-section">
          <h2 className="dashboard-title">Your Movie Collection</h2>
          <div className="movies-grid">
            {movies.map((movie, index) => (
              <MovieCard key={index} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default UserDashboard;