import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Card.css'

const Card = props => {
  if (props.frontShowing) {
    return (
      <button onClick={() => props.flipCard()} className="card card-front">
        <div className="card-data-div">{ props.front }</div>
      </button>
    )
  } else {
    return (
      <button onClick={(e) => { e.stopPropagation(); props.flipCard() }} className="card card-back">
        <div className="card-data-div">{ props.back }</div>
      </button>
    ) 
  }
}

Card.propTypes = {
  frontShowing: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired,
  card: PropTypes.shape({
    front: PropTypes.string.isRequired,
    back: PropTypes.string.isRequired  
  }) 
}

export default Card
