import * as React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import App from './app/App'

import './global.scss'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000 * 60,
      cacheTime: Infinity,
    },
  },
})

render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <Router>
        <App />
      </Router>
    </QueryClientProvider>
  </Provider>,
  document.getElementById('root'),
)
