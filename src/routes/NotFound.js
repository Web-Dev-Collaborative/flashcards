import React from 'react'

import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <div className="header"><h1>Not Found</h1></div>

      <div className="break"></div>

      <div className="main sub-header"><h2>Page Not Found</h2></div>

      <div className="grid">
        <Link className="button" to="/">Return to Flashy</Link>
      </div>
    </div>
  )
}

export default NotFound