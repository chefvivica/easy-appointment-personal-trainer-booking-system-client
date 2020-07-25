import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'
import '../css/home.css'


export class Home extends Component {
  state ={
    on: true
  }

  toggle = () => this.setState({on: !this.state.on})


  render() { 
    return (
      <div className="home"> 
        <h1>
        <img alt=''src={require("../img/logo.JPG")}/>
        </h1>
        {this.state.on? <Login {...this.props} /> : <Signup {...this.props} /> }
        <button onClick={this.toggle}>{this.state.on? "Sign up instead": "Login in instead"}</button>
      </div>
    )
  }
}

export default Home