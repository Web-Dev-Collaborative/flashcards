import React from 'react'
import { Link, NavLink } from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
      <div>
       <nav>
          <NavLink exact to="/" className="nav-link" activeClassName="active">Home</NavLink>
          <NavLink to="/review" className="nav-link" activeClassName="active">Review</NavLink>
          <NavLink to="/decks" className="nav-link" activeClassName="active">Decks</NavLink>
          <NavLink to="/quiz" className="nav-link" activeClassName="active">Quiz</NavLink>
        </nav> 

        <h1>
          <Link to="/">Flashcards</Link>
        </h1>
        {/* {React.cloneElement({...this.props}.children, {...this.props})} */}
        {console.log('rendering Main')}
        {console.dir(this)} 
      </div>
    )
  }
}

export default Main
