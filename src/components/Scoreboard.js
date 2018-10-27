import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Scoreboard.css'

const Scoreboard = props => {
  return (
    <div className="scoreboard">
      <div className="grid-parent grid-parent-3">
        <div className="scoreboard-small"></div>
        {
          props.currentDeckName ? 
            <div 
              className="scoreboard-small">Deck: {props.currentDeckName.charAt(0).toUpperCase() + props.currentDeckName.slice(1)}
            </div> : '' 
        }
        {
          props.currentCardNumber && props.totalCardNumber ? 
            <div 
              className="scoreboard-small">Reviewed: {props.currentCardNumber} of {props.totalCardNumber}
            </div> : <div className="scoreboard-small">Reviewed: 0</div>
        }
      </div>
      <div className="grid-parent grid-parent-3">
        {
          props.easyCount ? 
            <div className="scoreboard-small">Easy To Recall: {props.easyCount}
            </div> : ''
        }
        {
          props.mediumCount ? 
            <div className="scoreboard-small">Difficult To Recall: {props.mediumCount}
            </div> : ''
        }
        {
          props.difficultCount ? 
            <div className="scoreboard-small">Unable To Recall: {props.difficultCount}
            </div> : ''
        }
      </div>
    </div>
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
