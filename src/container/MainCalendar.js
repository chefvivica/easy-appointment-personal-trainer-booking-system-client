import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import JoinCourse from '../component/JoinCourse';



export default class MainCarlendar extends React.Component {

  state = {
    joinCourse: {},
    joinedUsers: [],
    on:false
  }

  joinEvent = (e) => {
    this.setState({on: true})
    const eventInfo = e.event._def
    const eventDetails = eventInfo.extendedProps
    const range = e.event._instance.range

    let details = eventDetails.details
    let title = eventInfo.title
    let trainer = eventDetails.trainer.name
    let trainerImage = eventDetails.trainer.image
    let joinedUser = eventDetails.users.map(user=> user.username)
    let a = range.start.toISOString()
    let start = a.split('').slice(0,a.length-5).join('')
    let b = range.end.toISOString()
    let end = b.split('').slice(0,b.length-5).join('')    
    let id = eventInfo.publicId

    let newJoinCousrse = {title, details, trainer, trainerImage, joinedUser, start, end, id}
    this.setState({joinCourse: newJoinCousrse, joinedUsers: joinedUser})
  }

  addJoinCourse = username => this.setState({ joinedUsers : [...this.state.joinedUsers, username] })
  

  removeJoinCourse = username => this.setState({ joinedUsers: this.state.joinedUsers.filter(user => user !== username) })
    
  

  render() {
    const {currentUser, username, events,appointments,addAppointment, removeAppointment} = this.props
    const {joinCourse, joinedUsers,on} = this.state
    console.log(this.state.joinedUsers)

    return (
      <div className={'coach-calendar-container'}>
        <div className = {'header-img-container'}>
          <h1>Calendar</h1>
        </div>
        <div className = {'coach-calendar'}>
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
            height={850}
          
            events={events}
            eventColor={'#3691b0'} 
            eventClick={this.joinEvent}           
            />        
        </div>

        {on?
        <div className="join-course">
          <JoinCourse 
          joinCourse={joinCourse}
          currentUser={currentUser}
          joinedUsers={joinedUsers}
          joinEvent={this.joinEvent}
          addJoinCourse={this.addJoinCourse}
          removeJoinCourse={this.removeJoinCourse}
          appointments={appointments}
          addAppointment={addAppointment}
          removeAppointment={removeAppointment}
          username={username}/>
        </div>
          :null
        }         
      </div>
    )
  }
}

















