import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

const QuizResults = (props) => {
  let rightAnswerTotal = 0, wrongAnswerTotal = 0

  return (
    <div>
      <div className="header">
        <h1>
            <Link to={`/decks/${props.deckName}`}>{ props.deckName.charAt(0).toUpperCase()+props.deckName.slice(1) }</Link>
            <Link to={`/decks/${props.deckName}/quiz`}> - Quiz </Link>
            - Results
          </h1>
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
      <div className="write-in-results">
        { props.correctAnswersArray && props.correctAnswersArray.length > 0 && props.inputAnswersArray.length > 0 ?
            <div className="totals">
              { props.correctAnswersArray.map((correctAnswer, index) => {
                if (correctAnswer === props.inputAnswersArray[index]) {
                  rightAnswerTotal++
                  return <div className="correct grid grid-2" key={index}>
                    <span><strong>Correct!</strong></span>
                    <span>{props.inputAnswersArray[index]}</span>
                  </div>
                } else {
                  wrongAnswerTotal++
                  return <div className="incorrect grid grid-2" key={index}>
                    <span><strong>Incorrect!</strong> You answered: {props.inputAnswersArray[index]}</span>
                    <span><strong>The correct answer is:</strong> {props.correctAnswersArray[index]}</span>
                  </div>
                }
              })
              }
              <div className="results-total grid grid-2">
                <h2 className="sub-header">Total Correct {rightAnswerTotal}</h2>
                <h2 className="sub-header">Total Incorrect {wrongAnswerTotal}</h2>
              </div>
            </div>
          : ''          
        }
      
      </div>
    </div>
  )
}

QuizResults.propTypes = {
  deckName: PropTypes.string.isRequired,
  easyBucket: PropTypes.object,
  mediumBucket: PropTypes.object,
  difficultBucket: PropTypes.object,
  correctAnswersArray: PropTypes.array,
  inputAnswersArray: PropTypes.array
}

export default QuizResults