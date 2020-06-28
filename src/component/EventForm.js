import React, { Component } from 'react'

export class EventForm extends Component {
  render() {
    // this.props
    return (
      <div className={"join-course-container"}>
        <form className="join-course-form" onSubmit={this.handleSubmit}>
          <h4>confirm you course</h4>
          <textarea />
          <textarea />
          <textarea />
          <button type="submit">Submit</button>
        </form>
      </div>
    )
  }
}

export default EventForm
