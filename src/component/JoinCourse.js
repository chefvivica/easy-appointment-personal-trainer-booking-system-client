import React, { Component } from 'react'


const API = 'http://localhost:3000/events'
export class JoinCourse extends Component {
  state = {
    on: false,
    buttonText: ''
  }

  toggle = () => this.setState({ on : !this.state.on})

  
  handleConfirm = (e) => {
    e.persist()
    const {currentUser, joinCourse, username} = this.props
    
    let userId = parseInt(currentUser)
    let eventId = parseInt(joinCourse.id)
    let newAppointment = {user_id:userId, event_id:eventId}
    
    if(!currentUser){
      alert("please login to join this event")     
    }else if(joinCourse.joinedUser.includes(username)){
      alert("You have already joined this event")
      console.log(e.target.innerText)
    }else if(e.target.innerText === 'Join this course'){
      fetch('http://localhost:3000/appointments',{
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body:JSON.stringify(newAppointment)
      })
      .then(res=> res.json())
      .then(res => {
        this.props.addJoinCourse(username)
      })
      alert(" You have been enrolled this course succesfully!")
      this.setState({on:true})
    }else if(e.target.innerText === 'Cancel your appointment'){
      fetch('http://localhost:3000/appointments',{
      method: "DELETE"
      })
      .then(res=> res.json())
      .then(res => {
        this.props.removeJoinCourse(username)
      })
    }
  }

  render() {  
  const {title, details, trainerImage, trainer, start, end} = this.props.joinCourse

  return (
    <div className="join-course-container">
      <div className="join-course-info">
        <h2>Please confirm your course</h2>
        <h1>{title}</h1>
        <h4>Course details: {details}</h4>

        <div className='join-course-time'>
          <h5> Start at: { start } </h5>
          <h5> End  at: { end } </h5>
        </div>
      </div>

      <div className="join-course-trainer">
        <img src={trainerImage} alt="trainer picture"/>
        <h5>trainer: {trainer}</h5>
      </div>

      <div>
        Student list
        <ul>
          {this.props.joinedUsers.map((user,index)=> <li key={index}>{user}</li>)} 
        </ul>
      </div>

      <button className="join-course-confirm-button" onClick={this.handleConfirm}>{this.state.on? "Cancel your appointment": "Join this course"}</button>
    </div>
  )
    
  }
}

export default JoinCourse


