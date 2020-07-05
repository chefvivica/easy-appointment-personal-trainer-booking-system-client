import React, { Component } from 'react'
import "../css/joinCourse.css"


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
 
    if(e.target.innerText === 'Join this course' && currentUser.id === undefined){
      alert("please login to join this event")     
    }
    else if(e.target.innerText === 'Join this course' && joinedUsers.find(user=> user.username===username)){
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
        this.props.addJoinCourse(this.props.currentUser)
        this.props.addAppointment(data)
        this.props.updateUserEvents(eventId)
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
              this.props.removeJoinCourse(this.props.currentUser)
            })   
      alert(" You cancelled this course succesfully!")
      this.setState({button:"close"})
    }
    else if(e.target.innerText === 'close'){
      this.props.closeForm()
    }
  }

  getUnique = (arr, index) =>{
    const unique = arr.map(e => e[index])
    .map((e, i, final) => final.indexOf(e) === i && i)
    .filter(e => arr[e]).map(e => arr[e]);      
    return unique;
  }

  render() {  
    console.log(this.props.joinedUsers)
    const {title, details, start, end} = this.props.joinCourse
    const {name, image}=this.props.trainer
    let studentsTorender = this.getUnique([...this.props.joinedUsers],"username")

    return (     
      <div className="join-course-container">
          <button className="join-course-close-form-button" onClick={this.handleConfirm}>close</button> 
        <div className="join-course-info">
          <h1>{title}</h1>
        </div>

        <div className="join-course-trainer">
          <img src={image} alt="trainer picture"/>
          <h2>Trainer: {name}</h2>
          <h4>Course details: {details}</h4>
          
            <h5> Start at: { start } </h5>
            <h5> End  at: { end } </h5>
        </div>

        <div className='student-container'>
          <ul className='student-info'>
            {studentsTorender.map((user,index)=> <div key={index}><img src={user.image}/><span> {user.username}</span></div>)} 
          </ul>
        <button className="join-course-confirm-button" onClick={this.handleConfirm}> {this.state.button}</button>
        </div>
        
      </div>
    )   
  }
}

export default JoinCourse


