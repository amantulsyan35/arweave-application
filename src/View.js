import React from 'react';

import './View.css';

const View = (props) => {
  return (
    <div>
      <h1>View Data</h1>
      {props.confessions.map((u) => {
        return (
          <div className='User-card'>
            <div className='User-avatar'>
              <img src={`https://robohash.org/${u.name}`} alt={u.name}></img>
            </div>
            <h3>{u.name}</h3>
            <h4>{u.bio}</h4>
            <div className='User-conf'>
              <p>{u.confession} </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default View;
