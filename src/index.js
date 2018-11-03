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
        <NavLink exact className="nav-link" activeClassName="active" to="/">Home</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/decks">Decks</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/quiz">Quiz</NavLink>
        <NavLink className="nav-link" activeClassName="active" to="/review">Review</NavLink>
      </nav>

      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/decks" component={Decks} />
        <Route path="/quiz" component={Quiz} />
        <Route path="/review" component={Review} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

ReactDOM.render(routing, document.getElementById("root"))
registerServiceWorker()
