import React from 'react';

const TrainerCard = (props) => {
  const {id, image, bio, name, comments,rating} = props.trainer
  
  return(
    <div>
      <div className="trainer-card">
        <div className="header">
          <img  src={image} alt="trainer picture" />
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