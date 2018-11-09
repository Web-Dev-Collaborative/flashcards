import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import decks from './decks'
import cards from './cards'
import stats from './stats'

// combines the reducers for the decks, cards, and react router (also holds routing history in state)
const rootReducer = combineReducers({ decks, cards, stats, routing: routerReducer })

export default rootReducer