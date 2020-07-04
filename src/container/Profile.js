import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/profile.css"

const API = 'http://localhost:3000/users'
const url = "http://localhost:3000/appointments"

export class Profile extends Component {

  state = {
    on: false,
    removeEvent:{},
  }

  closeForm = () => this.setState({ on: false }) 


  handleRemove = (e) => {
    let start = e.event._instance.range.start.toISOString().slice(0,-5)
    let target = this.props.events.find(event=> event.start === start)
    this.setState({on:true,removeEvent: target})    
  }  

  handler = (e) => {
    e.persist()
    if(e.target.innerText==='Confirm'){
      let eventId = this.state.removeEvent.id
      let appt = this.props.appointments.find(appointment => appointment.event_id === eventId && appointment.user_id === this.props.currentUser.id)
      let id = appt.id
      fetch(`${url}/${id}`,{
        method: "DELETE"
      })
      .then(res=> res.json())
      .then(data=> {
        this.props.removeAppointment(data)
        this.props.removeUserEvent(this.state.removeEvent)
      })
    }
  }

  
  render() {
    const {username, image} = this.props.currentUser
    console.log(this.props.userEvents)

    if(username === undefined){
      return "loading"
    }else{
      return (
        <div className="profile-container">
          <div className="profile-info">
            <h1>Welcome back {username}</h1>
            <img src={image} alt='user img'/>           
          </div> 

          <div className="profile-calendar">
          <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              aspectRatio= {1}
              height={500}
              events={this.props.userEvents}
              eventColor={'#3671b0'} 
              eventClick={this.handleRemove}
              />  
          </div> 
          
          {this.state.on?
            <div>
              <h3>Are you sure to cancel this event?</h3>
              <button onClick={this.handler}>Close</button><button onClick={this.handler}>Confirm</button>
            </div>               
          :null
          }  
        </div>
      )	    
    }   
  }	
}	

export default Profile
