import React from 'react'
import { Switch, Route, NavLink, withRouter } from 'react-router-dom'
import _ from 'lodash'

import Create from './routes/Create'
import Decks from './routes/Decks'
import Home from './routes/Home'
import NotFound from './routes/NotFound'
import DeckHome from './components/DeckHome'

import savedDecks from './decks'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      ...props
    }
    this.saveDeckChanges = this.saveDeckChanges.bind(this)
  }

  // Save deck state to localStorage
  saveDeckChanges = () => {
    console.log('Saving decks to local storage')
    localStorage.setItem('usarneme_flashy', JSON.stringify(this.state))
  }

  // Delete deck confirmation is handled by the button that passes the 
  // command up the prop chain to this App class which controls the state
  deleteDeck = (deckName) => {
    console.log('deleteDeck named: ',deckName)
    // remove the deck from state
    this.setState({
      // filter and only return decks that do not match the provided deckName
      decks: _.pickBy(this.state.decks, (cards, deck) => {
        if (deck !== deckName) {
          return deck
        }
      })
    })
    // and redirect to the decks page
    console.log('Deletion complete. Redirecting to /decks')
    this.props.history.push('/decks')
  }

  // Load the default decks provided with the application
  // @param ignoreLocalStorage : boolean if localStorage should be checked or not
  loadDefaultDecks = (ignoreLocalStorage) => {
    console.log('loading default decks')
    this.setState({ isLoading: true })

    if (ignoreLocalStorage === undefined) {
      console.log('ignoreLocalStorage passed as undefined, setting to false (do not ignore/ie check localStorage)')
      ignoreLocalStorage = false
    }

    // Restore flashcard set from localStorage if available
    const localStorageRef = localStorage.getItem('usarneme_flashy')

    // Ensure it's not just passing an empty object {}
    if (!ignoreLocalStorage && localStorageRef && _.isEmpty(localStorageRef) !== true) {
      console.log('Local storage loaded.')
      console.dir(JSON.parse(localStorageRef))

      const decks = JSON.parse(localStorageRef).decks
      const stats = JSON.parse(localStorageRef).stats

      this.setState({
        decks,
        stats,
        isLoading: false
      })
      return
    }
    console.log('localstorage unavailable. loading saved decks')
    try {
      this.setState({
        // savedDecks are the loaded import from decks.js file
        decks: savedDecks,
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

  componentDidMount() {
    console.log('CDM start')
    this.loadDefaultDecks()
    console.log('CDM end')
  }

  render() {
    console.log('Rendering App')
    console.dir(this)

    // don't render while state is being loaded via componentDidMount
    if (this.state.isLoading) return ''

    // After loading... save deck state to localStorage
    this.saveDeckChanges()

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home decks={this.state.decks} />} />
          <Route exact path="/decks" render={() => <Decks decks={this.state.decks} loadDefaultDecks={this.loadDefaultDecks} />} />
          <Route path="/decks/:deckName" render={() => 
            <DeckHome 
              decks={this.state.decks} 
              saveDeckChanges={this.saveDeckChanges}
              addNewCard={this.addNewCard}
              deleteCard={this.deleteCard} 
              deleteDeck={this.deleteDeck} 
            />} 
          />
          <Route path="/create" render={() => <Create saveDeckChanges={this.saveDeckChanges} deleteDeck={this.deleteDeck} />} />
          <Route component={NotFound} />
        </Switch>

        <div className="break"></div>

        <nav className="nav footer">
          <NavLink className="nav-link" exact activeClassName="active-nav-link" to="/">Home</NavLink>
          <NavLink className="nav-link" activeClassName="active-nav-link" to="/decks">Decks</NavLink>
          <NavLink className="nav-link" activeClassName="active-nav-link" to="/create">Create</NavLink>
        </nav>
      </div>
    )  
  }
}

// withRoute HOC allows access to the route data in this.props. Utilized in:
  // deleteDeck function for redirecting after deleting a deck (no sense in rendering EditDeck with no deck selected)
export default withRouter(App)