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
    user: {},
    events: [],
    on: false
  }

  componentDidMount(){ 
    fetch(`${API}/${this.props.currentUser.id}`)
    .then(res => res.json())
    .then(user => this.setState({ user: user, events: user.events }))
  }

  closeForm = () => this.setState({ on: false }) 
  removeMyEvent = (event) =>{
    // event.remove()
 
  //   let target = this.props.events.find(event => event.trainer_id === trainerId && event.start === eventStart)
  //   let eventId = target.id
  //   let appt = this.props.appointments.find(appointment => appointment.event_id === eventId )
  //   let id = appt.id
  //   console.log(id)
  //   fetch(`${url}/${id}`,{
  //     method: "DELETE"
  //   })
  //   .then(res=> res.json())
  //   .then(data=> {
  //     this.props.removeAppointment(data)
  //     this.setState({events: this.state.events.filter(event=> event.trainer_id === trainerId)})
  //   })
  }

  handleEventClick = (e) => {
    {
      
      e.event.remove()
    }
  }  

  render() {
    const {username, image, events} = this.state.user
    console.log(this.state.events)
    if(this.state.user.username === undefined){
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
              events={events}
              eventColor={'#3671b0'} 
              // eventClick={this.removeMyEvent} 
              eventClick={this.handleEventClick}
              />  
          </div>
            
          
          <div className='cancle-btn'>
            <button >Cancel this course</button>

            {/* <ul>
            {this.state.events.map((event,index)=> <li key={index}>{event.title} time start: <b>{event.start}</b> end at <b>{event.end}</b> <button onClick={()=>this.removeMyEvent(event.start, event.trainer_id)}>Cancel this event</button></li> )}
            </ul> */}
          </div>                  
      </div>	      
      )	    
    }
    
  }	

}	

export default Profile
