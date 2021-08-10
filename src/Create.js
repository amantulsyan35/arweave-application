import React, { useState } from 'react';
import './Create.css';
import { createDataTransaction, signAndSubmitTransaction } from './Arweave';
import { useHistory } from 'react-router-dom';

require('dotenv').config({ path: '../' });

const Create = (props) => {
  const [confessions, setConfessions] = useState([]);
  const [text, setText] = useState('');
  const [bio, setBio] = useState('');
  const [conf, setConf] = useState('');
  let history = useHistory();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newUser = { name: text, bio: bio, confession: conf, clicked: false };
    // console.log(newUser);

    props.getData(newUser);
    setConfessions([...confessions, newUser]);

    // First we create the transaction
    let transaction = await createDataTransaction(
      newUser,
      JSON.parse(process.env.REACT_APP_MY_API_KEY)
    );

    // Now we sign and submit the transaction
    await signAndSubmitTransaction(
      transaction,
      JSON.parse(process.env.REACT_APP_MY_API_KEY)
    );

    history.push('/');
  };

  return (
    <div className='Create'>
      <div className='Create-1'>
        <form onSubmit={handleSubmit}>
          <div className='Form-group'>
            <label>Enter Name</label>
            <input
              type='text'
              id='name'
              name='text'
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className='Form-group'>
            <label>Enter Bio</label>
            <textarea
              id='bio'
              name='bio'
              onChange={(e) => setBio(e.target.value)}
            ></textarea>
          </div>
          <div className='Form-group'>
            <label>Enter Confession</label>
            <textarea
              id='confession'
              name='conf'
              onChange={(e) => setConf(e.target.value)}
            ></textarea>
          </div>
          <button id='submit' type='submit'>
            Submit
          </button>
        </form>
      </div>
      <div className='Create-2'>
        <img
          src='https://cdn.dribbble.com/users/1873950/screenshots/7644328/media/04aeb6a5e26c75043d01bdd825cd10a7.jpg?compress=1&resize=400x300'
          alt='form'
        />
      </div>
    </div>
  );
};

export default Create;
