import React from 'react'
import axios from 'axios'

// bind the action creators to be dispatched on submit/click/other events described in the component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/actionCreators'

import Review from '../components/Review'

import '../styles/reset.css'
import '../styles/App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // ...props,
      // ...this.props.store.getState()
      isLoading: false,
      flashcardFrontShowing: true
    }
  }

  flipCard = () => {
    this.setState({ flashcardFrontShowing: !this.props.flashcardFrontShowing })
  }

  // showPreviousCard = () => {
  //   if (this.props.currentCardIndex <= 0) return
  //   this.setState({ 
  //     currentCardIndex: this.props.currentCardIndex - 1,
  //     flashcardFrontShowing: true 
  //   })
  // }

  // showNextCard = () => {
  //   if (this.props.currentCardIndex >= this.props.keysArray.length - 1) return
  //   this.setState({ 
  //     currentCardIndex: this.props.currentCardIndex + 1,
  //     flashcardFrontShowing: true
  //   })
  // }

  onKeyDown = e => {
    // console.log(e.keyCode + ' pressed');
    if (e.keyCode === 27) this.toggleOptionsMenu()
  }

  componentWillMount = () => {
      document.addEventListener("keydown", this.onKeyDown);
  }

  componentDidUpdate = () => {
    // when the component updates, save to localStorage
    localStorage.setItem('usarneme_flashcards', JSON.stringify(this.props))
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

      console.log('DEBUG BREAK in App.js retrieving local storage item')
      console.dir(decks)

      this.setState({
        decks,
        stats,
        // default deck is Spanish if no other current deck name is set
        currentDeckName: currentDeckName || 'spanish',
        currentDeck: decks[currentDeckName] || decks['spanish'],
        // TODO FIX
        // keysArray: Object.keys(decks[currentDeckName]) || Object.keys(decks['spanish']) || [],
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
    // console.log('Rendering App with this: ')
    // console.dir(this)
    // if the card decks haven't loaded, don't attempt to render. wait for loading to finish.
    if (!Object.keys(this.props.decks).length > 0) return null

    return (
      <div className="main">

        { this.props.currentDeckName ? 
          <div 
            className="small">Deck: {this.props.currentDeckName.charAt(0).toUpperCase() + this.props.currentDeckName.slice(1)}
          </div> : '' 
        }

        {/* <Review 
          currentCardIndex={this.props.currentCardIndex}
          currentDeck={this.props.currentDeck}
          flashcardFrontShowing={this.props.flashcardFrontShowing}
          flipCard={this.flipCard} 
          keysArray={this.props.keysArray}
          showNextCard={this.showNextCard}
          showPreviousCard={this.showPreviousCard}
        />  */}

      </div> //end of main
    )
  }
}

// use redux to connect the application with the store/state
const mapStateToProps = (state) => {
  console.log('App.js mapping state to props with state: ')
  console.dir(state)
  return {
    ...state
  }
}

// redux to dispatch actions taken in components to the action creators/reducers defined to update the redux store
const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(App)