// react and render
import React from 'react'
import { render } from 'react-dom'

// router and redux store and providers
import { Router, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import Decks from './routes/Decks'
import NotFound from './routes/NotFound'
import Quiz from './routes/Quiz'
import Review from './routes/Review'

import store, { history } from './store'

import App from './routes/App'

import registerServiceWorker from './registerServiceWorker'

// TODO Stats

import './styles/entry.css'

const routing = (
  <Provider store={store} >
    <Router history={history} >
      <Switch>
        <Route path="/" component={App} />
        <Route path="review" component={Review} />
        <Route path="decks" component={Decks} />
        <Route path="quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  </Provider>
)

render(routing, document.getElementById("root"))
registerServiceWorker()
