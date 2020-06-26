import React, { Component } from 'react';

const TrainerCard = (props) => {
  const {id, image, bio, name} = props.trainer
  
  return(
    <div>
      <img src={image} alt="trainer picture"/>
      <h4>Name: {name}</h4>
      <span>{bio}</span>
    </div>
  )
}

export default TrainerCard