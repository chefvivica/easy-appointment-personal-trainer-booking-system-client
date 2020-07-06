import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/profile.css"

const requestUrl = 'http://localhost:3000/requests'
const url = "http://localhost:3000/appointments"
const trainerUrl = 'http://localhost:3000/trainers'
const base = 'http://localhost:3000/users'

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
    fetch(`${base}/${this.props.currentUser.id}`)
    .then(res => res.json())
    .then(data => this.setState({ requests: data.requests }))
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
    }else if(e.target.innerText==="Private lesson"){
      this.setState({condition:"timeCalendar"})
    }else if(e.target.innerText==="Group lesson"){
      this.setState({condition:"dayCalendar"})
    }
  }
  
  handleDateSelect = e => { 
    console.log(e)
    let eventStart = e.startStr.slice(0,-6)
    let eventEnd = e.endStr.slice(0,-6)
    this.setState({start: eventStart , end: eventEnd, condition:"booking"})
    console.log(eventStart,    "÷÷",     eventEnd)
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
    let newRequest = {user_id: this.props.currentUser.id, trainer_id: trainerId, detail: this.state.detail, title: trainer.sports, start: this.state.start, end: this.state.end, color:'#FF4500'}
    console.log("trainer", trainer)
    console.log("newRequest", newRequest)
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
  
  handleRequest = (e) => {
    console.log(e)
  }

  render() {
    const {username, image,email} = this.props.currentUser
    const {start, end, condition, trainers} = this.state
    

    if(username === undefined){
      return "please login first"
    }else{
      return (
        <div className="profile-container">
          <div className="profile-info-container">
            <div>
              <img src={image} /> 
              <h4>Welcome back {username}</h4>
              <h5>{email}</h5>
              {/* <button>Edit</button> */}
              <button onClick={this.handler}>Private lesson</button>
              <button onClick={this.handler}>Group lesson</button>
                      
            </div>
          </div> 

          {condition === "dayCalendar"? 
          <div className="profile-calendar">
            <h1>Your group lesson calendar</h1>
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
              <h3>Are you sure you want to cancel this course?</h3>
              <button onClick={this.handler}>Close</button><button onClick={this.handler}>Confirm</button>
            </div>               
          :null
          }  

          {condition === "booking"? 
            <div className='profile-booking-container'>
              <div>
                <h3>Your one one one training requested info: </h3>
                <h4> Time: from <b>{start.slice(0,10)} at {start.slice(11,start.length)} </b> to  <b>{end.slice(0,10)} at {end.slice(11, end.length)} </b></h4>
              </div>
              <div>
                <h5>Please pick your sport:</h5>
                <select value={this.state.option} onChange={this.handleChange}>
                  <option>please select</option>
                  {trainers.map((trainer, index) => <option key={index} value={trainer.sports}>{trainer.sports}</option>)}         
                </select> 
                <h5>What are you expecting from this lesson?</h5>
                <input type="text" value={this.state.detail} name='detail' onChange={this.handleDetail}/>
                <button onClick={this.handleSubmit}>Submit</button> 
                <button>Close</button>                         
              </div>
            </div>        
          :null
          }  

          {condition === "timeCalendar"? 
          <div>
            <h1>Your private lessons calendar</h1>
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
              eventClick={this.handleRequest}
              select={this.handleDateSelect}
              // eventBackgroundColor={'#FF4500'}
              />  
          </div>
          :null}
        </div>
      )	    
    }   
  }	
}	

export default Profile
