import React, { Component } from 'react'

const headers = { 
  'Content-Type': 'application/json', 
  Accept: 'application/json'
}

const initState = {name: '', username: '', email: '', password: '', confirmation: '', phone_number: ''}
export class Signup extends Component {
  
  state = initState

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  // handleSubmit = (e) => {
  //   e.preventDefault()  
  //   if(this.state.password === this.state.confirmation){
  //     fetch('http://localhost:3000/members', {
  //       method: "POST",
  //       headers: headers,
  //       body: JSON.stringify({
  //         name: this.state.name,
  //         username: this.state.username,
  //         email: this.state.email,
  //         password: this.state.password
  //       })
  //     })
  //       .then(resp => resp.json())
  //       .then(data=> this.props.addMember(data))
  //   } else {
  //     alert("Passwords don't match")
  //   }
  //   this.setState(initState)
  //   this.props.match.history.push("/hikes")
  // }

  render() {

    const { username, email, phone_number,password, confirmation } = this.state
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <h1>Sign up</h1>
          <br></br>
          <div>
            <label htmlFor="username">Username: </label>
            <input 
              type="text" 
              name="username" 
              value={username} 
              placeholder="Create username"
              onChange={this.handleChange} 
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="email">Email: </label>
            <input 
              type="text" 
              name="email" 
              value={email} 
              placeholder="Enter email address"
              onChange={this.handleChange} 
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="phone_number">Your phone_number: </label>
            <input 
              type="text" 
              name="phone_number" 
              value={phone_number} 
              placeholder="Enter your phone_number" 
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="password">Password: </label>
            <input 
              type="password" 
              name="password"
              value={password} 
              placeholder="Create password"
              onChange={this.handleChange} 
            />
          </div>
          <br></br>
          <div>
            <label htmlFor="password">Confirm Password: </label>
            <input 
              type="password" 
              name="confirmation" 
              value={confirmation}
              placeholder="Confirm your password" 
              onChange={this.handleChange}
            />
          </div>
          <br></br>
          <input type="submit" value="Sign up" />
        </form>
      </div>
    )
  }
}

export default Signup
