import React, { useState } from "react";

const Navbar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    onSearch(value); // Pass the search term to the parent component
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault(); // Prevent the default form submission behavior
      onSearch(query); // Execute the search
    }
  };

  return (
    <div className="navbar">
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <input
          type="text"
          placeholder="Search for a movie here"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown} // Add the keydown handler here
          className="search-input"
        />
      </ul>
      <button>SIGN IN</button>
    </div>
  );
};

export default Navbar;
