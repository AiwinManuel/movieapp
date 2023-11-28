import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import './MoviePage.css';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const history = useHistory();
  const location = useLocation(); // Added line: useLocation hook to get access to the location object
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');

  useEffect(() => {
    // Function to fetch movies from the API
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://g3thlcx24g.execute-api.us-east-1.amazonaws.com/prod/allmovies');
        const data = await response.json();
        if (data.statusCode === 201) {
          // Parse the body to JSON
          setMovies(JSON.parse(data.body));
        } else {
          // Handle any other status codes or errors
          console.error('Failed to fetch movies:', data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Function to handle booking button click
  const handleBooking = (movieId) => {
    // Navigate to the booking page with the movieId
    history.push(`/movie-details/${movieId}?username=${encodeURIComponent(username)}`); 
  };

  return (
    <div className="blog-container">
      <header className="blog-header">
        <h1>Book My Movie</h1>
        <p>The • Latest • Movies</p>
      </header>
      <div className="grid-container">
        {movies.map((movie) => (
          <div className="grid-item" key={movie.movieId}>
            <img src={movie.imageUrl} alt={movie.title} />
            <button onClick={() => handleBooking(movie.movieId)}>BOOK</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;
