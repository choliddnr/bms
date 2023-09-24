export type Account = {
  id?: number
  name: string
  desc: string
  type: number
  number: string
  branch: number
  balance: number
  isActive: boolean
}

export type AccountInfo = {
  lastID: number
  branch: Array<string>
  types: Array<string>
}

type Transaction = {
  id?: number
  datetime: number
  amount: number
  desc: string
}

export type TransactionTBA = Transaction & {
  type: 'tba'
  from: number
  to: number
}

export type TransactionIncome = Transaction & {
  type: 'income'
  fromCust: boolean
  custID?: number
  cat: number
}

export type TransactionExpense = Transaction & {
  type: 'expense'
  from: number
  cat: number
}

export type SyncBalance = Transaction & {
  type: 'SyncBalance'
}
