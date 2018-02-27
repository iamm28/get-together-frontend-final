import React from 'react'
import { NavLink } from 'react-router-dom';

const link = {
  padding: '12px',
  margin: '0 6px 6px',
  background: 'blue',
  textDecoration: 'none',
  color: 'white',
}

const Navbar = (props) => {
  return (
    <div style={link}>
      <NavLink
      to="/"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >getTogether</NavLink>
      <NavLink
      to="/signup"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >Sign Up</NavLink>
      <NavLink
      to="/login"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >Login</NavLink>
      <NavLink
      to="/home"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >Home</NavLink>
      <NavLink
      to="/profile"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >Profile</NavLink>
      <NavLink
      to="/find-events"
      exact
      style={link}
      activeStyle={{
        background: 'darkblue'
      }}
      >Find Events</NavLink>
    </div>

  )
}

export default Navbar
