import React, { Component } from 'react'
import TrainerCard from '../component/TrainerCard'
// import "../trainer.css"

export class TrainerContainer extends Component {

  state = {
    trainers : []
  }

  componentDidMount(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
  }
  render() {

  
    return (
      <div className="trainer-container">
        {this.state.trainers.map(trainer => <TrainerCard key={trainer.id} trainer={trainer}/>)}
      </div>
    )
  }
}

export default TrainerContainer
