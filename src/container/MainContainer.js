import React, { Component } from 'react'
import Home from '../component/Home'
import MainCalendar from './MainCalendar'
import TrainerContainer from './TrainerContainer'
import {Route, Switch} from 'react-router-dom' 
import Profile from '../container/Profile'
import '../css/courseCalendar.css'
import Test from '../container/Test'

const url = "http://localhost:3000/appointments"
class MainContainer extends Component {

  state = {
    users: [ ],
    events:[ ],
    currentUser:{},
    userEvents:[],
    appointments:[],
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => this.setState({ events }))
    
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.setState({ users }))

    fetch(url)
    .then(res => res.json())
    .then(appointments => this.setState({ appointments }))  
  }
  
  findUser = (e, username,match) => {
    e.preventDefault()
    if(this.state.users.find(user=> user.username===username)){
      let user = this.state.users.find(user=> user.username ===username)
      this.setState({currentUser: user, userEvents:user.events})
      match.history.push("/calendar")
    }else{
      alert("Something went wrong, please try again, or sign up.")
    }
  }


  addAppointment = newAppt => this.setState({ appointments: [...this.state.appointments, newAppt] })
  
  removeAppointment = appt => this.setState({ appointments: this.state.appointments.filter(appointment=>appointment !== appt)})

  updateUserEvents = eventId => {
    console.log(eventId)
    let newEvent = this.state.events.find(event=> event.id === eventId)
    this.setState({userEvents: [...this.state.userEvents, newEvent]})
  }

  removeUserEvent = removeEvent => {
    let updatedUserEvents = this.state.userEvents.filter(event=> event.start !==removeEvent.start)
    this.setState({userEvents : updatedUserEvents})
  }

  // addRequest = requestEvent => this.setState({userEvents : [...this.state.userEvents, requestEvent] })
  
  
  render() {
    const {events, currentUser, appointments, userEvents} = this.state
    console.log(this.state.userEvents)
    return (
      
      <div className= "main-container">
        <div className="banner"> 
          <h1>EAPT</h1>
        </div>
        <Switch>
          <Route path='/trainer' render={routerProps => <TrainerContainer  {...routerProps}/>}/>
          <Route path='/users/:id' render={routerProps => 
          // <Test/>
            <Profile  
            {...routerProps} 
            removeAppointment={this.removeAppointment}
            removeUserEvent={this.removeUserEvent}
            // addRequest={this.addRequest}
            events={events}
            userEvents={userEvents}
            appointments={appointments}
            currentUser={currentUser}/>     
          }
          />

          

          <Route path='/calendar' render={routerProps => 
            <MainCalendar
            events={events}
            updateUserEvents={this.updateUserEvents}  
            currentUser={currentUser}
            addAppointment={this.addAppointment}
            removeAppointment={this.removeAppointment}
            appointments={appointments}
            {...routerProps}/>}
          />
          <Route exact path='/' render={routerProps => <Home addUser={this.addUser} findUser={this.findUser} {...routerProps}/>}/>
        </Switch>
      </div>   
    )
  }
}

export default MainContainer


