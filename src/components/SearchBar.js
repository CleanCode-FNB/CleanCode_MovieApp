import React from "react";

function SearchBar({ setQuery }) {
  const handleInputChange = (e) => setQuery(e.target.value);

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search for movies..."
        onChange={handleInputChange}
      />
    </div>
  );
}

export default SearchBar;
