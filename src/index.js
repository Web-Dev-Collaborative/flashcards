// react and render
import React from 'react'
import { render } from 'react-dom'

// router and redux store and providers
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'

import App from './routes/App'
import Decks from './routes/Decks'
import Quiz from './routes/Quiz'
import Review from './routes/Review'
import NotFound from './routes/NotFound'

import store, { history } from './store'
// import registerServiceWorker from './registerServiceWorker'

import './styles/entry.css'

const routing = (
  <Provider store={store} >
    <BrowserRouter history={history} >
      <div>
        <Switch>
          <Route exact path="/" component={App} />
          <Route path="/decks" component={Decks} />
          <Route path="/quiz" component={Quiz} />
          <Route path="/review" component={Review} />
          <Route component={NotFound} />
        </Switch>
      </div>
    </BrowserRouter>
  </Provider>
)

render(routing, document.getElementById("root"))

// registerServiceWorker()
