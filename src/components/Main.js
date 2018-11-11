import React from 'react'
import { Link } from 'react-router-dom'

import Flashcards from './Flashcards'

class Main extends React.Component {
  render() {
    return (
      <div>
        <h1>
          <Link to="/">Flashcards</Link>
        </h1>
        {console.log('rendering Main')}
        {console.dir(this.props)}

        <Flashcards {...this.props} />
        {/* {React.cloneElement({...this.props}.children, {...this.props})} */}

      </div>
    )
  }
}

export default Main
