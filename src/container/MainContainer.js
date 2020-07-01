import React, { Component } from 'react'
import Home from '../component/Home'
import MainCalendar from './MainCalendar'
import TrainerContainer from './TrainerContainer'
import {Route, Switch} from 'react-router-dom' 
import Profile from '../container/Profile'

class MainContainer extends Component {

  state = {
    users: [ ],
    events:[ ],
    currentUser:'',
    appointments:[]
  }
  
  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => this.setState({ events }))
    
    fetch('http://localhost:3000/users')
    .then(res => res.json())
    .then(users => this.setState({ users }))

    fetch('http://localhost:3000/appointments')
    .then(res => res.json())
    .then(appointments => this.setState({ appointments }))
    
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

  addAppointment = newAppt => this.setState({ appointments: [...this.state.appointments, newAppt] })
  

  removeAppointment = appt => this.setState({ appointments: this.state.appointments.filter(appointment=>appointment !== appt) })

  render() {
    console.log(this.state.currentUser)
    const {events, currentUser, appointments, username,} = this.state

    return (
      
      <div>
        <Switch>
          <Route path='/trainer' render={routerProps => <TrainerContainer  {...routerProps}/>}/>
          <Route path='/users/:id' render={routerProps => 
            <Profile  
            {...routerProps} 
            addUserEvents={this.addUserEvents} 
            currentUser={currentUser}/>}
          />
          <Route path='/calendar' render={routerProps => 
            <MainCalendar
            events={events}
            currentUser={currentUser}
            username={username}
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
