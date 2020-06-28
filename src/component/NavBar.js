import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
// import {NavDropdown, Navbar, Nav} from 'react-bootstrap';
// import '../css/navBar.css'


export class NavBar extends Component {
  
  render() {

  const link = {
    position: "center",
    width: '200px',
    padding: '10px',
    margin: '80px',
  }

  return(
    <div className="nav-bar">
    <br></br>
    <NavLink to="/" exact style={link} >Home</NavLink>
    <NavLink to="/" exact style={link} >Logout</NavLink>
    <NavLink to="/calendar" exact style={link} >calendar</NavLink>
    <NavLink to="/trainer" exact style={link} >Trainer</NavLink>
    </div>

    )
  }
}

export default NavBar
