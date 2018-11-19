import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import Card from '../Card'
import Survey from '../Survey'

class QuizSurveyWithBuckets extends React.Component {
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
      remainingCardsArray: [],
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

  moveCardToBucket = (cardFront, bucket) => {
    // console.log('moving '+cardFront+' to bucket '+bucket)
    // prevents undefined/blank cards from being added to the bucket object
    if (cardFront === undefined) return
    // Copy the current deck of flashcards in use
    let tmpDeck = {...this.state.deck}
    // remove the card from the copy
    delete tmpDeck[cardFront]
    // Copy the object of the current bucket being selected (easy, medium, difficult) 
    // and append the new card to being added to that bucket
    let tmpBucket = {...this.state[bucket], [cardFront]: this.state.deck[cardFront]},
        // adjust the current card index number, defaults to 0 
        adjustedCardIndex = 0
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
      currentDeck: tmpDeck,
      remainingCardsArray: Object.keys(tmpDeck),
      cardFrontShowing: true,
      currentCardIndex: adjustedCardIndex
    })
  }

  componentDidMount() {
    this.setState({
      isLoading: false,
      remainingCardsArray: Object.keys(this.props.deck)
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
          <Card 
            flipCard={this.flipCard}
            frontShowing={this.state.cardFrontShowing}
            front={front}
            back={this.state.deck[front]}
          />

          { // The Survey only displays when the back of the card is showing
            !this.state.cardFrontShowing ? 
              // if the front is NOT showing and there are more cards in the current flashcard deck...
              this.state.remainingCardsArray.length > 0 ?
                // display the survey
                <Survey 
                  front={front}
                  moveCardToBucket={this.moveCardToBucket} 
                /> 
              : '' 
            : ''
          }
        </div>

      </div>
    )
  }
}

export default QuizSurveyWithBuckets