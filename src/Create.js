import React, { useState } from 'react';
import Arweave from 'arweave';
import './Create.css';
import { useHistory } from 'react-router-dom';

const arweave = Arweave.init({
  host: 'arweave.net',
  port: 443,
  protocol: 'https',
  timeout: 20000,
  logging: false,
});

const Create = (props) => {
  const [confessions, setConfessions] = useState([]);
  const [text, setText] = useState('');
  const [bio, setBio] = useState('');
  const [conf, setConf] = useState('');
  let history = useHistory();
  const { REACT_APP_KEY } = process.env;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name: text, bio: bio, confession: conf };

    props.getData(newUser);
    setConfessions([...confessions, newUser]);

    // First we create the transaction
    const transaction = arweave.createTransaction(
      {
        data: JSON.stringify(newUser),
      },
      REACT_APP_KEY
    );
    // Now we sign the transaction
    await arweave.transactions.sign(transaction, REACT_APP_KEY);
    // After is signed, we send the transaction
    await arweave.transaction.post(transaction);

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
