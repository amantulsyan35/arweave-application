import React, { useState } from 'react';
import './View.css';
import Identicon from 'react-identicons';
import QRCode from 'react-qr-code';
const generate = require('project-name-generator');

const Confession = ({ className, bio, conf }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <div className='User-card'>
      {clicked === false && (
        <div>
          <div className='User-avatar'>
            <Identicon string='randomness' size='30' />
          </div>

          <div className='User-details'>
            <span>{generate().dashed}</span>
            <span>{bio}</span>
          </div>
        </div>
      )}
      {clicked === true && (
        <div className='User-qr-code'>
          <div className='User-qr-image'>
            <QRCode value={conf} size='128' />
          </div>
          <span>Scan to see the confession</span>
        </div>
      )}
      <div className='User-conf'>
        <button onClick={handleClick}>
          {clicked === false ? 'See Confession' : 'Revert'}
        </button>
      </div>
    </div>
  );
};

export default Confession;
