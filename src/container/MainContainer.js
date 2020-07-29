import React, { Component } from 'react'
import Home from '../container/Home'
import MainCalendar from './MainCalendar'
import TrainerCalendar from './TrainerCalendar'
import TrainerContainer from './TrainerContainer'
import {Route, Switch} from 'react-router-dom' 
import Profile from '../container/Profile'
import '../css/courseCalendar.css'


const apptUrl = "http://localhost:3000/appointments"
const userUrl = 'http://localhost:3000/users'
const eventUrl = 'http://localhost:3000/events'
const autoLogin = 'http://localhost:3000/auto_login'
class MainContainer extends Component {

  state = {
    users: [],
    events:[],
    currentUser:{},
    userEvents:[],
    appointments:[],
    requests:[],
    students: []
  }
  
  componentDidMount(){
    fetch(eventUrl)
    .then(res => res.json())
    .then(events => this.setState({ events}))
    
    fetch(userUrl)
    .then(res => res.json())
    .then(users => this.setState({ users }))

    fetch(apptUrl)
    .then(res => res.json())
    .then(appointments => this.setState({ appointments }))  

    const token = localStorage.token
    if(token){
      fetch(autoLogin,{
        headers:{
          'Authorization':token
        }
      })
      .then(res => res.json())
      .then(response => {
        if(response.errors){
          alert(response.errors)
        }else{
          this.setState({ currentUser: response, requests : response.requests, userEvents: response.events})
        }
      })
    }
  }
  
  setUser = response => {
    this.setState({currentUser : response.user, requests : response.user.requests, userEvents: response.user.events})
    localStorage.token = response.token
  }

  logout = history => {
    this.setState({ currentUser : ''})
    localStorage.removeItem('token')
    history.push('/')
  }

  addAppointment = newAppt => this.setState({ appointments: [...this.state.appointments, newAppt] })
  
  removeAppointment = appt => this.setState({ appointments: this.state.appointments.filter(appointment => appointment !== appt)})

  updateUserEvents = eventId => {
    let newEvent = this.state.events.find(event=> event.id === eventId)
    this.setState({userEvents: [...this.state.userEvents, newEvent] })
  }

  removeUserEvent = removeEvent => {
    let updatedUserEvents = this.state.userEvents.filter(event=> event.start !== removeEvent.start)
    this.setState({userEvents : updatedUserEvents})
  }
  

  addRequest = newRequest => this.setState({ requests: [...this.state.requests, newRequest]})
  
  updateUser = user => this.setState({currentUser : user})


  render() {
    const {events, currentUser, appointments, userEvents, requests} = this.state
    
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
            addRequest={this.addRequest}
            logout={this.logout}
            updateUser={this.updateUser}
            events={events}
            requests={requests}
            userEvents={userEvents}
            appointments={appointments}
            currentUser={currentUser}/>          
          }/>

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

          <Route exact path='/' render={routerProps => <Home setUser={this.setUser} {...routerProps} logout={this.logout}/>}/>
          
        </Switch>
        
      </div>   
    )
  }
}

export default MainContainer



