import React, { Component } from 'react'
import TrainerCard from '../component/TrainerCard'
// import "../trainer.css"

export class TrainerContainer extends Component {

  state = {
    trainers : [],
    open: false
  }

  componentDidMount(){
    fetch('http://localhost:3000/trainers')
    .then(res => res.json())
    .then(trainers => this.setState({ trainers }))
  }
  render() {
    
    return (
      <div> 
        {/* <h1>Our trainers</h1>
        <div className="trainer-dropdown">
          <div className="trainr-container">
            <button type="button" className="button">
              ☰
            </button>
            <div className="dropdown">
              <ul >
              {this.state.trainers.map(trainer => <TrainerCard key={trainer.id} trainer={trainer}/>)}
                {this.state.trainers.map(trainer =><img className="trainer-image" src={trainer.image}></img>)}
              </ul>
            </div>
          </div>
        </div> */}
      </div>
    )
  }
}

export default TrainerContainer
