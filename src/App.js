import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MovieList from './components/MovieList';
import MovieDetails from './components/MovieDetails';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import './App.css';

const App = () => {
  return (
    <div className="app-container">
      <Navbar />
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
