import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/trainerCalendar.css"
import Students from '../component/Students'


export class TrainerCalendar extends Component {
  
  state = {
    trainer:{},
    students:[],
    on:false
  }

  componentDidMount(){
    fetch(`http://localhost:3000/trainers/${this.props.match.params.id}`)
    .then(res => res.json())
    .then(trainer => this.setState({trainer}))
  }
  
  toggle = () => this.setState({ on: !this.state.on})

  handleEvent = (e) =>{
    let start = e.event._instance.range.start.toISOString().slice(0,-5)
    let target = this.props.events.find( event => event.start === start)
    this.setState({ students : target.users, on: true })
    console.log(target)
  }


  render() {
    const{name, events} = this.state.trainer
    const{students,on} = this.state

    return (
      <div className='trainer-calendar-container'>
        {!on? 
        <div>
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
            eventClick={this.handleEvent}                 
            />
          </div>
        </div>
      :
        <div className = "stu-container"> {students.map((student,index) =><Students key={index} student={student}/>)} </div> }
      </div>
    )
  }
}

export default TrainerCalendar
