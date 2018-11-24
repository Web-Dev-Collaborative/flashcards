import React from 'react'

const Create = () => {
  return (
    <div className="create">
      <div className="header"><h1>Create a deck</h1></div>

      <div className="break"></div>

      <form className="main sub-header">
        <input placeholder='Name:' />
        <input placeholder='Optional Description' />
        <input placeholder='Card 1 Front' />
        <input placeholder='Card 1 Back' />
      </form>
    </div>
  )
}

export default Create