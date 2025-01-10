import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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
        <h1 className="nav-logo">Clean Movies</h1>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/search">Search</Link></li>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </ul>
      </div>
    </nav>
  );
};

const SearchBar = ({ setQuery }) => {
  const navigate = useNavigate(); // Initialize navigate function from useNavigate

  // Handle input change and navigate to home if the query is cleared
  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    // If the query is cleared, navigate to the home page
    if (query.trim() === "") {
      navigate("/"); // Redirect to home page
    }
  };

  return (
    <div className="search-container">
      <Search className="search-icon" size={20} />
      <input
        type="text"
        onChange={handleInputChange}
        placeholder="Search for movies..."
        className="search-input"
      />
    </div>
  );
};

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
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "078df9dfba1da4749720454b9a3e1c14";

  useEffect(() => {
    const fetchPopularMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
        );
        if (!response.ok) throw new Error("Failed to fetch popular movies.");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularMovies();
  }, []);

  useEffect(() => {
    const fetchSearchedMovies = async () => {
      if (!query) return;
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${query}`
        );
        if (!response.ok) throw new Error("Failed to fetch searched movies.");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    const debounceFetch = setTimeout(fetchSearchedMovies, 500);
    return () => clearTimeout(debounceFetch);
  }, [query]);

  return (
    <div className="dashboard">
      <Navbar />
      <main className="main-content">
        <SearchBar setQuery={setQuery} />
        
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