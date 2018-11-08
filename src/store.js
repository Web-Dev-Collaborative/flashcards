import { createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'

// React Router v4 does not have browserHistory
// import { browserHistory } from 'react-router'

import { createBrowserHistory } from 'history';

// import the root reducer
import rootReducer from './reducers/index'

// import the default data
import decks from './data/decks'
import stats from './data/stats'

// create an object for the default data
const defaultState = {
  decks,
  stats
}

const customHistory = createBrowserHistory()

const store = createStore(rootReducer, defaultState)

export const history = syncHistoryWithStore(customHistory, store)

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
