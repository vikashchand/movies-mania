// MovieCard.js
import React from 'react';
import './MovieCard.css';
import axios from 'axios';

const handleSaveToList = async (movie) => {
    try {
      const listName = window.prompt('Enter the name of the list:');
      if (!listName) return; // If the user cancels or leaves the input empty, do nothing
  
      const { Title, Year, Type } = movie; // Extract movie details
      const response = await axios.post('https://manasmoviebackend.vercel.app/lists', {
        name: listName,
        movie: {
          title: Title,
          year: Year,
          type: Type
        }
      });
      alert('Movie added to list successfully!');
    } catch (error) {
      console.error('Error saving movie to list: ', error);
      alert('Failed to save movie to list.');
    }
};

const MovieCard = ({ movie }) => {
  return (
    <div className="movie-card">
      <img src={movie.Poster} alt={movie.Title} />
      <div className="movie-details">
        <h2>{movie.Title}</h2>
        <p>{movie.Year}</p>
        <p>{movie.Type}</p>
        <button onClick={() => handleSaveToList(movie)}>Add to List</button>
      </div>
    </div>
  );
};

export default MovieCard;
