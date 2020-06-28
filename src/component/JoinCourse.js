import React, { Component } from 'react'



export class JoinCourse extends Component {
  state = {
    on: false
  }

  toggle = () => this.setState({ on : !this.state.on})

  handleConfirm = (e) => {
    const {currentUser, joinCourse} = this.props

    let userId = parseInt(currentUser)
    let eventId = parseInt(joinCourse.id)
    let newAppointment = {user_id:userId, event_id:eventId}


    fetch('http://localhost:3000/appointments',{
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body:JSON.stringify(newAppointment)
    })
    .then(res=> res.json())
    .then(data=> { console.log(data)})
    }


  render() {  
      console.log(this.props.currentUser)
      const {title, details, trainerImage, trainer, joinedUser, start, end} = this.props.joinCourse
    return (
      <div className={"join-course-container"}>
        <div className="join-course-info">
          <h4>Please confirm your course</h4>
          <h3>{title}</h3>
          <h4>Course details: {details}</h4>
          <div>
            <h5>{ start } to {end}</h5>
          </div>
        </div>
        <div className="join-course-trainer">
          <img src={trainerImage} alt="trainer picture"/>
          <h5>trainer: {trainer}</h5>
          <button onClick={this.toggle}>Student list</button>
          {this.state.on? <ul>
          {joinedUser.map((user,index)=> <li key={index}>{user}</li>)} 
        </ul>
        :null}
        </div>

        <button className="join-course-confirm-button" onClick={this.handleConfirm}>Confirm</button>
    </div>
    )
    
  }
}

export default JoinCourse


