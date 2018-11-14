import React from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/actionCreators'

import Card from './Card'

import '../styles/Review.css'

class Review extends React.Component {
  static propTypes = {
    currentDeck: PropTypes.object.isRequired,
    currentCardIndex: PropTypes.number.isRequired,
    hideArrows: PropTypes.bool,
    keysArray: PropTypes.array.isRequired
  }

  showPreviousCard = () => {
    if (this.props.uiState.currentCardIndex <= 0) return
    this.setState({ 
      uiState: { currentCardIndex: this.props.uiState.currentCardIndex - 1 },
      flashcardFrontShowing: true 
    })
  }

  showNextCard = () => {
    if (this.props.uiState.currentCardIndex >= this.props.uiState.keysArray.length - 1) return
    this.setState({ 
      uiState: { currentCardIndex: this.props.uiState.currentCardIndex + 1 },
      flashcardFrontShowing: true
    })
  }

  render() {
    console.log('Rendering Review')
    console.dir(this)
    return (
      <div className="flashcards-container">
        { this.props.hideArrows ? 
          // Last/Next Card Arrow buttons are hidden when doing the Quiz
          <div></div> :
          <img 
            alt="Previous Card"
            className="controls controls-div controls-prev prev"
            style={ { transform: 'rotate(180deg)' } }
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
            onClick={this.showPreviousCard} 
          />      
        }
  
        { // if there are more cards to be reviewed
          this.props.keysArray.length > 0 ? 
          <Card 
            frontShowing={this.props.flashcardFrontShowing} 
            front={Object.keys(this.props.currentDeck)[this.props.currentCardIndex]}
            back={this.props.currentDeck[Object.keys(this.props.currentDeck)[this.props.currentCardIndex]]}
            flipCard={'this.props.store.flipCard'}
          /> 
        :
          <div className="grid-parent no-cards-div">
            <h3>Great job!</h3>
            <p>You have completed the quiz!</p>
            <Link to='/stats'>See Results</Link>
            <Link to='/decks'>Select Another Deck</Link>
          </div>
        }
  
        { this.props.hideArrows ? 
          <div></div> :
          <img 
            alt="Next Card"
            className="controls controls-div controls-next next"
            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAACTSURBVGhD7dmxDYQwEERRJ3RAIVQIVEVCEfRDArOBM8sissbmP2miS7zSv4gEAL8za4d2VrZoXdi0p7JLmzR78ch4bOmIvDi2C5HPrZWOiMVvJNYaibkiMUck5ojEXJGYIxJzRGKOhjjkS1q7Zm/VSo/P6+LPTlJOSMoFSTkhKSck5YKknJCUkyGSGupjKAC0kNILaew3BgvattYAAAAASUVORK5CYII=" 
            onClick={this.showNextCard} 
          />
        }
      </div>
    )
  }
}

// use redux to connect the application with the store/state
const mapStateToProps = (state) => {
  console.log('Review.js mapping state to props with state: ')
  console.dir(state)
  return {
    ...state
  }
}

// redux to dispatch actions taken in components to the action creators/reducers defined to update the redux store
const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(Review)

// export default Review