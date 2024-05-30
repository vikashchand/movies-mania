import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playlist.css'; // Import CSS for styling

const Playlist = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('https://manasmoviebackend.vercel.app/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists: ', error);
      }
    };

    fetchLists();
  }, []);

  return (
    <div className="playlist">
    <br></br>
      <h1>Public Playlists</h1>
      <div className="playlist-container">
        {lists.map((list, index) => (
          <div key={list._id["$oid"]} className="playlist-card">
            <h2>Playlist name: {list.name}</h2>
            <h2>Created by: {list.userEmail}</h2>
            <ol className="movies">
              {list.movies.map((movie, movieIndex) => (
                <li key={movie._id["$oid"]} className="movie">
                  <span className="number">{movieIndex + 1}.</span>
                  <span className="title">{movie.title}</span>
                  <span className="year">({movie.year})</span>
                </li>
              ))}
            </ol>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Playlist;
