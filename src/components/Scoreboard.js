import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Scoreboard.css'

const Scoreboard = props => {
  return (
    <div className="scoreboard">
      <h3>Scoreboard</h3>
      {
        props.currentDeckName ? <span>Current deck: {props.currentDeckName.charAt(0).toUpperCase() + props.currentDeckName.slice(1)}</span> : ''
      }
      <div className="grid-parent grid-parent-3 score-holder">
        <div className="grid-child grid-parent grid-parent-2">
          <span>Easy - Got It Right</span>
          <span className="score score-easy">{props.easyCount}</span>
        </div>
        <div className="grid-child grid-parent grid-parent-2">
          <span>Difficult - Got It Right</span>
          <span className="score score-medium">{props.mediumCount}</span>
        </div>
        <div className="grid-child grid-parent grid-parent-2">
          <span>Unable To Recall</span>
          <span className="score score-wrong">{props.difficultCount}</span>
        </div>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  currentDeckName: PropTypes.string
}

export default Scoreboard
