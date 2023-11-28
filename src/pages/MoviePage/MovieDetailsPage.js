// MovieDetailsPage.js
import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom'; // to retrieve URL parameters
import './MovieDetailsPage.css';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [bookingMessage, setBookingMessage] = useState('');
  const { id } = useParams(); // This retrieves the `id` parameter from the URL
  const location = useLocation(); // Added line: useLocation hook to get access to the location object
  const queryParams = new URLSearchParams(location.search);
  const username = queryParams.get('username');


  useEffect(() => {
    // Function to fetch movies from the API and find the movie by id
    const fetchMovies = async () => {
      try {
        const response = await fetch('https://g3thlcx24g.execute-api.us-east-1.amazonaws.com/prod/allmovies');
        const data = await response.json();
        if (data.statusCode === 201) {
          const movies = JSON.parse(data.body);
          console.log(movies);
          // Find the movie with the matching id
          const matchedMovie = movies.find(movie => movie.movieId === id);
          console.log(matchedMovie);
          setMovie(matchedMovie);
        } else {
          console.error('Failed to fetch movies:', data);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, [id]);

  const handleBooking = async () => {
    // Only proceed if we have a movie
    if (movie) {
      const bookingDetails = {
        userId: username,
        movieId: movie.movieId,
      };

      try {
        const response = await fetch('https://g3thlcx24g.execute-api.us-east-1.amazonaws.com/prod/bookingwithsns', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(bookingDetails),
        });

        const data = await response.json();
        if (response.ok) {
          setBookingMessage(data.body);
        } else {
          setBookingMessage('Failed to book the movie. Please try again.');
        }
      } catch (error) {
        setBookingMessage('Failed to connect. Please check your internet connection and try again.');
      }
    }
  };

  if (!movie) {
    return <div>Loading movie details...</div>;
  }

  return (
    <div className="movie-details-container">
      <div className="movie-image">
        <img src={movie.imageUrl} alt={movie.title} />
      </div>
      <div className="movie-info">
        <h1>{movie.title}</h1>
        <p>Director: {movie.director}</p>
        <p>Release Date: {movie.releaseDate}</p>
        <p>Genre: {movie.genre}</p>
        <p>Details: {/* Insert movie details here */}</p>
        <button onClick={handleBooking}>Book Now</button>
        {bookingMessage && <div className="booking-message">{"success"}</div>}
      </div>
    </div>
  );
};

export default MovieDetailsPage;
