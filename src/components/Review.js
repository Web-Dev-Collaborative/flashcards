import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import Card from './Card'

import '../styles/Review.css'

const Review = props => {
  return (
    <div className="flashcards-container">
      { props.hideArrows ? 
        // Last/Next Card Arrow buttons are hidden when doing the Quiz
        <div></div> :
        <img 
          alt="Previous Card"
          className="controls controls-div controls-prev prev"
          style={ { transform: 'rotate(180deg)' } }
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
          onClick={props.showPreviousCard} 
        />      
      }

      { // if there are more cards to be reviewed
        props.keysArray.length > 0 ? 
        <Card 
          frontShowing={props.flashcardFrontShowing} 
          front={Object.keys(props.currentDeck)[props.currentCardIndex]}
          back={props.currentDeck[Object.keys(props.currentDeck)[props.currentCardIndex]]}
          flipCard={props.flipCard}
        /> 
      :
        <div className="grid-parent no-cards-div">
          <h3>Great job!</h3>
          <p>You have completed the quiz!</p>
          <Link to='/results'>See Results</Link>
          <Link to='/deckChooser'>Select Another Deck</Link>
        </div>
      }

      { props.hideArrows ? 
        <div></div> :
        <img 
          alt="Next Card"
          className="controls controls-div controls-next next"
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
          onClick={props.showNextCard} 
        />
      }
    </div>
  )
}

Review.propTypes = {
  currentDeck: PropTypes.object.isRequired,
  currentCardIndex: PropTypes.number.isRequired,
  flashcardFrontShowing: PropTypes.bool.isRequired,
  flipCard: PropTypes.func.isRequired, 
  hideArrows: PropTypes.bool,
  keysArray: PropTypes.array.isRequired,
  showNextCard: PropTypes.func.isRequired,
  showPreviousCard: PropTypes.func.isRequired
}

export default Review