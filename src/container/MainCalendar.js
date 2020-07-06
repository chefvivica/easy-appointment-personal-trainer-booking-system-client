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
    on:false,
    date:'',
    range:''
  }

  joinEvent = (e) => {
    this.setState({on: true})
    const eventInfo = e.event._def.publicId
    let targetDate = e.event._instance.range.start.toISOString().slice(0,10)
    let  timeRange = "from " + e.event._instance.range.start.toISOString().slice(11,19) + " to " + e.event._instance.range.end.toISOString().slice(11,19)
    let id = parseInt(eventInfo)
    let targetEvent = this.props.events.find(event=> event.id === id)
    let info = targetEvent.users
    this.setState({joinCourse: targetEvent, trainer:targetEvent.trainer, joinedUsers:info , date: targetDate, range:timeRange})
  }

  addJoinCourse = user => this.setState({ joinedUsers : [...this.state.joinedUsers, user] })
  

  removeJoinCourse = username => this.setState({ joinedUsers: this.state.joinedUsers.filter(user => user !== username) })
    
  closeForm = () => this.setState({ on: false })

  render() {
    const {currentUser, events,appointments,addAppointment, removeAppointment,updateUserEvents} = this.props
    const {joinCourse, joinedUsers,trainer,on, date, range} = this.state
    
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
            // selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            aspectRatio= {1}
            height={780}
            events={events}
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
          joinEvent={this.joinEvent}
          addJoinCourse={this.addJoinCourse}
          removeJoinCourse={this.removeJoinCourse}
          closeForm={this.closeForm}
          appointments={appointments}
          addAppointment={addAppointment}
          removeAppointment={removeAppointment}
          trainer={trainer}  
          updateUserEvents={updateUserEvents}
          date={date}
          range={range}
          />
        </div>
          :null
        }         
      </div>
    )
  }
}


















