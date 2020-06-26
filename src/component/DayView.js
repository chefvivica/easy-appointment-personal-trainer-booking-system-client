import React from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import "/Users/congma/Development/code/Final/easy-appointment-personal-trainer-booking-system-client/src/coachCalendar.css"
import EventForm from './EventForm'
// import 'bootstrap/dist/css/bootstrap.css';
// import '@fortawesome/fontawesome-free/css/all.css'

export default class DayView extends React.Component {

  handleDateSelect = (e) => {
    let title = prompt('Please enter a new title for your event')
    // return (
    //   <div>
    //     <EventForm/>
    //   </div>
    //   )
    }
  
  render() {
    console.log(this.props)
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
            height={650}
            aspectRatio= {1}
          
            events={this.props.events}
            eventColor={'#3691b0'} 
            dateClick={this.handleDateSelect}
            // eventContent={renderEventContent}
            // eventClick={this.props.handleEventClick}
            // eventsSet={this.props.handleEvents}



            // plugins ={[ timeGridPlugin ]}
            // initialView= 'timeGridWeek'
            />
          
        </div>
      </div>
    )
  }
}
  









