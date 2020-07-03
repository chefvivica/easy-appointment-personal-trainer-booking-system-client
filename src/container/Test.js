import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction' 

export class Test extends Component {

  state={
  
        events: [ // put the array in the `events` property
          {
            title  : 'event1',
            start  : '2020-08-01'
          },
          {
            title  : 'event2',
            start  : '2020-07-05',
            end    : '2020-07-07'
          },
          {
            title  : 'event3',
            start  : '2020-08-01T12:30:00',
          }
        ],
        color: 'black',     // an option!
        textColor: 'yellow' // an option!
      }
    
      // any other event sources...
  
      // ahhh= (arg)=> {
      //   let italicEl = document.createElement('i')
      
      //   if (arg.event.extendedProps.isUrgent) {
      //     italicEl.innerHTML = 'urgent event'
      //   } else {
      //     italicEl.innerHTML = 'normal event'
      //   }
      
      //   let arrayOfDomNodes = [ italicEl ]
      //   return { domNodes: arrayOfDomNodes }
      // }

  render() {
    return (
      <div className="test">
        <FullCalendar
        plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"       
        events={this.state.events}

      // eventContent= {this.ahhh}
        />
      </div>
    )
  }
}

export default Test
