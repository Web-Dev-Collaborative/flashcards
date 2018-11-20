import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const QuizResults = (props) => {
  return (
    <div>
      <div className="header">
        <Link to={`/decks/${props.deckName}`}><h1>{ props.deckName.charAt(0).toUpperCase()+props.deckName.slice(1) } - Quiz - Results</h1></Link>
      </div>
      <div className="grid grid-3 results-container">
        { Object.keys(props.easyBucket).length > 0 ?
          Object.keys(props.easyBucket).map((card, index) => {
          return (
            <div key={index}>
              <h2 className="sub-header">Easy</h2>
              <span>{card}</span>
              {/* <span>{props.easyBucket[card]}</span> */}
            </div>
          )
        }) : ''}
        { Object.keys(props.mediumBucket).length > 0 ?
          Object.keys(props.mediumBucket).map((card, index) => {
          return (
            <div key={index}>
              <h2 className="sub-header">Medium</h2>
              <span>{card}</span>
              {/* <span>{props.mediumBucket[card]}</span> */}
            </div>
          )
        }) : ''}
        { Object.keys(props.difficultBucket).length > 0 ?
          Object.keys(props.difficultBucket).map(card => {
          return (
            <div>
              <h2 className="sub-header">Difficult</h2>
              <span>{card}</span>
              {/* <span>{props.difficultBucket[card]}</span> */}
            </div>
          )
        }) : ''}
      </div>
    </div>
  )
}

QuizResults.propTypes = {
  deckName: PropTypes.string.isRequired,
  easyBucket: PropTypes.object.isRequired,
  mediumBucket: PropTypes.object.isRequired,
  difficultBucket: PropTypes.object.isRequired
}

export default QuizResults