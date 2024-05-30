import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Playlist.css'; // Import CSS for styling

const Private = () => {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('https://manasmoviebackend.vercel.app/lists/private');
        setLists(response.data);
      } catch (error) {
        console.error('Error fetching lists: ', error);
      }
    };

    fetchLists();
  }, []);

  const togglePrivacy = async (id, currentStatus) => {
    console.log(id);
    try {
      const response = await axios.put(`https://manasmoviebackend.vercel.app/lists/${id}/privacy`, {
        isPrivate: !currentStatus
      });
      setLists(lists.map(list => list._id === id ? { ...list, isPrivate: !currentStatus } : list));
    } catch (error) {
      console.error('Error updating privacy status: ', error);
    }
  };

  const deletePlaylist = async (id) => {
    try {
      await axios.delete(`https://manasmoviebackend.vercel.app/lists/${id}`);
      setLists(lists.filter(list => list._id !== id));
    } catch (error) {
      console.error('Error deleting playlist: ', error);
    }
  };

  return (
    <div className="playlist">
      <br />
      <h1>Your Playlists</h1>
      <div className="playlist-container">
        {lists.map((list) => (
          <div key={list._id} className="playlist-card">
            <h2>Playlist name: {list.name}</h2>
            <h2>Created by: {list.userEmail}</h2>
            <ol className="movies">
              {list.movies.map((movie, movieIndex) => (
                <li key={movie._id} className="movie">
                  <span className="number">{movieIndex + 1}.</span>
                  <span className="title">{movie.title}</span>
                  <span className="year">({movie.year})</span>
                </li>
              ))}
            </ol>
            <button className='playlistbtn' onClick={() => togglePrivacy(list._id, list.isPrivate)}>
              {list.isPrivate ? 'Make Public' : 'Make Private'}
            </button>
            <button className='playlistbtn' onClick={() => deletePlaylist(list._id)} style={{ marginLeft: '10px', backgroundColor: 'red', color: 'white' }}>
              Delete Playlist
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Private;
