import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Scoreboard.css'

const Scoreboard = (props) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      {
        props.currentDeck ? <span>Current deck: {props.currentDeck}</span> : ''
      }
      <div className="score-holder">
        <span className="correct">0 </span> 
        : 
        <span className="incorrect"> 0</span>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  currentDeck: PropTypes.string
}

export default Scoreboard
