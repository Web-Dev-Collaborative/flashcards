import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import decks from './decks'
import cards from './cards'
import stats from './stats'
import uiState from './uiState'

// combines the reducers for the decks, cards, and react router (also holds routing history in state)
const rootReducer = combineReducers({ decks, cards, stats, uiState, routing: routerReducer })

export default rootReducer