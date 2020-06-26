import React, { Component } from 'react'
import TrainerCard from '../component/TrainerCard'

export class TrainerContainer extends Component {

  render() {
    const {trainers} = this.props

    return (
      <div>
        {trainers.map(trainer => <TrainerCard key={trainer.id} trainer={trainer}/>)}
      </div>
    )
  }
}

export default TrainerContainer
