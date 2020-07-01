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
    trainer:{},
    on:false
  }

  joinEvent = (e) => {
    this.setState({on: true})
    const eventInfo = e.event._def.publicId
    let id = parseInt(eventInfo)
    let targetEvent = this.props.events.find(event=> event.id === id)
    let users = targetEvent.users.map( user=> user.username)
    this.setState({joinCourse: targetEvent, trainer:targetEvent.trainer, joinedUsers:users})
  }

  addJoinCourse = user => this.setState({ joinedUsers : [...this.state.joinedUsers, user] })
  

  removeJoinCourse = username => this.setState({ joinedUsers: this.state.joinedUsers.filter(user => user !== username) })
    
  

  render() {
    const {currentUser, events,appointments,addAppointment, removeAppointment} = this.props
    const {joinCourse, joinedUsers,trainer,on } = this.state
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
          trainer={trainer}
          
          />
        </div>
          :null
        }         
      </div>
    )
  }
}


















