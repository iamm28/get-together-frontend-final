import React from 'react'
import { NavLink } from 'react-router-dom';

const Navbar = (props) => {
  return (
    <div id="navbar">
      <NavLink to="/signup" exact className="nav-link right"
      activeStyle={{
        color: '#ffffff'
      }}
      >Sign Up</NavLink>
    <NavLink to="/login" exact className="nav-link right"
      activeStyle={{
        color: '#ffffff'
      }}
      >Login</NavLink>
    <NavLink to="/profile" exact className="nav-link"
      activeStyle={{
        color: '#ffffff'
      }}
      >Profile</NavLink>
    <NavLink to="/your-events" exact className="nav-link"
      activeStyle={{
        color: '#ffffff'
      }}
      >Your Events</NavLink>
    <NavLink to="/find-events" exact className="nav-link"
      activeStyle={{
        color: '#ffffff'
      }}
      >Find Events</NavLink>
    <NavLink to="/calendar" exact className="nav-link"
      activeStyle={{
        color: '#ffffff'
      }}
      >Calendar</NavLink>
    </div>
  )
}

export default Navbar

// <NavLink to="/find-events" exact className="nav-link">
//   <img src={require("../imgs/gettogethersc.png")} className="navbar-logo"/>
// </NavLink>
