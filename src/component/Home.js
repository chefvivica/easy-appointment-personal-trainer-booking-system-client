import React, { Component } from 'react'
import Login from './Login'
import Signup from './Signup'


export class Home extends Component {
  state ={
    on: true
  }

  toggle = () => this.setState({on: !this.state.on})


  render() {
    const { addMember } = this.props
    return (
      <div className="welcome-page"> 
        <h1>
          Keyboard Jockey Hiking and Adventure Society
        </h1>
        {this.state.on? <Login match={this.props} findUser={this.props.findUser}/> : <Signup addMember={addMember} match={this.props} /> }
        <br></br><br></br><br></br>
        <button onClick={this.toggle}>{this.state.on? "Not a member yet? Join now!": "Already a member? Login now!"}</button>
      </div>
    )
  }
}

export default Home