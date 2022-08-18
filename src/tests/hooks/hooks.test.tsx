import * as React from 'react'
import { render } from '@testing-library/react'
import { useLocalStorage } from '../../hooks/useLocalStorage'

function Action() {
  const key = 'item'
  const item = { name: 'name' }
  const [store, setStore] = useLocalStorage(key, item)

  expect(store.name).toBe(item.name)

  React.useEffect(() => {
    item.name = 'no name'
    setStore(item)
  }, [])

  expect(store.name).toBe(item.name)

  return <h1></h1>
}

describe('Hooks', () => {
  test('should insert in local store', async () => {
    render(<Action />)
  })
})
