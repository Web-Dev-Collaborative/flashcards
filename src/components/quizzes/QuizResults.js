import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class QuizResults extends React.Component {

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    easyBucket: PropTypes.object,
    mediumBucket: PropTypes.object,
    difficultBucket: PropTypes.object,
    correctAnswersArray: PropTypes.array,
    inputAnswersArray: PropTypes.array
  }

  render() {
    console.log('Rendering QuizResults')
    console.dir(this.props)

    const easyKeys = Object.keys(this.props.easyBucket)
    const easyTotal = easyKeys.length
    const mediumKeys = Object.keys(this.props.mediumBucket)
    const mediumTotal = mediumKeys.length
    const difficultKeys = Object.keys(this.props.difficultBucket)
    const difficultTotal = difficultKeys.length

    return (
      <div>
        <div className="header">
          <h1>
              <Link to={`/decks/${this.props.deckName}`}>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) }</Link>
              <Link to={`/decks/${this.props.deckName}/quiz`}> - Quiz </Link>
              - Results
            </h1>
        </div>
        <div className="grid grid-3 results-container">
          <div className="easy-results">
            <h3>Easy: {easyTotal}</h3>
            { easyTotal > 0 ? easyKeys.toString() : '' }
          </div>
          <div className="medium-results">
            <h3>Medium: {mediumTotal}</h3>
            { mediumTotal > 0 ? mediumKeys.toString() : '' }
          </div>
          <div className="difficult-results">
            <h3>Difficult: {difficultTotal}</h3>
            { difficultTotal > 0 ? difficultKeys.toString() : '' }
          </div>
        </div>
      </div>
    )
  }
}

export default QuizResults