import React, { Component } from 'react'
import JoinCourse from '../component/JoinCourse'

export class EventList extends Component {
  render() {
    console.log(this.props)
    return (
      <div>
       {this.props.events.map(event=> <JoinCourse key={event.id} event={event}/>)}
      </div>
    )
  }
}

export default EventList
