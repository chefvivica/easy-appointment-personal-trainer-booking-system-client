import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/trainerCalendar.css"

export class TrainerCalendar extends Component {
  
  state = {
    trainer:{}
  }

  componentDidMount(){
    fetch(`http://localhost:3000/trainers/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(trainer => this.setState({trainer}))
  }

  render() {
    const{name, events} = this.state.trainer
    return (
      <div className='trainer-calendar-container'>
        <h1>{name}'s Calendar</h1>
        <div className='trainer-calendar'>
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
          height={700}
          events={events}
          eventClick={this.joinEvent}       
          
          />
        </div>
      </div>
    )
  }
}

export default TrainerCalendar
