export function toCurrency(n: string) {
  return n.replace(/\D/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function toNumber(n: string | number) {
  if (typeof n === 'number') {
    return n
  }
  return parseInt(n.split('.').join(''))
}
