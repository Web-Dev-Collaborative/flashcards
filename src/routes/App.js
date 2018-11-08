// bind the action creators to be dispatched on submit/click/other events described in the component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// // allows the react router to connect to the redux store
// // React-Router-4 does not have browserHistory
// // see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
// import { withRouter } from 'react-router-dom'

import * as actionCreators from '../actions/actionCreators'

import Main from '../components/Main'

// use redux to connect the store/state to props useable by this component
const mapStateToProps = (state) => {
  return {
    decks: state.decks,
    stats: state.stats
  }
}

// redux to dispatch actions taken in components to the action creators/reducers defined to update the redux store
const mapDispachToProps = (dispatch) => {
  return bindActionCreators(actionCreators, dispatch)
}

const App = connect(mapStateToProps, mapDispachToProps)(Main)
// const App = withRouter(connect(mapStateToProps, mapDispachToProps)(Main))

export default App