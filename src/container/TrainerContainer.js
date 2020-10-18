import React, { Component } from 'react'
import TrainerCard from '../component/TrainerCard'
import "../css/trainer.css"

export class TrainerContainer extends Component {

  state = {
    trainers : [],
    open: false,
  }

  componentDidMount(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
  }
  render() {

    return (
      <div className="trainer-div">
        {this.state.trainers.map(trainer => 
        <TrainerCard key={trainer.id}  trainer={trainer} history={this.props.history}/>)}
      </div>   
    ) 
  }
}

export default TrainerContainer
