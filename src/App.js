import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Footer from './components/Footer';
import Header from './components/Header'; // Import the Header component
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      {/* Header appears above the Navbar */}
      <Header />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<MovieList />} />
          <Route path="/movies/:id" element={<MovieDetails />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
