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
    trainers:[ ],
    userJoinedEvents:[ ],
    currentUser:''
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => this.setState({ events }))
    
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
    
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.setState({ users }))
    
  }
  
  findUser = (e, username,match) => {
    e.preventDefault()
    if(this.state.users.find(user=> user.username===username)){
      let user = this.state.users.find(user=> username ===username)
      let id = user.id
      this.setState({currentUser:id})
      match.history.push("/calendar")
    }else{
      alert("Something went wrong, please try again, or sign up.")
    }
  }
  
  
  render() {

    // console.log(this.state.currentUser)
    return (
      <Router>
      <div>
        <NavBar />
        <Route 
          exact path='/trainer' 
          render={routerProps => 
            <TrainerContainer trainers={this.state.trainers}  {...routerProps}/>
          }
        />
        <Route 
          exact path='/profile' 
          render={routerProps => 
            <Profile  {...routerProps} addUserEvents={this.addUserEvents}/>
          }
        />
        <Route 
          exact path='/calendar' 
          render={routerProps => 
            <DayView 
            events={this.state.events}
            currentUser={this.state.currentUser}
            {...routerProps}/>
          }
        />
        <Route 
          exact path='/course' 
          render={routerProps => 
            <DayView 
            events={this.state.events}
            currentUser={this.state.currentUser}
            {...routerProps}/>
          }
        />
        <Route 
          exact path='/joined_course' 
          render={routerProps => 
            <JoinCourse 
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
    </Router>
    
    )
  }
}

export default MainContainer
