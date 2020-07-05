import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; 
import { Calendar } from '@fullcalendar/core';

const requestUrl = 'http://localhost:3000/requests'
const url = "http://localhost:3000/events"
export class Test extends Component {

  state = {
    eventSources: [
      {
        events: [ // put the array in the `events` property
          {
            title  : 'event1',
            start  : '2020-07-01'
          },
          {
            title  : 'event2',
            start  : '2020-07-05',
            end    : '2020-07-05'
          },
          {
            title  : 'event3',
            start  : '2020-07-09T12:30:00',
          }
        ],
        color: 'black',     // an option!
        textColor: 'yellow' // an option!
      },

      {
        events: [
          {
            title  : 'event7',
            start  : '2020-07-11'
          }
        ],
          color: 'red',     // an option!
        textColor: 'blue' // an option!
        
      }

  
      // any other event sources...
  
    ]
  }
 
    

  render() {
    console.log(this.state.eventSources)
    return (
      <div className="test">
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin, resourceTimelinePlugin]}
        initialView='dayGridMonth'
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
        events={this.state.eventSources}
        select={this.handleDateSelect}
        eventBackgroundColor={'red'}
        eventContent= {this.ahhh}
        />

      </div>
    )
  }




}

export default Test
