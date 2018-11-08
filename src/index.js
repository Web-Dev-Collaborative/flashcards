import React from "react"
import ReactDOM from "react-dom"
import {
  Route,
  NavLink,
  BrowserRouter,
  Switch
} from "react-router-dom"

import registerServiceWorker from './registerServiceWorker'

import App from './routes/App'
import Decks from './routes/Decks'
import NotFound from './routes/NotFound'
import Quiz from './routes/Quiz'
import Review from './routes/Review'

import './styles/entry.css'

const routing = (
  <BrowserRouter>
    <div>
      <nav>
        <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
        <NavLink to="/review" className="nav-link" activeClassName="active">Review</NavLink>
        <NavLink to="/decks" className="nav-link" activeClassName="active">Decks</NavLink>
        <NavLink to="/quiz" className="nav-link" activeClassName="active">Quiz</NavLink>
      </nav>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/review" component={Review} />
        <Route path="/decks" component={Decks} />
        <Route path="/quiz" component={Quiz} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById("root"))
registerServiceWorker()
