import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'

import QuizSurveyWithBuckets from './quizzes/QuizSurveyWithBuckets'
import QuizMatch from './quizzes/QuizMatch'
import QuizWriteIn from './quizzes/QuizWriteIn'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      bucketShowing: false,
      matchShowing: false,
      writeShowing: false,
      ...props
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  renderSurvey = (surveyComponent) => {
    this.setState({
      bucketShowing: false,
      matchShowing: false,
      writeShowing: false,
      [`${surveyComponent}Showing`]: !this.state[`${surveyComponent}Showing`]
    })
  }

  render() {
    console.log('Rendering Quiz')
    console.dir(this.state)

    return (
      <div className="quiz">

        <div className="header">
          <Link to={`/decks/${this.state.deckName}`}><h1>{ this.state.deckName.charAt(0).toUpperCase()+this.state.deckName.slice(1) } - Quiz</h1></Link>
        </div>
  
        {
          this.state.bucketShowing ? 
          <QuizSurveyWithBuckets deckName={this.state.deckName} deck={this.state.deck} /> :
          ''
        }
        {
          this.state.matchShowing ? 
          <QuizMatch deckName={this.state.deckName} deck={this.state.deck} /> :
          ''
        }
        {
          this.state.writeShowing ? 
          <QuizWriteIn deckName={this.state.deckName} deck={this.state.deck} /> :
          ''
        }
        {
          (this.state.bucketShowing || this.state.matchShowing || this.state.writeShowing) ?
          '' :
          <div>
            <div className="sub-header"><h2>Choose a quiz type...</h2></div>
            <div className="grid grid-3">
              <button onClick={() => this.renderSurvey('bucket') }>Self Survey</button>
              <button onClick={() => this.renderSurvey('write') }>Write In</button>
              <button onClick={() => this.renderSurvey('match') }>Match</button>
            </div>
          </div>
        }  
      </div>
    )  
  }
}

export default withRouter(Quiz)