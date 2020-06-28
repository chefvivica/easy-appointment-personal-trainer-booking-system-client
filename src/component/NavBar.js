import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';

export class NavBar extends Component {
  
  render() {

  return(
    <div className="nav-bar">
    <br></br>
    <NavLink to="/" exact>Home</NavLink>
    <NavLink to="/" exact>Logout</NavLink>
    <NavLink to="/calendar" exact>calendar</NavLink>
    <NavLink to="/trainer" exact>Trainer</NavLink>
    </div>

    )
  }
}

export default NavBar
