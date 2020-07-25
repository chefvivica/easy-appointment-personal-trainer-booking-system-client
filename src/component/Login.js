import React, { Component } from 'react'

class Login extends Component {

  state = {
    username: '',
    password: ''
  }

  handleChange = e => this.setState({ [e.target.name]: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    fetch("http://localhost:3000/login",{
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(this.state)
    })
    .then(res=> res.json())
    .then(response => {
      if(response.errors){
        alert(response.errors)
      }else{
        this.props.setUser(response)
        this.props.history.push('/trainer')
      }
    })
  }
  
  render() {
    const {username, password} =this.state

    return (
      <div>
      <form onSubmit={this.handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="username">Username: </label>
          <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={username} 
            onChange={this.handleChange}
          />
        </div>
        <br></br>
        <div>
          <label htmlFor="password">Password: </label>
          <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password} 
            onChange={this.handleChange}
          />
        </div>
        <br></br>
        <input className="auth" type="submit" value="Login" />
      </form>
      </div>
    );
  }
}

export default Login

