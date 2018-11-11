import React from 'react'
// bind the action creators to be dispatched on submit/click/other events described in the component
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

// allows the react router to connect to the redux store as React-Router-4 does not have browserHistory
// see: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/redux.md
// and: https://github.com/ReactTraining/react-router/blob/master/packages/react-router/docs/guides/blocked-updates.md
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

// const App = connect(mapStateToProps, mapDispachToProps)(Main)
class App extends React.Component {
  render() {
    console.log('Rendering App')
    console.dir(this)
    return (
      <div>
       <nav>
          <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/review" className="nav-link" activeClassName="active">Review</NavLink>
          <NavLink to="/decks" className="nav-link" activeClassName="active">Decks</NavLink>
          <NavLink to="/quiz" className="nav-link" activeClassName="active">Quiz</NavLink>
        </nav> 
        <Main {...this.props} />
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispachToProps)(App)