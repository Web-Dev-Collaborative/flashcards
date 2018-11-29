import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import EditDeck from '../components/EditDeck'

const Create = (props) => {

  const validateAndSubmit = (e) => {
    console.log('validateAndSubmit submitted',e.target)
    e.stopPropagation()
    e.preventDefault()
    // TODO
    // Validate inputs
    // ...
    // Redirect to EditDeck component, passing inputs as props
    return <Switch>
      <Redirect push from='create/' to='create/:deckId/edit' />
      <Route 
        path='create/:deckId/edit' 
        render={() => 
          <EditDeck 
            deckName='TODO' 
            deck='TODO' 
            saveDeckChanges={props.saveDeckChanges} 
            deleteDeck={props.deleteDeck} 
          />}
      />
    </Switch>
  }
  
  return (
    <div className="create">
      <div className="header"><h1>Create a deck</h1></div>

      <div className="break"></div>

      <div className="main">
        <form className="grid sub-header" onSubmit={validateAndSubmit}>
          <input placeholder='Name:' />
          <input placeholder='Optional Description' />
          <input type="submit" />
        </form>
      </div>

    </div>
  )
}

export default Create