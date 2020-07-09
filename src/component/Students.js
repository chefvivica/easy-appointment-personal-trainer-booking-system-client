import React, { Component } from 'react'
import "../css/student.css"

export class Students extends Component {
  render() {

    const {username,image,email} = this.props.student
    return (
      <div className="stu-container">
        <div className='student-card'>
          <img src={image} alt='pic'/>
          <div className="stu-info">
            <h4><b>{username}</b></h4> 
            <p>{email}</p> 
          </div>
        </div>
      </div>
    )
  }
}

export default Students
