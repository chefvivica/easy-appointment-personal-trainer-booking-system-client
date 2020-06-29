import React, { Component } from 'react'
import NavBar from '../component/NavBar'
import Home from '../component/Home'
import JoinCourse from '../component/JoinCourse'
import DayView from '../component/DayView'
import TrainerContainer from './TrainerContainer'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import Profile from '../container/Profile'

class MainContainer extends Component {

  state = {
    users: [ ],
    events:[ ],
    currentUser:'',
    // username:'',
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => this.setState({ events }))
    
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.setState({ users }))
    
  }
  
  findUser = (e, username,match) => {
    e.preventDefault()
    if(this.state.users.find(user=> user.username===username)){
      let user = this.state.users.find(user=> user.username ===username)
      let id = user.id
      this.setState({currentUser:id, username:username})
      match.history.push("/calendar")
    }else{
      alert("Something went wrong, please try again, or sign up.")
    }
  }
  
  render() {

    console.log(this.state.events)
    return (
      
      <div>
        <Route 
          exact path='/trainer' 
          render={routerProps => 
            <TrainerContainer  {...routerProps}/>
          }
        />

        <Route 
          exact path='/users/:id' 
          render={routerProps => 
            <Profile  {...routerProps} addUserEvents={this.addUserEvents} currentUser={this.state.currentUser}/>
          }
        />
        <Route 
          exact path='/calendar' 
          render={routerProps => 
            <DayView 
            events={this.state.events}
            currentUser={this.state.currentUser}
            username={this.state.username}
            {...routerProps}/>
          }
        />
        <Route 
          exact path='/' 
          render={routerProps => 
            <Home
            addUser={this.addUser}
            findUser={this.findUser}
            {...routerProps}/>
          }
        />
      </div>
    
    )
  }
}

export default MainContainer
