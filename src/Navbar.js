import React from 'react';

import { NavLink } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <div className='Navbar'>
      <NavLink exact activeClassName='active-link' to='/'>
        Home
      </NavLink>
      <NavLink exact activeClassName='active-link' to='/create'>
        Create
      </NavLink>
      <NavLink exact activeClassName='active-link' to='/view'>
        View
      </NavLink>
    </div>
  );
};

export default Navbar;
