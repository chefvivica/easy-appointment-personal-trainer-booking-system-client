import React, { Component } from 'react'
import Home from '../component/Home'
import MainCalendar from './MainCalendar'
import TrainerCalendar from './TrainerCalendar'
import TrainerContainer from './TrainerContainer'
import {Route, Switch} from 'react-router-dom' 
import Profile from '../container/Profile'
import '../css/courseCalendar.css'

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
    if(this.state.users.find(user=> user.username === username)){
      let user = this.state.users.find(user=> user.username === username)
      this.setState({currentUser: user, userEvents:user.events})
      match.history.push("/trainer")
    }else{
      alert("Something went wrong, please try again, or sign up.")
    }
  }

  addUser = user => this.setState({users: [...this.state.users,user]})

  addAppointment = newAppt => this.setState({ appointments: [...this.state.appointments, newAppt] })
  
  removeAppointment = appt => this.setState({ appointments: this.state.appointments.filter(appointment=>appointment !== appt)})

  updateUserEvents = eventId => {
    let newEvent = this.state.events.find(event=> event.id === eventId)
    this.setState({userEvents: [...this.state.userEvents, newEvent] , students: newEvent.users})
  }

  removeUserEvent = removeEvent => {
    let updatedUserEvents = this.state.userEvents.filter(event=> event.start !==removeEvent.start)
    this.setState({userEvents : updatedUserEvents})
  }
  
  addStudent = student => this.setState({ students : [...this.state.students, student] })


  render() {
    const {events, currentUser, appointments, userEvents} = this.state

    return (
      <div className= "main-container">
        <div className="banner"> 
          <h1>Easy Appointment</h1>
        </div>
        <Switch>

          <Route path='/trainer/:id' render={routerProps => 
          <TrainerCalendar  {...routerProps} events={events} />}/>
          <Route path='/trainer' render={routerProps => <TrainerContainer  {...routerProps}/>}/>
          <Route path='/users/:id' render={routerProps => 
            <Profile  
            {...routerProps} 
            removeAppointment={this.removeAppointment}
            removeUserEvent={this.removeUserEvent}
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
            addStudent={this.addStudent}
            {...routerProps}/>}
          />
          <Route exact path='/' render={routerProps => <Home addUser={this.addUser} findUser={this.findUser} {...routerProps}/>}/>
        </Switch>
        
      </div>   
    )
  }
}

export default MainContainer


