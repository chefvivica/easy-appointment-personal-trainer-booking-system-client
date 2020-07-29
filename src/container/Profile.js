import React, { Component } from 'react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import "../css/profile.css"

const requestUrl = 'http://localhost:3000/requests'
const url = "http://localhost:3000/appointments"
const trainerUrl = 'http://localhost:3000/trainers'
const userUrl = 'http://localhost:3000/users'

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
    detail:'',
    username:'',
    email: '',
    phone_number:'',
    image: ''
  }

  componentDidMount = () =>{
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
    }else if(e.target.innerText==="Edit"){
      this.setState({condition:"Edit"})
    }
  }
  
  handleDateSelect = e => { 
    let eventStart = e.startStr.slice(0,-6)
    let eventEnd = e.endStr.slice(0,-6)
    this.setState({start: eventStart , end: eventEnd, condition:"booking"})
  }

  
  handleChange = e => this.setState({ option: e.target.value})

  changeHandler = e => {
    this.setState({ [e.target.name] : e.target.value})
  }

  edit = e => {
    e.preventDefault()
    let username = ''
    if(this.state.username  === ''){
      username = this.props.currentUser.username
    }else{
      username = this.state.username
    }let email = ''
    if(this.state.email  === ''){
      email = this.props.currentUser.email
    }else{
      email= this.state.email 
    }let phone_number = ''
    if(this.state.phone_number  === ''){
      phone_number = this.props.currentUser.phone_number
    }else{
      phone_number = this.state.phone_number
    }let image = ''
    if(this.state.image  === ''){
      image = this.props.currentUser.image
    }else{
      image = this.state.image
    }
    fetch(`${userUrl}/${this.props.currentUser.id}`,{
      method:'PATCH',
      headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify({username: username, email: email, phone_number: phone_number, image: image})
    })
    .then(res=> res.json())
    .then(data => {
      console.log(data)
      this.props.updateUser(data)
    })
    this.setState({condition:"dayCalendar"})
}
  
  

  handleDetail = e => this.setState({ detail: e.target.value})

  handleSubmit = e => {
    e.preventDefault()
    let targetType= this.state.option
    let trainer = this.state.trainers.find(trainer=> trainer.sports === targetType)
    let trainerId = trainer.id
    let newRequest = {user_id: this.props.currentUser.id, trainer_id: trainerId, detail: this.state.detail, title: trainer.sports, start: this.state.start, end: this.state.end, color:'#FF4500'}

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
        this.props.addRequest(data)
    })
      this.setState({condition:"timeCalendar"})
  }
  

  render() {
    const {username, email, image, phone_number} = this.props.currentUser
    const {start, end, condition, trainers ,removeEvent, detail, option} = this.state
    const {userEvents, history, logout, requests} = this.props

    if(username === undefined){
      return "please login first"
    }else{
      return (
        <div className="profile-container">
          <div className="profile-info-container">
            <div className="info">
              <img src={image} alt='user pic'/> 
              <div>
                <h4>Welcome back {username}</h4>
                <h5>{email}</h5>
                <div className='profile-btn'>
                  <button onClick={this.handler}>Edit</button>
                  <button onClick={()=>logout(history)}>Log out</button>
                </div>
              </div>
            </div>
              <div>           
              <button onClick={this.handler}>Private lesson</button>
              <button onClick={this.handler}>Group lesson</button>       
            </div>
          </div> 

          {condition === "dayCalendar"? 
          <div className="profile-calendar">
            <h1>{username}'s group lesson calendar</h1>
          <FullCalendar
              plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: 'prev,next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
              }}
              editable={true}
              dayMaxEvents={true}
              aspectRatio= {1}
              height={700}
              events={userEvents}
              eventClick={this.handleRemove}
              eventBackgroundColor={'#ADD8E6'}
              eventTextColor={'black'}
              />  
          </div>
          :null} 
          
          {condition === "cancel"? 
            <div className='profile-cancle-container'>
              <h3>Are you sure you want to cancel this course?</h3>
              <h1>Course: {removeEvent.title}</h1>
              <h4> Date & Time: from {removeEvent.start.slice(0,10)} at {removeEvent.start.slice(11,removeEvent.start.length)}  to  {removeEvent.end.slice(0,10)} at {removeEvent.end.slice(11, removeEvent.end.length)} </h4>
              <div className="cancel-btn">
                <button onClick={this.handler}>Close</button>
                <button onClick={this.handler}>Confirm</button>
              </div>
            </div>               
          :null
          }  

          {condition === "booking"? 
            <div className='profile-booking-container'>
              <div>
                <h1>Please fill out your request info: </h1>
                <h4> Date & Time: from {start.slice(0,10)} at {start.slice(11,start.length)}  to  {end.slice(0,10)} at {end.slice(11, end.length)} </h4>
              </div>
              <div>
                
                <div>
                  <select className="drop-down" value={option} onChange={this.handleChange}>
                    <option>Please select your sport</option>
                    {trainers.map((trainer, index) => <option key={index} value={trainer.sports}>{trainer.sports}</option>)}         
                  </select> 
                </div>
                <h5>What are you expecting from this lesson?</h5>
                <textarea value={detail} name='detail' onChange={this.handleDetail}/>
                <div className='btn'>
                  <button onClick={this.handleSubmit}>Submit</button> 
                </div>                         
              </div>
            </div>        
          :null
          }  

          {condition === "timeCalendar"? 
          <div className="private-calendar">
            <h1>{username}'s private lessons calendar</h1>
            <h4> Select a time to request a one one lesson with your favorite coach</h4>
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
              eventBackgroundColor={'#FF4500'}
              events={requests}
              eventClick={this.handleRequest}
              select={this.handleDateSelect}
              />  
          </div>
          :null}

          {condition === "Edit"? 
            <div className='profile-form'>
              <form onSubmit={this.edit}>
                <h1>Update your infomation</h1>
                <label>Username</label>
                <input type='text' name='username' placeholder={username} onChange={this.changeHandler}/>
                <label>Email</label>
                <input type='text' name='email' placeholder={email} onChange={this.changeHandler}/>
                <label>Phone_number</label>
                <input type='text' name="phone_number" placeholder={phone_number}  onChange={this.changeHandler}/>
                <label>Your Profile Photo</label>
                <input type='text' name='image' placeholder='your image url' onChange={this.changeHandler}/>
                <input type='submit' className='update-btn' value='Update'/>
              </form>
            </div>        
          :null
          }       
        </div>
      )	    
    }   
  }
}	

export default Profile
