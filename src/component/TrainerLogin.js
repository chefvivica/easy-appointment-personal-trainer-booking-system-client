import React, { Component } from 'react'
export class TrainerLogin extends Component {


  state = {
    username: '',
    password: '',
    open: false,
    trainerName:'',
    trainerEmail:'',
    trainerImage:'',
    trainerPassword:'',
    confirmation:'',
    currentTrainer:{},
  }

  toggle = () => this.setState({open :!this.state.open})
  
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };
  handleLogin = e =>{
    e.preventDefault()
    // console.log(e)
  }

  setTrainer = (response) => {
    this.setState({ currentTrainer : response})
  }

  handleSubmit = e => {
    e.preventDefault()  
    fetch('http://localhost:3000/trainers', {
      method: "POST",
      headers: {'Content-Type': 'application/json', 
                Accept: 'application/json'
      },
      body: JSON.stringify({
        name: this.state.trainerName,
        email: this.state.trainerEmail,
        password: this.state.trainerPassword,
        image: this.state.trainerImage
      })
    })
    .then(resp => resp.json())
    .then(response => {
      if(response.errors){
        alert(response.errors)
      }else{
        this.setTrainer(response)
        this.props.history.push('/trainerProfile')
      }
    })
  }


  render() {
    console.log(this.props)
    
    return (
      <div className="home">
        {!this.state.open? 
        <form onSubmit={this.handleLogin}>
          <h1>Trainer Login</h1>
          <div>
            <label htmlFor="name">Name </label>     
            <input type="text" name="name" placeholder="name"  value={this.state.name}  onChange={this.handleChange}/>
          </div>


          <div>
            <label htmlFor="password">Password: </label>
            <input type="password"  name="password"  placeholder="Password" value={this.state.password} onChange={this.handleChange}/>
          </div>
          <input className="auth" type="submit" value="Login" />
          <button onClick={this.toggle}>Become a new trainer</button>
        </form>
          :
          <div>
          <form onSubmit={this.handleSubmit}>
          <h1>Trainer Sign up</h1>

          <div>
            <div><label htmlFor="name">Name: </label></div>
            <input 
              type="text" 
              name="trainerName" 
              value={this.state.trainerName} 
              placeholder="your name"
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <div><label htmlFor="email">Email: </label></div>
            <input 
              type="text" 
              name="trainerEmail" 
              value={this.state.trainerEmail} 
              placeholder="Enter email address"
              onChange={this.handleChange} 
            />
          </div>
          <div>
            <div><label htmlFor="password">Password: </label></div>
            <input 
              type="password" 
              name="trainerPassword"
              value={this.state.trainerPassword} 
              placeholder="Create password"
              onChange={this.handleChange}
            />
          </div>
          <div>
            <div><label htmlFor="password">Confirm Password: </label></div>
            <input 
              type="password" 
              name="confirmation" 
              value={this.state.confirmation}
              placeholder="Confirm your password" 
              onChange={this.handleChange}
            />
          </div>
 
          <div>
            <div><label htmlFor="image">Profile Photo url: </label></div>
            <input 
              type="text" 
              name="trainerImage" 
              value={this.state.trainerImage}
              placeholder="Your image url " 
              onChange={this.handleChange}
            />
          </div>
 
          <input  type="submit" value="Submit" />
        </form>
          <button onClick={this.toggle}>Login</button>
          </div>
        }
      </div>
    )
  }
}

export default TrainerLogin
