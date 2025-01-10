import React from "react";
import { useNavigate } from "react-router-dom";  // Import useNavigate hook from react-router-dom

function SearchBar({ setQuery }) {
  const navigate = useNavigate();  // Initialize navigate function from useNavigate

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);

    // If the query is cleared, navigate to the home page
    if (query.trim() === "") {
      navigate("/");  // Redirect to home page
    }
  };

}

export default SearchBar;