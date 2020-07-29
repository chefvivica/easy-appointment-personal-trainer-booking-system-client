import React, { Component } from 'react'
import "../css/joinCourse.css"


const url ="http://localhost:3000/appointments"
export class JoinCourse extends Component {
  state = {
    button:'Join this course',
    trainer:{},
    view:''
  }

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
      this.setState({view: "joinCourse"})
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
        // console.log(data)
        this.props.addStudent(this.props.currentUser)
      })
      this.setState({button:"Cancel"})
    }
    else if(e.target.innerText === 'Cancel'){
      let arr = this.props.appointments.find(a=> a.user_id === userId && a.event_id === eventId)
      let id = arr.id
      this.setState({view: "cancelCourse"})
      fetch(`${url}/${id}`,{ 
        method: "DELETE"
        })
        .then(res=> res.json())
        .then(data=>{
            this.props.removeAppointment(data)
            this.props.removeJoinCourse(this.props.currentUser)
          })   
      this.setState({button:"Join this course"})      
    }
    else if(e.target.innerText === 'Back'){
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
    const {title, details} = this.props.joinCourse
    const {date, range} = this.props 
    const {name, image}=this.props.trainer
    let studentsTorender = this.getUnique([...this.props.joinedUsers],"username")


    return (     

      <div className="join-course-container">
        <div className="join-course-trainer">
          <h1>{title}</h1>
          <img src={image} alt='trainer pic'/>
          <h2>Trainer: {name}</h2>
          <h3> Date: {date} </h3>
          <h3> Course time: {range} </h3>
          <h4>Course details:{details}</h4>          
        </div>

        <div className='student-container'>
          <h3>Students who have been enrolled in this course</h3>
          <ul className='student-info'>
            {studentsTorender.map((user,index)=> <div key={index}><img src={user.image} alt='user pic'/></div>)} 
          </ul>
          <button className="join-course-confirm-button" onClick={this.handleConfirm}> {this.state.button}</button>
          <button className="join-course-close-form-button" onClick={this.handleConfirm}>Back</button> 
          {this.state.view === 'cancelCourse' ?
          <div className="popupCancel" >
            <h3>You cancelled this course succesfully!</h3>
          </div>
          :null} 
          {this.state.view ==='joinCourse' ?
          <div className="popupJoin" >
            <h3>You have been enrolled this course succesfully!</h3>
          </div>
          :null}                     
        </div>  
      </div>    
    )   
  }
}

export default JoinCourse


