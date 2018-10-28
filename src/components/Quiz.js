import React from 'react'
import PropTypes from 'prop-types'

import Review from './Review'
import Survey from './Survey'

const Quiz = props => {
  return (
    <div className="quiz">
      <h3>Quiz!</h3>
      <Review 
        currentCardIndex={props.currentCardIndex}
        currentDeck={props.currentDeck}
        flashcardFrontShowing={props.flashcardFrontShowing}
        flipCard={props.flipCard} 
        keysArray={props.keysArray}
        showNextCard={props.showNextCard}
        showPreviousCard={props.showPreviousCard}
      />

      { // The Survey only displays when the back of the card is showing
        !props.flashcardFrontShowing ? 
          // if the front is NOT showing and there are more cards in the current flashcard deck...
          props.keysArray.length > 0 ?
            // display the survey
            <Survey 
              front={Object.keys(props.currentDeck)[props.currentCardIndex]}
              moveCardToBucket={props.moveCardToBucket} 
            /> 
          : '' 
        : ''
      }
    </div>
  )
}

Quiz.propTypes = {
  currentCardIndex: PropTypes.number,
  currentDeck: PropTypes.object,
  flashcardFrontShowing: PropTypes.bool,
  flipCard : PropTypes.func,
  keysArray: PropTypes.array,
  moveCardToBucket: PropTypes.func,
  showNextCard: PropTypes.func,
  showPreviousCard: PropTypes.func
}

export default Quiz