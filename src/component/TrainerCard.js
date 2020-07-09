import React from 'react';

const TrainerCard = (props) => {
  const {id, image, bio, name} = props.trainer
  
  const renderEvent = (id) => {
    props.history.push(`/trainer/${id}`)
  }
  return(
    <div onClick={(e)=>renderEvent(id)}>
      <div className="trainer-card">
        <div className="header">
          <img  src={image} alt='trainer pic'/>
        </div>
        <div className="card-body">
          <h1>Name: {name}</h1>
          <span className="bio">{bio}</span>
        </div> 
      </div>
    </div>
  )
}

export default TrainerCard