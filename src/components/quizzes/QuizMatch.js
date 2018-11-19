import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Card from '../Card'

class QuizMatch extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentCardIndex: 0,
      cardFrontShowing: true,
      // Buckets to hold cards while working through a set, categorized by difficulty
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {},
      remainingCards: [],
      ...props
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  flipCard = () => {
    console.log('flipCard clicked')
    this.setState({
      cardFrontShowing: !this.state.cardFrontShowing
    })
  }


  componentDidMount() {
    this.setState({
      isLoading: false,
      remainingCards: Object.keys(this.props.deck)
    })
  }

  render() {
    if (this.state.isLoading) return ''
    console.log('Rendering QuizMatch')
    console.dir(this.state)

    console.log('this.state.remainingCards: '+this.state.remainingCards+'. this.state.currentCardIndex: '+this.state.currentCardIndex)
    const front = this.state.remainingCards[this.state.currentCardIndex]
    console.log('front: ',front)

    return (
      <div>
        <div className="header">
          <Link to={`/decks/${this.props.deckName}`}><h1>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) } - Quiz - Self Survey</h1></Link>
        </div>

        <div className="grid card-container">
          <Card 
            flipCard={this.flipCard}
            frontShowing={this.state.cardFrontShowing}
            front={front}
            back={this.state.deck[front]}
          />
        </div>

      </div>
    )
  }
}

export default QuizMatch