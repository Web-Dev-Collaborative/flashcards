import React from 'react'
import axios from 'axios'

// bind the action creators to be dispatched on submit/click/other events described in the component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// allows the react router to connect to the redux store as React-Router-4 does not have browserHistory
// see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
// and: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
import { withRouter } from 'react-router-dom'

import * as actionCreators from '../actions/actionCreators'

import Review from '../components/Review'

import '../styles/reset.css'
import '../styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: false,
      decks: {},
      stats: {},
      flashcardFrontShowing: true,
      currentDeck: {},
      currentDeckName: '',
      keysArray: [],
      currentCardIndex: 0,
      // Options and other component display booleans
      deckCreatorShowing: false,
      ...props
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.state.flashcardFrontShowing })
  }

  addDeck = deck => {
    // Validate deck has a name and cards and that the name is not a duplicate
    if (!deck.name) return
    if (!deck.cards) return
    // duplicate name 
    const currentDeckNames = Object.keys(this.state.decks)
    if (currentDeckNames.includes(deck.name)) {
      alert('You already have a deck by that name. Try another name.')
      return
    }
    const tmpDecks = {...this.state.decks, [deck.name]: deck.cards}
    // Update state adding the deck and making it the currently selected deck
    this.setState({ 
      decks: tmpDecks,
      currentDeck: deck.cards,
      currentDeckName: deck.name,
      currentCardIndex: 0,
      flashcardFrontShowing: true,
      keysArray: Object.keys(deck.cards),
      easyBucket: {},
      mediumBucket: {},
      difficultBucket: {},
      reviewShowing: true,
      deckCreatorShowing: false
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

  onKeyDown = e => {
    // console.log(e.keyCode + ' pressed');
    if (e.keyCode === 27) this.toggleOptionsMenu()
  }

  componentWillMount = () => {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate = () => {
    // when the component updates, save to localStorage
    localStorage.setItem('usarneme_flashcards', JSON.stringify(this.state))
  }

  componentWillUnmount = () => {
      document.removeEventListener("keydown", this.onKeyDown);
  }

  async componentDidMount() {
    this.setState({ isLoading: true })

    // Restore flashcard set from localStorage if available
    const localStorageRef = localStorage.getItem('usarneme_flashcards')

    if(localStorageRef) {
      console.log('Local storage loaded.')
      // console.dir(JSON.parse(localStorageRef))

      const decks = JSON.parse(localStorageRef).decks
      const stats = JSON.parse(localStorageRef).stats
      const currentDeckName = JSON.parse(localStorageRef).currentDeckName

      this.setState({
        decks,
        stats,
        // default deck is Spanish if no other current deck name is set
        currentDeckName: currentDeckName || 'spanish',
        currentDeck: decks[currentDeckName] || decks['spanish'],
        keysArray: Object.keys(decks[currentDeckName]) || Object.keys(decks['spanish']),
        isLoading: false
      })
      return
    }
    console.log('localstorage unavailable. loading remote decks')
    try {
      const result = await axios.get('./FlashcardSets.json')
      this.setState({
        decks: result.data.flashcards,
        // default deck is Spanish
        currentDeckName: 'spanish',
        currentDeck: result.data.flashcards['spanish'],
        keysArray: Object.keys(result.data.flashcards['spanish']),
        isLoading: false
      })
    } catch (error) {
      console.error(error)
      this.setState({
        error,
        isLoading: false
      })
    }
  }

  render() {
    // if the card decks haven't loaded, don't attempt to render. wait for loading to finish.
    if (!Object.keys(this.state.decks).length > 0) return null

    return (
      <div className="main">

        { this.state.currentDeckName ? 
          <div 
            className="small">Deck: {this.state.currentDeckName.charAt(0).toUpperCase() + this.state.currentDeckName.slice(1)}
          </div> : '' 
        }

        <Review 
          currentCardIndex={this.state.currentCardIndex}
          currentDeck={this.state.currentDeck}
          flashcardFrontShowing={this.state.flashcardFrontShowing}
          flipCard={this.flipCard} 
          keysArray={this.state.keysArray}
          showNextCard={this.showNextCard}
          showPreviousCard={this.showPreviousCard}
        /> 

      </div> //end of main
    )
  }
}

// use redux to connect the store/state to props useable by this component
const mapStateToProps = (state) => {
  return {
    decks: state.decks,
    stats: state.stats
  }
}

// redux to dispatch actions taken in components to the action creators/reducers defined to update the redux store
const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default withRouter(connect(mapStateToProps, mapDispachToProps)(App))