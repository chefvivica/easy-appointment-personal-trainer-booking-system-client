import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {NavDropdown, Navbar, Nav} from 'react-bootstrap';
import '../css/navBar.css'


export class NavBar extends Component {
  
  render() {

  const link = {
    position: "center",
    width: '200px',
    padding: '10px',
    margin: '80px',
    background: 'black',
    textDecoration: 'none',
    color: 'white',
  }

  return(
    <div className="nav-bar">
    <NavLink to="/" exact style={link} activeStyle={{background: "orange"}}>Home</NavLink>
    <NavLink to="/Signup" exact style={link} activeStyle={{background: "orange"}}>Sign Up</NavLink>
    <NavLink to="/Login" exact style={link} activeStyle={{background: "orange"}}>Log In</NavLink>
    <NavLink to="/trainer" exact style={link} activeStyle={{background: "orange"}}>Trainer</NavLink>
    </div>

    )
  }
}

export default NavBar
