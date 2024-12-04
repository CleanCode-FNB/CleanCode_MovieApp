import React, { useState } from "react";
import MovieCard from "./MovieCard";
import Navbar from "./NavBar";

const MovieList = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const movies = [
    { title: "Inception", genre: "Sci-Fi", rating: 9, description: "A mind-bending thriller by Christopher Nolan.", posterUrl: ".https://image-url/inception.jpg"},
    { title: "The Dark Knight", genre: "Action", rating: 9.5, description: "The epic Batman sequel.", posterUrl:"https://image-url/the-dark-knight.jpg"},
    { title: "Interstellar", genre: "Sci-Fi", rating: 8.6, description: "A journey through space and time to save humanity.", posterUrl: "https://image-url/interstellar.jpg" },
    { title: "The Matrix", genre: "Sci-Fi", rating: 8.7, description: "A hacker discovers the shocking reality of his world.", posterUrl: "https://image-url/the-matrix.jpg" },
    { title: "Parasite", genre: "Thriller", rating: 8.6, description: "A gripping tale of class struggles in South Korea.", posterUrl: "https://image-url/parasite.jpg"},
    { title: "Avengers: Endgame", genre: "Action", rating: 8.4, description: "The Avengers unite for their final showdown.", posterUrl: "https://image-url/avengers-endgame.jpg" },
    { title: "Forrest Gump", genre: "Drama", rating: 8.8, description: "The inspiring life story of a kind-hearted man.", posterUrl: "https://image-url/forrest-gump.jpg" },
    { title: "The Godfather", genre: "Crime", rating: 9.2, description: "The story of a powerful Italian-American crime family.", posterUrl: "https://image-url/the-godfather.jpg" },
    { title: "Pulp Fiction", genre: "Crime", rating: 8.9, description: "An intertwined series of tales from the criminal underworld.", posterUrl: "https://image-url/pulp-fiction.jpg" },
    { title: "The Shawshank Redemption", genre: "Drama", rating: 9.3, description: "A story of hope and friendship inside a prison.", posterUrl: "https://image-url/The-Shawshank-Redemption.jpg" },
    { title: "Titanic", genre: "Romance", rating: 7.8, description: "An epic love story set on the doomed Titanic.", posterUrl: "https://image-url/titanic.jpg" },
    { title: "Gladiator", genre: "Action", rating: 8.5, description: "A Roman general seeks revenge for his family's murder.", posterUrl: "https://image-url/Gladiator.jpg" },
    { title: "Joker", genre: "Drama", rating: 8.4, description: "The origin story of Gotham's infamous villain.", posterUrl: "https://image-url/Joker.jpg" },
    { title: "The Lord of the Rings: The Return of the King", genre: "Fantasy", rating: 9, description: "The final battle for Middle-earth.", posterUrl: "https://image-url/The-Lord-of-the-Rings.jpg" },
    { title: "Star Wars: Episode V - The Empire Strikes Back", genre: "Sci-Fi", rating: 8.7, description: "The Rebel Alliance faces the mighty Empire.", posterUrl: "https://image-url/Star-Wars.jpg" },
    { title: "Fight Club", genre: "Drama", rating: 8.8, description: "A man's ordinary life spirals into chaos.", posterUrl: "https://image-url/Fight-Club.jpg" },
    { title: "The Lion King", genre: "Animation", rating: 8.5, description: "A young lion learns to embrace his destiny.", posterUrl: "https://image-url/The-Lion-King.jpg" },
    { title: "Black Panther", genre: "Action", rating: 7.3, description: "A new king must defend Wakanda from enemies.", posterUrl: "https://image-url/Black-Panther.jpg" },
    { title: "Spider-Man: Into the Spider-Verse", genre: "Animation", rating: 8.4, description: "A teen discovers his superhero potential in a multiverse.", posterUrl: "https://image-url/Spider-Man.jpg" },
    { title: "Frozen", genre: "Animation", rating: 7.4, description: "Two sisters navigate a magical adventure in Arendelle.", posterUrl: "https://image-url/Frozen.jpg" }
  ];

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      {/* Keep only one instance of Navbar */}
      <Navbar onSearch={setSearchTerm} />
      <div className="movie-list">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie, index) => <MovieCard key={index} movie={movie} />)
        ) : (
          <p>No movies found matching "{searchTerm}"</p>
        )}
      </div>
    </div>
  );
};

export default MovieList;