// react and render
import React from 'react'
import { render } from 'react-dom'

// router and redux store and providers
import { Router, Route } from 'react-router-dom'
import { Provider } from 'react-redux'

import store, { history } from './store'

import registerServiceWorker from './registerServiceWorker'

import App from './routes/App'
import Decks from './routes/Decks'
import NotFound from './routes/NotFound'
import Quiz from './routes/Quiz'
import Review from './routes/Review'

// TODO Stats

import './styles/entry.css'

const routing = (
  <Provider store={store} >
    <Router history={history} >
      <Route path="/" component={App} >
        <Route path="review" component={Review} />
        <Route path="decks" component={Decks} />
        <Route path="quiz" component={Quiz} />
        <Route component={NotFound} />
      </Route>
    </Router>
  </Provider>
)

render(routing, document.getElementById("root"))
registerServiceWorker()
