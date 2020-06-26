import React, { Component } from 'react'
import EventCalendar from '../component/EventCalendar'
import DayView from '../component/DayView'
import Login from '../component/Login'
import Signup from '../component/Signup'
import NavBar from '../component/NavBar'
import TrainerContainer from './TrainerContainer'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from '../component/event-utils.js'
import {BrowserRouter as Router, Route} from 'react-router-dom' 



class MainContainer extends Component {

  state = {
    events:[ ],
    trainers:[ ]
  }


  componentDidMount(){
    fetch('http://localhost:3000/events')
    .then(res => res.json())
    .then(events => this.setState({ events }))

    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
  }

 

  // get= (clickInfo) => {
  //   if (`${clickInfo.event.title}`){
  //     alert ('Are you sure you want to delete the event ')
  //     // let title = prompt('Are you sure you want to delete the event )
  //   }
  //     if("ok"){      
  //       clickInfo.event.remove()
  //     }
  // }

  // handleEvents = (events) => {
  //   this.setState({
  //     events: events
  //   })
  // }

  render() {

    return (
      // <div>
      // {/* <EventCalendar events={this.state.events} />      */}
      //   <DayView events={this.state.events}  handleDateSelect={this.props.handleDateSelect}/>
      //   <TrainerContainer trainers={this.state.trainers}/>
      //   <Login/>
      //   <Signup/>
      // </div>
      <Router>
      <div className="App">
        <NavBar />
        {/* <Route exact path='/hikes/:id' render={routerProps =>{
          const hikeId = parseInt(routerProps.match.url.split("/")[2])
          const targetHike = this.state.hikes.find(hike=> hike.id === hikeId)
          return <HikeProfile 
            hike={targetHike} 
            hikeId={hikeId} 
            hikeId={parseInt(routerProps.match.url.split("/")[2])}
            editHike={this.editHike}
          /> 
        }}/> */}
        <Route 
          exact path='/signup' 
          render={routerProps => 
            <Signup
              {...routerProps} 
            />
          }
        />
        <Route 
          exact path='/login' 
          render={routerProps => 
            <Login
              {...routerProps} 
            />
          }
        />
        <Route 
          exact path='/trainer' 
          render={routerProps => 
            <TrainerContainer trainers={this.state.trainers}  {...routerProps}/>
          }
        />
        <Route 
          exact path='/' 
          render={routerProps => 
            <DayView events={this.state.events}  handleDateSelect={this.props.handleDateSelect}/>
          }
        />
      </div>
    </Router>
    )
  }
}

export default MainContainer
