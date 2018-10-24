import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Scoreboard.css'

const Scoreboard = props => {
  return (
    <div className="scoreboard grid-parent score-holder">
      <div className="scoreboard-title-text small">-  S T A T S  -</div>
      {
        props.currentDeckName ? 
          <div 
            className="small">Deck: {props.currentDeckName.charAt(0).toUpperCase() + props.currentDeckName.slice(1)}
          </div> : ''
      }
      {
        props.currentCardNumber && props.totalCardNumber ? 
          <div 
            className="small">Reviewed: {props.currentCardNumber} of {props.totalCardNumber}
          </div> : ''
      }

      {/* <div className="grid-parent grid-parent-3 score-holder"> */}
        <div className="grid-child grid-parent">
          <h5>Easy To Recall</h5>
          <span className="score score-easy">{props.easyCount}</span>
        </div>
        <div className="grid-child grid-parent">
          <span>Difficult To Recall</span>
          <span className="score score-medium">{props.mediumCount}</span>
        </div>
        <div className="grid-child grid-parent">
          <span>Unable To Recall</span>
          <span className="score score-wrong">{props.difficultCount}</span>
        </div>
      </div>
    // </div>
  )
}

Scoreboard.propTypes = {
  currentDeckName: PropTypes.string,
  currentCardNumber: PropTypes.number,
  totalCardNumber: PropTypes.number,
  easyCount: PropTypes.number,
  mediumCount: PropTypes.number,
  difficultCount: PropTypes.number
}

export default Scoreboard
