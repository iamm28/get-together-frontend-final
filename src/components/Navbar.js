import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div id="navbar">
      <NavLink to="/signup" exact className="nav-link right"
      activeStyle={{
        fontWeight: 'bold',
        color: 'black'
      }}
      >Sign Up</NavLink>
    <NavLink to="/login" exact className="nav-link right"
      activeStyle={{
        fontWeight: 'bold',
        color: 'black'
      }}
      >Login</NavLink>
    <NavLink to="/home" exact className="nav-link"
      activeStyle={{
        fontWeight: 'bold',
        color: 'black'
      }}
      >Home</NavLink>
    <NavLink to="/profile" exact className="nav-link"
      activeStyle={{
        fontWeight: 'bold',
        color: 'black'
      }}
      >Profile</NavLink>
    <NavLink to="/find-events" exact className="nav-link"
      activeStyle={{
        fontWeight: 'bold',
        color: 'black'
      }}
      >Find Events</NavLink>
    </div>
  )
}

export default Navbar

// <NavLink to="/" exact className="nav-link"
// activeStyle={{
//   background: "#003926"
// }}
// >getTogether</NavLink>
