import React from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'

// redux store and store Provider
import { Provider } from 'react-redux'
import store from '../store'

import App from './App'
import Decks from './Decks'
import Quiz from './Quiz'
import NotFound from './NotFound'

import '../styles/Root.css'

class Root extends React.Component {
  render() {
    // React 16+ does not require a containing element for adjacent JSX elements, rather an array can be returned
    // Note: to return an array of elements, each element must be separated by a comma (array style formatting)
    return [
      <nav key={1} className="grid-parent grid-parent-3">
        <NavLink activeClassName="active" exact to="/" className="nav-link" >Review</NavLink>
        <NavLink activeClassName="active" exact to="/decks" className="nav-link" >Select/Create/Edit Decks</NavLink>
        <NavLink activeClassName="active" exact to="/quiz" className="nav-link" >Quiz</NavLink>
      </nav>,
  
      <h1 key={2}>
        <Link to="/">Flashcards</Link>
      </h1>,
  
      <Provider key={3} store={store}>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/decks" component={Decks} />
          <Route path="/quiz" component={Quiz} />
          <Route component={NotFound} />
        </Switch>
      </Provider>,
  
      <div key={4} className="footer">
        <footer>
          &copy; 2018
        </footer>
      </div>
    ]
  }
}

export default Root
