import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

const deckNameRef = React.createRef()
const optionalDescriptionRef = React.createRef()

const Create = (props) => {
  console.log('Rendering Create')
  console.dir(props.decks)

  // Validate a deck name is provided (not blank) and that it is not a duplicate deck name
  const validateAndSubmit = (e) => {
    console.log('validateAndSubmit start')
    e.stopPropagation()
    e.preventDefault()

    // Validate inputs
    console.log('Validating deck named: ',deckNameRef.current.value)
    if (!deckNameRef.current.value) {
      alert('No deck name provided. Please enter a name for the new deck.')
      return
    }
    const deckName = deckNameRef.current.value
    let description = ''

    console.log('Validating optional description of: ',optionalDescriptionRef.current.value)
    if (optionalDescriptionRef.current.value) description = optionalDescriptionRef.current.value

    console.log('Validation complete. Adding deck to state.')
    // Add the deckName to the decks in the application's state
    props.addDeck(deckName, description)
  }
  
  return (
    <div className="create">
      <div className="header"><h1>Create a deck</h1></div>

      <div className="break"></div>

      <div className="main">
        <form className="grid sub-header" onSubmit={validateAndSubmit}>
          <input ref={deckNameRef} placeholder='Name:' />
          <input ref={optionalDescriptionRef} placeholder='Optional Description' />
          <input className="button" type="submit" value="Create Deck" />
        </form>
      </div>

    </div>
  )
}

Create.propTypes = {
  decks: PropTypes.object.isRequired,
  addDeck: PropTypes.func.isRequired
}

// withRouter HOC used to allow pushing a redirect to the history prop after the new deck is named and the form submitted
export default withRouter(Create)