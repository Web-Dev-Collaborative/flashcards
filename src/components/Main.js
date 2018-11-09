import React from 'react'
import { Link, NavLink } from 'react-router-dom'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Flashcards</Link>
        </h1>
        {console.log('rendering Main')}

        {/* {React.cloneElement({...this.props}.children, {...this.props})} */}

        {console.dir(this)}
      </div>
    )
  }
}

export default Main
