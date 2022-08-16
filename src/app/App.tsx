import * as React from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router'
import Header from '../components/Header/Header'
import { useLocalStorage } from '../hooks/useLocalStorage'
import { loadUserData } from '../redux/actions/user-data.actions'
import { initialState } from '../redux/initialStates'
import AppRouter from '../router/Router'

import './App.scss'

function App() {
  const [userData] = useLocalStorage('userData', initialState.userData);
  const dispatch = useDispatch()
  const location = useLocation()

  React.useEffect(() => {
    dispatch(loadUserData(userData))
  }, [dispatch]);

  return (
    <>
      <Header />
      <main className='main'>
        <article className='router-layer'>
          <AppRouter location={location} />
        </article>
      </main>
    </>
  )
}

export default App
