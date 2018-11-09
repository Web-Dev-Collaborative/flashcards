import { createStore } from 'redux'
import { syncHistoryWithStore } from 'react-router-redux'
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

const store = createStore(rootReducer, defaultState)

export const history = syncHistoryWithStore(createBrowserHistory(), store)

if(module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}

export default store
