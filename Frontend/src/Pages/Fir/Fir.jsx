// src/App.js
import React, { useState } from 'react';
import axios from 'axios';

import baseUrl from '../../config';
function Fir() {
  const [file, setFile] = useState(null);
  const [trackingId, setTrackingId] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('http://localhost:5000/upload', formData);
      setTrackingId(response.data.trackingId);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>FIR Management System</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      {trackingId && <p>Tracking ID: {trackingId}</p>}
    </div>
  );
}

export default Fir;
