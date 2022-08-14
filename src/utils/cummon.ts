export const getToFixedPrice = (price: string | number) => Number(price).toFixed(getToFixedNumber(price))

export const getToFixedNumber = (price: number | string) => {
  const absPrice = Math.abs(+price)
  if (absPrice > 1000) {
    return 2
  }
  if (absPrice > 100) {
    return 3
  }
  if (absPrice > 1) {
    return 4
  }
  if (absPrice > 0.01) {
    return 6
  }
  return 8
}
export const getPriceColor = (price: number | string) => {
  return +price > 0 ? '#19e219' : '#ff0000'
}
