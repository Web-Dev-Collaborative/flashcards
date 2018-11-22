import React from 'react'
import PropTypes from 'prop-types'
import { Link, NavLink, Route } from 'react-router-dom'
import { withRouter } from 'react-router'

import QuizSurveyWithBuckets from './quizzes/QuizSurveyWithBuckets'
import QuizMatch from './quizzes/QuizMatch'
import QuizWriteIn from './quizzes/QuizWriteIn'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...props
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  render() {
    console.log('Rendering Quiz')
    console.dir(this.state)

    return (
      <div className="quiz">

        <div className="header">
          <Link to={`/decks/${this.state.deckName}`}><h1>{ this.state.deckName.charAt(0).toUpperCase()+this.state.deckName.slice(1) } - Quiz</h1></Link>
        </div>

        <div>
          <div className="sub-header"><h2>Choose a quiz type...</h2></div>
          <div className="grid grid-3">
            <NavLink to={`${this.props.match.url}/survey-with-buckets`} className="button" exact activeClassName="active-nav-link-sub">Self Survey</NavLink>
            <NavLink to={`${this.props.match.url}/match`} className="button" exact activeClassName="active-nav-link-sub">Match</NavLink>
            <NavLink to={`${this.props.match.url}/write-in`} className="button" exact activeClassName="active-nav-link-sub">Write In</NavLink>
          </div>
        </div>

        <Route path={`${this.props.match.url}/survey-with-buckets`} render={() => <QuizSurveyWithBuckets deckName={this.state.deckName} deck={this.state.deck} />} />
        <Route path={`${this.props.match.url}/match`} render={() => <QuizMatch deckName={this.state.deckName} deck={this.state.deck} />} />
        <Route path={`${this.props.match.url}/write-in`} render={() => <QuizWriteIn deckName={this.state.deckName} deck={this.state.deck} />} />
      </div>
    )  
  }
}

export default withRouter(Quiz)