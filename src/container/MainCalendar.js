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
    joinStudents:[],
    trainer:{},
    on:false,
    color:'#8FBC8F'
  }

  joinEvent = (e) => {
    this.setState({on: true})
    const eventInfo = e.event._def.publicId
    let id = parseInt(eventInfo)
    let targetEvent = this.props.events.find(event=> event.id === id)
    let users = targetEvent.users.map( user=> user.username)
    let info = targetEvent.users
    this.setState({joinCourse: targetEvent, trainer:targetEvent.trainer, joinedUsers:users, joinStudents: info})
  }

  addJoinCourse = user => this.setState({ joinedUsers : [...this.state.joinedUsers, user] })
  

  removeJoinCourse = username => this.setState({ joinedUsers: this.state.joinedUsers.filter(user => user !== username) })
    
  closeForm = () => this.setState({ on: false })

  render() {
    const {currentUser, events,appointments,addAppointment, removeAppointment} = this.props
    const {joinCourse, joinedUsers,trainer,on,joinStudents} = this.state
    // console.log(this.state.joinStudents)
    
    return (
      <div>
        
        {!on?
        <div className='coach-calendar-container'>
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
            height={780}
          
            events={events}
            eventColor={this.state.color}
            eventBackgroundColor={'#B0E0E6'}
            eventClick={this.joinEvent}           
            />        
        </div>
        :null}

        {on?
        <div className ="join-course-container">
          <JoinCourse 
          joinCourse={joinCourse}
          currentUser={currentUser}
          joinedUsers={joinedUsers}
          joinStudents={joinStudents}
          joinEvent={this.joinEvent}
          addJoinCourse={this.addJoinCourse}
          removeJoinCourse={this.removeJoinCourse}
          closeForm={this.closeForm}
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


















