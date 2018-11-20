import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Card from '../Card'
import Survey from './Survey'
import QuizResults from './QuizResults'

class QuizSurveyWithBuckets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      currentCardIndex: 0,
      cardFrontShowing: true,
      // Buckets to hold cards while working through a set, categorized by difficulty
      workingDeck: {...props.deck},
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {},
      remainingCardsArray: [],
      quizComplete: false,
      ...props
    }
  }

  static propTypes = {
    deckName: PropTypes.string.isRequired,
    deck: PropTypes.object.isRequired
  }

  flipCard = () => {
    this.setState({
      cardFrontShowing: !this.state.cardFrontShowing
    })
  }

  moveCardToBucket = (cardFront, bucket) => {
    console.log('moving '+cardFront+' to bucket '+bucket)
    // prevents undefined/blank cards from being added to the bucket object
    if (cardFront === undefined) return
    // Copy the current/working deck of flashcards in use
    let tmpDeck = {...this.state.workingDeck}
    // remove the card from the copy
    delete tmpDeck[cardFront]
    // Copy the object of the current bucket being selected (easy, medium, difficult) 
    // and append the new card to being added to that bucket
    let tmpBucket = {...this.state[bucket], [cardFront]: this.state.workingDeck[cardFront]},
        // adjust the current card index number, defaults to 0 
        adjustedCardIndex = 0

    console.log('tmpBucket')
    console.dir(tmpBucket)

    // if it's not already 0...
    if (this.state.currentCardIndex > 0) {
      // to one less than the previous current card index as a card was removed and put in a bucket 
      adjustedCardIndex = this.state.currentCardIndex - 1
    }
    // Set the state changes 
    // add the card to the easy/medium/difficult bucket
    // replace the current deck with the copy where the card was removed
    // update the keys array so we aren't attempting to select a card from the currentDeck that was removed
    // set the front of the card as showing before rendering the next card in the currentDeck
    this.setState({
      [bucket]: tmpBucket,
      workingDeck: tmpDeck,
      remainingCardsArray: Object.keys(tmpDeck),
      cardFrontShowing: true,
      currentCardIndex: adjustedCardIndex
    })
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      remainingCardsArray: Object.keys(this.state.workingDeck)
    })
  }

  render() {
    if (this.state.isLoading) return ''
    console.log('Rendering QuizSurveyWithBuckets')
    console.dir(this.state)

    // console.log('this.state.remainingCardsArray: '+this.state.remainingCardsArray+'. this.state.currentCardIndex: '+this.state.currentCardIndex)
    const front = this.state.remainingCardsArray[this.state.currentCardIndex]
    // console.log('front: ',front)

    return (
      <div>
        <div className="header">
          <Link to={`/decks/${this.props.deckName}`}><h1>{ this.props.deckName.charAt(0).toUpperCase()+this.props.deckName.slice(1) } - Quiz - Self Survey</h1></Link>
        </div>

        <div className="grid card-container">
          { // if there are no further questions, display the quiz results
            this.state.remainingCardsArray.length <= 0 
            ? <QuizResults 
                easyBucket={this.state.easyBucket}
                mediumBucket={this.state.mediumBucket}
                difficultBucket={this.state.difficultBucket}
                deckName={this.state.deckName}
              /> 
            : 
            [ // if there are further cards, display the card
              <Card 
                key={1}
                flipCard={this.flipCard}
                frontShowing={this.state.cardFrontShowing}
                front={front}
                back={this.state.workingDeck[front]}
              />,
              // The Survey only displays when the back of the card is showing
              !this.state.cardFrontShowing ? 
                <Survey 
                  key={2}
                  front={front}
                  moveCardToBucket={this.moveCardToBucket} 
                /> 
              : ''
            ]
          }
        </div>

      </div>
    )
  }
}

export default QuizSurveyWithBuckets