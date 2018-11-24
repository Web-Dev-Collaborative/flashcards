import React from 'react'
import { Switch, Route, NavLink } from 'react-router-dom'
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
    this.save = this.save.bind(this)
  }

  save(args) {
    console.log('Save clicked')
    console.log('this.state:',args)
    console.dir(args.target)
  }

  componentDidMount() {
    console.log('CDM start')
    this.setState({ isLoading: true })

    // Restore flashcard set from localStorage if available
    const localStorageRef = localStorage.getItem('usarneme_flashy')

    // Ensure it's not just passing an empty object {}
    if(localStorageRef && _.isEmpty(localStorageRef) !== true) {
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

  componentDidUpdate = () => {
    console.log('CDU saving to localStore')
    console.dir(this.state)
    // when the component updates, save to localStorage
    localStorage.setItem('usarneme_flashy', JSON.stringify(this.state))
  }

  render() {
    console.log('Rendering App')
    console.dir(this)

    // don't render while state is being loaded via componentDidMount
    if (this.state.isLoading) return ''

    return (
      <div>
        <Switch>
          <Route exact path="/" render={() => <Home decks={this.state.decks} />} />
          <Route exact path="/decks" render={() => <Decks decks={this.state.decks} />} />
          <Route path="/decks/:deckName" render={() => <DeckHome decks={this.state.decks} save={this.save}/>} />
          <Route path="/create" component={Create} />
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

export default App