import * as React from 'react'
import { useLocation } from 'react-router'
import AppRouter from '../router/Router'

import './App.scss'

function App() {
  const location = useLocation()

  return (
    <main className='main'>
      <article className='router-layer'>
        <AppRouter location={location} />
      </article>
    </main>
  )
}

export default App
