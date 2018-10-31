import React from 'react'
import PropTypes from 'prop-types'

import '../styles/Results.css'

const Results = props => {
  return (
    <div className="results-container">
      <div className="grid-parent grid-parent-3">
        <div className="scoreboard-small"></div>
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

Results.propTypes = {
  currentCardNumber: PropTypes.number,
  totalCardNumber: PropTypes.number,
  easyCount: PropTypes.number,
  mediumCount: PropTypes.number,
  difficultCount: PropTypes.number
}

export default Results