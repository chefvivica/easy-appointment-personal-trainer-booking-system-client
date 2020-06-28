import React from 'react'
import "../coachCalendar.css"
import EventForm from './EventForm'
import { useHistory } from "react-router-dom";
import FullCalendar, { formatDate } from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import JoinCourse from './JoinCourse';



export default class DayView extends React.Component {

  state = {
    joinCourse: { }
  }

  
changeView = (view) => {
  this.setState({ view })
}

  joinEvent = (e) => {
    console.log(e)
    const eventInfo = e.event._def
    const eventDetails = eventInfo.extendedProps
    const range = e.event._instance.range

    let details = eventDetails.details
    let title = eventInfo.title
    let trainer = eventDetails.trainer.name
    let trainerImage = eventDetails.trainer.image
    let joinedUser = eventDetails.users.map(user=> user.username)
    let start = range.start.toString()
    let end = range.end.toString()
    let id = eventInfo.publicId

    
    let newJoinCousrse = {title, details, trainer, trainerImage, joinedUser, start, end, id}
    this.setState({joinCourse: newJoinCousrse})
    // this.props.history.push("/join_course")
  }

  render() {

    return (
      <div className={'coach-calendar-container'}>
        <div className = {'header-img-container'}>
          <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQcM0EAF9k6hgKK5kam6LhzfEYOK7KglBmyag&usqp=CAU'/>
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
            height={850}
            aspectRatio= {1}
          
            events={this.props.events}
            eventColor={'#3691b0'} 
            // dateClick={this.handleDateSelect}
            // eventContent={renderEventContent}
            eventClick={this.joinEvent}
            // eventClick={this.handleEventClick}
            // eventsSet={this.props.handleEvents}
            
            // plugins ={[ timeGridPlugin ]}
            // initialView= 'timeGridWeek'
            />        
        </div>
        
        <div>
          <JoinCourse joinCourse={this.state.joinCourse} joinEvent={this.joinEvent} currentUser={this.props.currentUser} />
        </div>

      </div>
    )
  }
}


















