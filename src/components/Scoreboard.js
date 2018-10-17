import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Scoreboard.css'

const Scoreboard = (props) => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      {
        props.currentDeck ? <span>Current deck: {props.currentDeck.charAt(0).toUpperCase() + props.currentDeck.slice(1)}</span> : ''
      }
      <div className="grid-parent grid-parent-3 score-holder">
        <div className="grid-child grid-parent grid-parent-2">
          <span>Easy - Got It Right</span>
          <span className="score score-easy">0</span>
        </div>
        <div className="grid-child grid-parent grid-parent-2">
          <span>Difficult - Got It Right</span>
          <span className="score score-medium">0</span>
        </div>
        <div className="grid-child grid-parent grid-parent-2">
          <span>Unable To Recall</span>
          <span className="score score-wrong">0</span>
        </div>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  currentDeck: PropTypes.string
}

export default Scoreboard
