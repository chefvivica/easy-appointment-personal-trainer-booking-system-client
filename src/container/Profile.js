import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/profile.css"

const requestUrl = 'http://localhost:3000/requests'
const url = "http://localhost:3000/appointments"
const trainerUrl = 'http://localhost:3000/trainers'

export class Profile extends Component {

  state = {
    condition: "dayCalendar",
    removeEvent:{},
    removeId:'',
    trainer:[],
    requests:[],
    start:'',
    end:'',
    option:'',
    detail:''
  }

  componentDidMount = () =>{
    fetch(requestUrl)
    .then(res => res.json())
    .then(requests => this.setState({ requests }))
    fetch(trainerUrl)
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
  }


  handleRemove = (e) => {
    let start = e.event._instance.range.start.toISOString().slice(0,-5)
    let target = this.props.events.find(event=> event.start === start)
    let item = this.props.userEvents.find(event=> event.start === start)
    this.setState({condition:"cancel",removeEvent:item , removeId:target.id})

  }  

  handler = (e) => {
    e.persist()
    if(e.target.innerText==='Confirm'){
      let appt = this.props.appointments.find(appointment => appointment.event_id === this.state.removeId && appointment.user_id === this.props.currentUser.id)
      let id = appt.id
      fetch(`${url}/${id}`,{
        method: "DELETE"
      })
      .then(res=> res.json())
      .then(data=> {
        this.props.removeAppointment(data)
        this.props.removeUserEvent(this.state.removeEvent)
        this.setState({condition: "dayCalendar"})
      })
    }else if(e.target.innerText==='Close'){
      this.setState({ condition: "dayCalendar"})
    }else if(e.target.innerText==="Request a one on one"){
      this.setState({condition:"timeCalendar"})
    }else if(e.target.innerText==="Group lesson"){
      this.setState({condition:"dayCalendar"})
    }
  }

  handleDateSelect = e => { 
    let eventStart = e.startStr.slice(0,-6)
    let eventEnd = e.endStr.slice(0,-6)
    this.setState({start: eventStart , end: eventEnd, condition:"booking"})
  }

  // unique = (value, index, self) => {
  //   return self.indexOf(value) === index
  // }
  
  handleChange = e => this.setState({ option: e.target.value})
  

  handleDetail = e => this.setState({ detail: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    let targetType= this.state.option
    let trainer = this.state.trainers.find(trainer=> trainer.sports === targetType)
    let trainerId = trainer.id
    let newRequest = {user_id: this.props.currentUser.id, trainer_id: trainerId, detail: this.state.detail, title: trainer.sports, start: this.state.start, end: this.state.end, color:'#FF0000'}
    fetch(requestUrl,{
      method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body:JSON.stringify(newRequest)
      })
      .then(res=> res.json())
      .then(data => {
        this.setState({ requests: [...this.state.requests, data]})           
    })
      this.setState({condition:"timeCalendar"})
  }
  

  render() {
    const {username, image,email} = this.props.currentUser
    const {start, end, condition, trainers} = this.state
    console.log(this.state.removeEvent,                  "!!",this.state.removeId)
    if(username === undefined){
      return "please login first"
    }else{
      return (
        <div className="profile-container">
          <div className="profile-info-container">
            <div>
              <img src={image} alt='user img'/> 
              <h4>Welcome back {username}</h4>
              <h5>{email}</h5>
              <button>Edit</button>
              <button onClick={this.handler}>Request a one on one</button>
              <button onClick={this.handler}>Group lesson</button>
                      
            </div>
          </div> 

          {condition === "dayCalendar"? 
          <div className="profile-calendar">
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
              // selectMirror={true}
              dayMaxEvents={true}
              aspectRatio= {1}
              height={700}
              events={this.props.userEvents}
              eventClick={this.handleRemove}
              />  
          </div>
          :null} 
          
          {condition === "cancel"? 
            <div className='profile-cancle-container'>
              <h3>Are you sure to cancel this event?</h3>
              <button onClick={this.handler}>Close</button><button onClick={this.handler}>Confirm</button>
            </div>               
          :null
          }  

          {condition === "booking"? 
            <div className='profile-booking-container'>
              <div>
                <h3>Your one one one training requested info: </h3>
                <h4> Time: from {start.slice(0,10)} at {start.slice(11,start.length)}  to  {end.slice(0,10)} at {end.slice(11, end.length)} </h4>
              </div>
              <div>
                <h5>Please pick the sport your want to learn:</h5>
                <select value={this.state.option} onChange={this.handleChange}>
                  {trainers.map((trainer, index) => <option key={index} value={trainer.sports}>{trainer.sports}</option>)}         
                </select> 
                <h5>What are you expecting from this lesson </h5>
                <input type="text" value={this.state.detail} name='detail' onChange={this.handleDetail}/>
                <button onClick={this.handleSubmit}>Submit</button> 
                <button>Close</button>                         
              </div>
            </div>        
          :null
          }  

          {condition === "timeCalendar"? 
          <div>
            <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="timeGridWeek"
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
              height={700}
              events={this.state.requests}
              eventClick={this.handleRemove}
              select={this.handleDateSelect}
              eventBackgroundColor={'#FFA500'}
              />  
          </div>
          :null}
        </div>
      )	    
    }   
  }	
}	

export default Profile
