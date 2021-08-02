import React from 'react';

import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <NavLink exact activeClassName='active-link' to='/'>
        Homepage
      </NavLink>
      <NavLink exact activeClassName='active-link' to='/create'>
        Create
      </NavLink>
      <NavLink exact activeClassName='active-link' to='/view'>
        View Confessions
      </NavLink>
      <NavLink exact activeClassName='active-link' to='/about'>
        About
      </NavLink>
    </div>
  );
};

export default Navbar;
