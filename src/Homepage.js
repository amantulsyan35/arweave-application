import React from 'react';

import { Link } from 'react-router-dom';

import './Homepage.css';

const Homepage = () => {
  return (
    <div className='Home'>
      <h1>Anonymous Confessions</h1>
      <div className='Home-image'>
        <img
          src='https://img2.pngio.com/gossip-secret-telling-a-secret-whisper-icon-telling-png-512_512.png'
          alt='home'
        />
      </div>
      <div className='Home-buttons'>
        <Link to='/create'>Create Confessions</Link>
        <Link to='/view'>View Confessions</Link>
      </div>
    </div>
  );
};

export default Homepage;
