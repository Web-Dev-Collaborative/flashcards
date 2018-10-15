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
      <div className="grid-parent grid-parent-3 score-holder">
        <div className="grid-children grid-parent grid-parent-2">
          <span className="grid-children">Easy - Got It Right</span>
          <span className="grid-children score-easy">0</span> 
        </div>
        <div className="grid-children grid-parent grid-parent-2">
          <span className="grid-children">Difficult - Got It Right</span>
          <span className="grid-children score-difficult">0</span> 
        </div>
        <div className="grid-children grid-parent grid-parent-2">
          <span className="grid-children">Got It Wrong</span>
          <span className="grid-children score-wrong">0</span> 
        </div>
      </div>
    </div>
  )
}

Scoreboard.propTypes = {
  currentDeck: PropTypes.string
}

export default Scoreboard
