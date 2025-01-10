import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Calendar, User, Clock, Star } from "lucide-react";
import "./Userdashboard.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <h1 className="nav-logo">🎬 Clean Movies</h1>
        <button onClick={handleLogout} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  );
};

const SearchBar = ({ setQuery, genres, setGenre }) => (
  <div className="search-container">
    <Search className="search-icon" size={20} />
    <input
      type="text"
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search for movies by title..."
      className="search-input"
    />
    <select onChange={(e) => setGenre(e.target.value)} className="search-input">
      <option value="">Select Genre</option>
      {genres.map((genre) => (
        <option key={genre.id} value={genre.id}>
          {genre.name}
        </option>
      ))}
    </select>
  </div>
);

const MovieCard = ({ movie }) => {
  const [details, setDetails] = useState(null);
  const API_KEY = "078df9dfba1da4749720454b9a3e1c14";

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/${movie.id}?api_key=${API_KEY}&append_to_response=credits`
        );
        if (!response.ok) throw new Error("Failed to fetch movie details");
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      }
    };

    fetchMovieDetails();
  }, [movie.id]);

  const director = details?.credits?.crew?.find(
    (person) => person.job === "Director"
  )?.name;

  const formatRuntime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  return (
    <div className="movie-card">
      <div className="movie-poster-container">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
          onError={(e) => {
            e.target.src = "/api/placeholder/300/450";
            e.target.alt = "Movie poster not available";
          }}
        />
        <div className="movie-rating">
          <Star className="star-icon" size={16} />
          <span>{movie.vote_average.toFixed(1)}</span>
        </div>
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        
        {details && (
          <div className="movie-details">
            <div className="detail-item">
              <Calendar size={16} />
              <span>{formatDate(movie.release_date)}</span>
            </div>
            
            {details.runtime > 0 && (
              <div className="detail-item">
                <Clock size={16} />
                <span>{formatRuntime(details.runtime)}</span>
              </div>
            )}
            
            {director && (
              <div className="detail-item">
                <User size={16} />
                <span>{director}</span>
              </div>
            )}
            
            {details.genres && (
              <div className="genre-tags">
                {details.genres.slice(0, 2).map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
        
        <p className="movie-overview">{movie.overview}</p>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const [query, setQuery] = useState("");
  const [genre, setGenre] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);

  const API_KEY = "078df9dfba1da4749720454b9a3e1c14";

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch genres.");
        const data = await response.json();
        setGenres(data.genres);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    };

    fetchGenres();
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        let url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}`;
        if (query) {
          url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`;
        } else if (genre) {
          url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_genres=${genre}`;
        }

        const response = await fetch(url);
        if (!response.ok) throw new Error("Failed to fetch movies.");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query, genre]);

  return (
    <div className="dashboard">
      <Navbar />
      <main className="main-content">
        <SearchBar genres={genres} setQuery={setQuery} setGenre={setGenre} />
        
        {loading && (
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
