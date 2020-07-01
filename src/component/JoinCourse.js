import React, { Component } from 'react'


const url ="http://localhost:3000/appointments"
const API = 'http://localhost:3000/events'
export class JoinCourse extends Component {
  state = {
    button:'Join this course',
    trainer:{},
    on:false
  }

  toggle = () => this.setState({ on : !this.state.on})

  handleConfirm = e => {
    e.persist()
    const {currentUser, joinCourse, joinedUsers} = this.props
    let username = currentUser.username
    
    let userId = currentUser.id
    let eventId = parseInt(joinCourse.id)
    let newAppointment = {user_id:userId, event_id:eventId}
    
    console.log(username)
    if(currentUser.id === undefined){
      alert("please login to join this event")     
    }
    else if(e.target.innerText === 'Join this course' && joinedUsers.find(user=> user===username)){
      alert("You have already joined this event")
    }
    else if(e.target.innerText === 'Join this course'){
      fetch(`${url}`,{
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body:JSON.stringify(newAppointment)
      })
      .then(res=> res.json())
      .then(data => {
        this.props.addJoinCourse(username)
        this.props.addAppointment(data)
      })
      alert(" You have been enrolled this course succesfully!")
      this.setState({button:"Cancel"})
    }
    else if(e.target.innerText === 'Cancel'){
        let arr = this.props.appointments.find(a=> a.user_id === userId && a.event_id === eventId)
        let id = arr.id
        fetch(`${url}/${id}`,{ 
          method: "DELETE"
          })
          .then(res=> res.json())
          .then(data=>{
              this.props.removeAppointment(data)
              this.props.removeJoinCourse(username)
            })   
      alert(" You cancelled this course succesfully!")
      this.setState({button:"x"})
    }
    else if(e.target.innerText === 'x'){
      //
    }
  }
  

  
  render() {  
    
    const {title, details, start, end} = this.props.joinCourse
    const {name, image}=this.props.trainer
    let studentsTorender = [...new Set(this.props.joinedUsers)]

    return (
      
      <div className="join-course-container">
        <div className="join-course-info">
          <button className="join-course-close-form-button" onClick={this.handleConfirm}>x</button>
          <h2>Please confirm your course</h2>
          <h1>{title}</h1>
          <h4>Course details: {details}</h4>

          <div className='join-course-time'>
            <h5> Start at: { start } </h5>
            <h5> End  at: { end } </h5>
          </div>
        </div>

        <div className="join-course-trainer">
          <img src={image} alt="trainer picture"/>
          <h5>trainer: {name}</h5>
        </div>

        <div>
          Student list
          <ul>
            {studentsTorender.map((user,index)=> <li key={index}> {user} </li>)} 
          </ul>
        </div>
        {/* <button className="join-course-confirm-button" onClick={this.handleConfirm}>{this.state.on? "Cancel your appointment": "Join this course"}
        </button> */}
        <button className="join-course-confirm-button" onClick={this.handleConfirm}> {this.state.button}</button>
        
      </div>
    )   
  }
}

export default JoinCourse


