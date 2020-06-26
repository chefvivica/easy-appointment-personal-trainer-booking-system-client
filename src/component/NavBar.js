import React, { Component } from 'react'
import { Link, NavLink } from 'react-router-dom';
import {NavDropdown, Navbar, Nav} from 'react-bootstrap';


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
    <div className="main-menu">
    <NavLink to="/" exact style={link} activeStyle={{background: "blue"}}>Home</NavLink>
    <NavLink to="/Signup" exact style={link} activeStyle={{background: "blue"}}>Sign Up</NavLink>
    <NavLink to="/Login" exact style={link} activeStyle={{background: "green"}}>Log In</NavLink>
    <NavLink to="/trainer" exact style={link} activeStyle={{background: "green"}}>Trainer</NavLink>
    </div>

    )
  }
}

export default NavBar
