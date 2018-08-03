import React from 'react'
import PropTypes from 'prop-types'

const Card = (props) => {
  return (
    <div className="card">
      <div className="card-front">
        {props.front ? props.front : 'Card front'}
      </div>
      <div className="card-back">
        {props.back ? props.back : 'Card back'}
      </div>
    </div>
  )
}

Card.PropTypes = {
  front: PropTypes.string.isRequired,
  back: PropTypes.string.isRequired
}

export default Card
