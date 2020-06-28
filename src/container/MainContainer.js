import React, { Component } from 'react'
import EventCalendar from '../component/EventCalendar'
import DayView from '../component/DayView'
import Login from '../component/Login'
import Signup from '../component/Signup'
import NavBar from '../component/NavBar'
import EventForm from '../component/EventForm'
import TrainerContainer from './TrainerContainer'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../component/event-utils.js'
import {BrowserRouter as Router, Route} from 'react-router-dom' 
import Profile from '../container/Profile'
import Auth from '../container/Auth'
import FullCalendar, { formatDate } from '@fullcalendar/react'

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

  findUser = (e, username) => {
    e.preventDefault()
    if(this.state.users.find(user=> user.username===username)){
      let user = this.state.users.find(user=> username ===username)
      let id = user.id
      this.setState({currentUser:id})
    }else{
      alert("Try again!")
    }
  }
  

  render() {
    // console.log(this.state.currentUser)
    return (
      <Router>
      <div className="App">
        <NavBar />
        <Route 
          exact path='/signup' 
          render={routerProps => 
            <Signup
              {...routerProps} 
            />
          }
        />
        <Route 
          exact path='/login' 
          render={routerProps => 
            <Login
              {...routerProps} 
              findUser={this.findUser}
            />
          }
        />
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
          exact path='/' 
          render={routerProps => 
            <DayView 
            events={this.state.events}
            currentUser={this.state.currentUser}
            {...routerProps}/>
          }
        />
      </div>
    </Router>
    
    )
  }
}

export default MainContainer
