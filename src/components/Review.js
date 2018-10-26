import React from 'react'
import PropTypes from 'prop-types'

import Card from './Card'

import '../styles/Review.css'

const Review = props => {
  return (
    <div className="flashcards-container">
      <img 
        alt="Previous Card"
        className="controls controls-div controls-prev prev"
        style={ { transform: 'rotate(180deg)' } }
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
        onClick={props.showPreviousCard} 
        />
      { // if there are more cards to be reviewed
        props.keysArray.length > 0 ? 
        <Card 
          frontShowing={props.flashcardFrontShowing} 
          front={Object.keys(props.currentDeck)[props.currentCardIndex]}
          back={props.currentDeck[Object.keys(props.currentDeck)[props.currentCardIndex]]}
          flipCard={props.flipCard}
        /> 
      :
      // otherwise show a default card that indicates you have finished with this deck
        <Card 
          frontShowing={props.flashcardFrontShowing} 
          front='You have run out of cards to review. Great job! Please select another deck below.'
          back='Nothing to see here. Move along.'
          flipCard={props.flipCard}
        />
      }
      <img 
        alt="Next Card"
        className="controls controls-div controls-next next"
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
        onClick={props.showNextCard} 
      />
    </div>
  )
}

Review.propTypes = {
  currentDeck: PropTypes.object.isRequired,
  currentCardIndex: PropTypes.number.isRequired,
  flashcardFrontShowing: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired, 
  keysArray: PropTypes.array.isRequired,
  showNextCard: PropTypes.func.isRequired,
  showPreviousCard: PropTypes.func.isRequired
}

export default Review