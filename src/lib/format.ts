export function formatNumber(num: number) {
  return num.toLocaleString()
}

export function formatMoney(money: number) {
  return money.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
  })
}
