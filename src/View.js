import React, { useState, useEffect } from 'react';
import { getTransactionData, queryData } from './Arweave';
import { v4 as uuidv4 } from 'uuid';
import './View.css';
import Identicon from 'react-identicons';
import QRCode from 'react-qr-code';
require('dotenv').config({ path: '../' });
const generate = require('project-name-generator');

const View = () => {
  const [confessions, setConfessions] = useState([]);
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // console.log(process.env.REACT_APP_NODE_ENV);
        let response = await queryData(
          JSON.parse(process.env.REACT_APP_MY_API_KEY)
        );

        let arr = [];

        for (var i = 0; i < response.length; i++) {
          let data = await getTransactionData(response[i]);

          let parseData = JSON.parse(data);
          // console.log(parseData);

          arr.push(parseData);
        }
        setConfessions(arr);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);

  const handleClick = () => {
    let state = !clicked;
    setClicked(state);
  };

  return (
    <div>
      <div className='View-container'>
        {confessions.map((c) => {
          return (
            <div key={uuidv4()} className='User-card'>
              {clicked === false && (
                <div>
                  <div className='User-avatar'>
                    <Identicon string='randomness' size='30' />
                  </div>

                  <div className='User-details'>
                    <span>{generate().dashed}</span>
                    <span>{c.bio}</span>
                  </div>
                </div>
              )}
              {clicked === true && (
                <div className='User-qr-code'>
                  <div className='User-qr-image'>
                    <QRCode value={c.confession} size='128' />
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
        })}
      </div>
    </div>
  );
};

export default View;
