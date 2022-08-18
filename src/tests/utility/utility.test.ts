import { getPriceColor, getToFixedPrice } from '../../utils/cummon'

describe('Utitly functions', () => {
  test('Get color', async () => {
    const color = '#19e219'
    const priceColor = getPriceColor(20)
    expect(color).toBe(priceColor)
  })
  test('Get to fixed price', async () => {
    const expectNumber = 2.2222;
    const number = getToFixedPrice(2.2222123123)
    expect(expectNumber).toBe(+number)
  })
})
