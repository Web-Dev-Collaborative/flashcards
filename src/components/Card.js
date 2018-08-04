import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Card.css'

const Card = (props) => {
  { 
    if (props.frontShowing) {
      return (
        <button onClick={() => props.flipCard()} className="card card-front">
          { props.front }
        </button>
      )
    } else {
      return (
        <button onClick={() => props.flipCard()} className="card card-back">
          { props.back }
        </button>
      ) 
    }
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
