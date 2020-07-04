import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import resourceTimelinePlugin from '@fullcalendar/resource-timeline'; 
import { Calendar } from '@fullcalendar/core';

export class Test extends Component {

  state={
        events: [ ],
      }
  
  handleDateSelect = (selectInfo) => {
        
        // let calendarApi = selectInfo.view.calendar
    
        // calendarApi.unselect() // clear date selection
    

          let wah = {
            start: selectInfo.startStr,
            end: selectInfo.endStr,
            allDay: selectInfo.allDay
          }
          console.log(wah)
        
      }
    

  render() {
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
        events={this.state.events}
        select={this.handleDateSelect}
        eventBackgroundColor={'red'}
        // eventTextColor={'green'}
        eventContent= {this.ahhh}
        />

      </div>
    )
  }




}

export default Test
