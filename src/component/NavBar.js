import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import '../css/nav.css'

export class NavBar extends Component {
  
  render() {

  return(
    <div className="nav-bar">
    <NavLink to="/calendar" exact>Calendar</NavLink>
    <NavLink to="/trainer" exact>All Trainers</NavLink>
    <NavLink to="/users/:id" exact>Your Profile</NavLink>
    <NavLink to="/" exact>Login</NavLink>
    <NavLink to="/trainer/login/:id" exact id="trainer-login"><button>Trainer Login</button></NavLink>
    </div>

    )
  }
}

export default NavBar
