import React, { useState } from 'react';
import './Create.css';

import { createDataTransaction, signAndSubmitTransaction } from './Arweave';
import { useHistory } from 'react-router-dom';

const Create = (props) => {
  const [confessions, setConfessions] = useState([]);
  const [text, setText] = useState('');
  const [bio, setBio] = useState('');
  const [conf, setConf] = useState('');
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name: text, bio: bio, confession: conf };

    props.getData(newUser);
    setConfessions([...confessions, newUser]);

    // First we create the transaction
    let transaction = await createDataTransaction(
      newUser,
      JSON.parse(WalletAddress)
    );

    // Now we sign and submit the transaction
    await signAndSubmitTransaction(transaction, JSON.parse(WalletAddress));

    history.push('/');
  };

  return (
    <div className='Create'>
      <form onSubmit={handleSubmit}>
        <label>Enter Name</label>
        <br />
        <input
          type='text'
          id='name'
          name='text'
          onChange={(e) => setText(e.target.value)}
        />
        <br />
        <label>Enter Bio</label>
        <br />
        <textarea
          id='bio'
          name='bio'
          onChange={(e) => setBio(e.target.value)}
        ></textarea>
        <label>Enter Confession</label>
        <br />
        <textarea
          id='confession'
          name='conf'
          onChange={(e) => setConf(e.target.value)}
        ></textarea>
        <input id='submit' type='submit' />
      </form>
    </div>
  );
};

export default Create;
