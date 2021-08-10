import React, { useState, useEffect } from 'react';
import { getTransactionData, queryData } from './Arweave';
import { v4 as uuidv4 } from 'uuid';
import './View.css';
import Confession from './Confession';

require('dotenv').config({ path: '../' });

const View = () => {
  const [confessions, setConfessions] = useState([]);

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

  return (
    <div>
      <div className='View-container'>
        {confessions.map((c) => {
          return (
            <Confession
              name={c.name}
              bio={c.bio}
              conf={c.confession}
              key={uuidv4()}
            />
          );
        })}
      </div>
    </div>
  );
};

export default View;
