import React from 'react'
import { Link, Route, Switch } from 'react-router-dom'

import { Provider } from 'react-redux'

import App from './App'
import Decks from './Decks'
import Quiz from './Quiz'
import NotFound from './NotFound'

import '../styles/Root.css'

class Root extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      // Connect the redux store to the Main component's state
      // cards {}, decks {}, stats {}, routing {}
      ...this.props.store.getState(),
      ...this.props
    }
  }

  render() {
    console.log('Rendering Root')
    console.dir(this)
    return (
      <div>
        <nav className="grid-parent grid-parent-3">
          <Link to="/" className="nav-link" >Review</Link>
          <Link to="/decks" className="nav-link" >Select/Create/Edit Decks</Link>
          <Link to="/quiz" className="nav-link" >Quiz</Link>
        </nav> 
    
        <h1>
          <Link to="/">Flashcards</Link>
        </h1>
    
        <Provider store={this.state.store}>
          <Switch>
            <Route exact path="/" component={App} />
            <Route path="/decks" component={Decks} />
            <Route path="/quiz" component={Quiz} />
            <Route component={NotFound} />
          </Switch>
        </Provider>
    
        <div className="footer">
          <footer>
            &copy; 2018
          </footer>
        </div>
    
      </div>
    )
  }
}

export default Root
