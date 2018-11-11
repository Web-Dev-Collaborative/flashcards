import React from 'react'
import { Link, NavLink, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from './App'
import Decks from './Decks'
import Quiz from './Quiz'
import NotFound from './NotFound'

const Root = ({ store }) => (
  <div>
    <nav className="grid-parent grid-parent-3">
      <NavLink to="/" className="nav-link" activeClassName="active">Review</NavLink>
      <NavLink to="/decks" className="nav-link" activeClassName="active">Select/Create/Edit Decks</NavLink>
      <NavLink to="/quiz" className="nav-link" activeClassName="active">Quiz</NavLink>
    </nav> 

    <h1>
      <Link to="/">Flashcards</Link>
    </h1>

    <Provider store={store}>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/decks" component={Decks} />
        <Route path="/quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
    </Provider>
  </div>
)

export default Root
