import React from 'react'
import PropTypes from 'prop-types'

// bind the action creators to be dispatched on submit/click/other events described in the component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as actionCreators from '../actions/actionCreators'

import DeckChooser from '../components/DeckChooser'
import DeckCreator from '../components/DeckCreator'
import DeckEditor from '../components/DeckEditor'

const Decks = props => {
  console.dir('Rendering decks')
  console.dir(props)
  return (
    <div>
      <DeckCreator addDeck={props.addDeck} currentDeckName={props.currentDeckName} allDeckNames={Object.keys(props.decks)} />
      {/* <DeckChooser />
      <DeckEditor />       */}
    </div>
  )
}

Decks.propTypes = {
  decks: PropTypes.object.isRequired
}

// use redux to connect the application with the store/state
const mapStateToProps = (state) => {
  return {
    decks: state.decks,
    stats: state.stats,
    isLoading: false,
    currentDeck: state.decks['spanish'],
    currentDeckName: 'spanish'
  }
}

// redux to dispatch actions taken in components to the action creators/reducers defined to update the redux store
const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

export default connect(mapStateToProps, mapDispachToProps)(Decks)
