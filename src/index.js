import React from 'react'
import { render } from 'react-dom'
import { BrowserRouter as Router } from 'react-router-dom'

import Root from './containers/Root'

// redux store provider
import store from './store'

import registerServiceWorker from './registerServiceWorker'

render(
  <Router>
    <Root store={store} />
  </Router>,
  document.getElementById('root')
)

registerServiceWorker()
