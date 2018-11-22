import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import QuizResults from './QuizResults'

class QuizWriteIn extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentCardIndex: 0,
      questions: [],
      correctAnswers: [],
      inputAnswers: [],
      currentValue: '',
      ...props
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  handleChange(event) {
    this.setState({currentValue: event.target.value});
  }

  handleSubmit(e) {
    e.preventDefault()
    console.log('Submit clicked q: '+this.state.questions[this.state.currentCardIndex]+'. a: '+this.state.currentValue)
    this.setState({
      inputAnswers: [...this.state.inputAnswers, this.state.currentValue],
      currentCardIndex: this.state.currentCardIndex + 1,
      currentValue: ''
    })
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      questions: Object.keys(this.props.deck),
      correctAnswers: Object.values(this.props.deck)
    })
  }

  render() {
    if (this.state.isLoading) return ''
    // console.log('Rendering QuizWriteIn')
    // console.dir(this.state)

    return (
      <div>
        <div className="header">
          <Link to={`/decks/${this.props.deckName}`}><h1>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) } - Quiz - Self Survey</h1></Link>
        </div>

        <div className="sub-header"><h2>Write In Quiz...</h2></div>

        <div className="card-container">
          { this.state.inputAnswers.length < this.state.questions.length ? 
              <form className="grid" onSubmit={this.handleSubmit} key={this.state.currentCardIndex} >
                <div className="card-holder card-front">{this.state.questions[this.state.currentCardIndex].charAt(0).toUpperCase()+this.state.questions[this.state.currentCardIndex].slice(1)}</div>
                <input 
                  className="card-holder card-edit-input-back" 
                  placeholder="Enter your answer" 
                  value={this.state.currentValue} 
                  onChange={this.handleChange}
                  autoFocus
                />
                <input type="submit" className="button" />
              </form> 
              : <QuizResults 
                  correctAnswersArray={this.state.correctAnswers}
                  inputAnswersArray={this.state.inputAnswers}
                  deckName={this.state.deckName}
                  easyBucket={{}}
                  mediumBucket={{}}
                  difficultBucket={{}}
                />
          }
        </div>
      </div>
    )
  }
}

export default QuizWriteIn