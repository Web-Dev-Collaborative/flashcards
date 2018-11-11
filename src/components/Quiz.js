import React from 'react'
import PropTypes from 'prop-types'

import Review from './Review'
import Survey from './Survey'

class Quiz extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentCardIndex: 0,
      currentDeck: props.currentDeck,
      flashcardFrontShowing: true,
      flipCard: props.flipCard,
      keysArray: props.keysArray,
      // Buckets to hold cards while working through a set, categorized by difficulty
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {}
    }
  }

  static propTypes = {
    currentDeck: PropTypes.object,
    keysArray: PropTypes.array,
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  moveCardToBucket = (cardFront, bucket) => {
    // console.log('moving '+cardFront+' to bucket '+bucket)
    // prevents undefined/blank cards from being added to the bucket object
    if (cardFront === undefined) return
    // Copy the current deck of flashcards in use
    let tmpDeck = {...this.state.currentDeck}
    // remove the card from the copy
    delete tmpDeck[cardFront]
    // Copy the object of the current bucket being selected (easy, medium, difficult) 
    // and append the new card to being added to that bucket
    let tmpBucket = {...this.state[bucket], [cardFront]: this.state.currentDeck[cardFront]},
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
      keysArray: Object.keys(tmpDeck),
      flashcardFrontShowing: true,
      currentCardIndex: adjustedCardIndex
    })
  }

  showPreviousCard = () => {
    if (this.state.currentCardIndex <= 0) return
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex - 1,
      flashcardFrontShowing: true 
    })
  }

  showNextCard = () => {
    if (this.state.currentCardIndex >= this.state.keysArray.length - 1) return
    this.setState({ 
      currentCardIndex: this.state.currentCardIndex + 1,
      flashcardFrontShowing: true
    })
  }

  render() {
    return (
      <div className="quiz">
        <h3>Quiz!</h3>
        <Review 
          currentCardIndex={this.state.currentCardIndex}
          currentDeck={this.state.currentDeck}
          flashcardFrontShowing={this.state.flashcardFrontShowing}
          flipCard={this.flipCard} 
          keysArray={this.state.keysArray}
          hideArrows={true}
          showNextCard={this.showNextCard}
          showPreviousCard={this.showPreviousCard}
        />

        { // The Survey only displays when the back of the card is showing
          !this.state.flashcardFrontShowing ? 
            // if the front is NOT showing and there are more cards in the current flashcard deck...
            this.state.keysArray.length > 0 ?
              // display the survey
              <Survey 
                front={Object.keys(this.state.currentDeck)[this.state.currentCardIndex]}
                moveCardToBucket={this.moveCardToBucket} 
              /> 
            : '' 
          : ''
        }
      </div>
    )
  }
}

export default Quiz