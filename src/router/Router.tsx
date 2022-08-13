import * as React from 'react'
import { Routes, Route, Location } from 'react-router-dom'
import { RoutePathes } from './routes'

const Home = React.lazy(() => import('../pages/home/Home'))
const NotFound = React.lazy(() => import('../pages/NotFound/NotFound'))
const Cryptocurrency = React.lazy(() => import('../pages/Cryptocurrency/Cryptocurrency'))

interface IAppRouterProps {
  location: Location
}

function AppRouter({ location: appLocation }: IAppRouterProps) {
  return (
    <Routes location={appLocation}>
      <Route
        path={RoutePathes.Home}
        element={
          <React.Suspense fallback={<>error</>}>
            <Home />
          </React.Suspense>
        }
      />
      <Route
        path={RoutePathes.Cryptocurrency}
        element={
          <React.Suspense fallback={<>error</>}>
            <Cryptocurrency />
          </React.Suspense>
        }
      />
      <Route
        path={RoutePathes.None}
        element={
          <React.Suspense fallback={<>error</>}>
            <NotFound />
          </React.Suspense>
        }
      />
    </Routes>
  )
}

export default AppRouter
