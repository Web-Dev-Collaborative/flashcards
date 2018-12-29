import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

class QuizResults extends React.Component {

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    // Quiz type Self Survey submits 3 bucket objects of varying difficulty each containing cards
    easyBucket: PropTypes.object,
    mediumBucket: PropTypes.object,
    difficultBucket: PropTypes.object,
    // Quiz types Match and Write-In submit two arrays: correct answers and user-input answers
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
        {/* If self survey, display the self survey results
            Otherwise display the write-in or match results */}
        { (easyTotal + mediumTotal + difficultTotal > 0) ? 
          <div className="grid grid-3 limited-width-container">
            <div className="easy-results">
              <h3>Easy: {easyTotal}</h3>
              <p>
                { easyTotal > 0 ? easyKeys.toString() : '' }
              </p>
            </div>
            <div className="medium-results">
              <h3>Medium: {mediumTotal}</h3>
              <p>
                { mediumTotal > 0 ? mediumKeys.toString() : '' }
              </p>
            </div>
            <div className="difficult-results">
              <h3>Difficult: {difficultTotal}</h3>
              <p>
                { difficultTotal > 0 ? difficultKeys.toString() : '' }
              </p>
            </div>
          </div>
        :
        <div className="limited-width-container results-write-in results-match">
          {this.props.inputAnswersArray.map((answer, index) => {
            return <div className="grid grid-2" key={index}><h3>You answered:</h3><p>{answer}</p><h3>Correct Answer:</h3> <p>{this.props.correctAnswersArray[index]}</p></div>
          })}
        </div>
        }
      </div>
    )
  }
}

export default QuizResults