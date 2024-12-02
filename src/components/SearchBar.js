import React, { Component } from 'react';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = { query: '' };
  }

  handleChange = (event) => {
    this.setState({ query: event.target.value });
    this.props.onSearch(event.target.value);
  };

  render() {
    return (
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a movie..."
          value={this.state.query}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default SearchBar;
