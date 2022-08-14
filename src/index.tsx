import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './app/App'

import './global.scss'

render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
)
