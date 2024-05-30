import React, { useState } from 'react';
import axios from 'axios';
import './Search.css';
import MovieCard from './MovieCard';

const API_KEY = '509977cc';
const BASE_URL = 'https://www.omdbapi.com/';

const Search = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(BASE_URL, {
        params: {
          s: query,
          apikey: API_KEY
        }
      });
      setMovies(response.data.Search || []);
    } catch (error) {
      console.error("Error fetching data: ", error);
    }
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredMovies = movies.filter(movie => {
    if (!filter) return true;
    return movie.Year === filter;
  });

  return (
    <div className="search">
    <br></br>
      <h1>Movie Search</h1>
      <div className="search-bar">
        <input 
          type="text" 
          placeholder="Search for a movie" 
          value={query} 
          onChange={(e) => setQuery(e.target.value)} 
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="filter">
        <select value={filter} onChange={handleFilterChange}>
          <option value="">Filter by Year</option>
          {Array.from(new Set(movies.map(movie => movie.Year))).map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div className="movie-grid">
        {filteredMovies.map(movie => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
};

export default Search;
