import React, { Component } from 'react'
import FullCalendar, { formatDate } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const API = 'http://localhost:3000/users'


export class Profile extends Component {

  state = {
    user: {},
  }

  componentDidMount(){ 
    fetch(`${API}/${this.props.currentUser}`)
    .then(res => res.json())
    .then(user => this.setState({ user }))
    
  }

  handleMyEvent = (e) => {
    console.log(e)
    // alert("are you sure you want to cancel this course?")
    // if("ok"){
    //   e.event.remove()

      // fetch(`${API}/${this.props.currentUser}`{
      //   method: "detele",
      //   headers: { 
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body:JSON.stringify(newAppointment)
      // })
    // }
  }


  render() {
    const {username, image, events} = this.state.user
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
            eventClick={this.handleMyEvent} 
          
            />  
        </div>                  
        
      </div>
    )
  }
}


export default Profile
