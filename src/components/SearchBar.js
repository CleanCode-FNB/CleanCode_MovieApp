import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      selectedSort: 'rating',  // Default sort by rating 
      selectedGenre: 'All',   // Default filter for all genres 
    };
  }

  // Handle search query change 
  handleSearchChange = (event) => {
    const query = event.target.value;
    this.setState({ query });
    this.props.onSearch(query, this.state.selectedGenre, this.state.selectedSort);
  };

  // Handle genre filter change 
  handleGenreChange = (event) => {
    const selectedGenre = event.target.value;
    this.setState({ selectedGenre });
    this.props.onSearch(this.state.query, selectedGenre, this.state.selectedSort);
  };

  // Handle sorting change 
  handleSortChange = (event) => {
    const selectedSort = event.target.value;
    this.setState({ selectedSort });
    this.props.onSearch(this.state.query, this.state.selectedGenre, selectedSort);
  };

  render() {
    return (
      <div className="search-bar">
        {/* Search input */}
        <input
          type="text"
          placeholder="Search for a movie..."
          value={this.state.query}
          onChange={this.handleSearchChange}
        />

        {/* Genre filter */}
        <select value={this.state.selectedGenre} onChange={this.handleGenreChange}>
          <option value="All">All Genres</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Romance">Romance</option>
          <option value="Action">Action</option>
          <option value="Comedy">Comedy</option>
          {/* Add more genres as necessary */}
        </select>

        {/* Sorting options */}
        <select value={this.state.selectedSort} onChange={this.handleSortChange}>
          <option value="rating">Sort by Rating</option>
          <option value="releaseDate">Sort by Release Date</option>
        </select>
      </div>
    );
  }
}

export default SearchBar;
