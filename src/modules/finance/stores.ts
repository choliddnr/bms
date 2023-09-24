import { ref, computed, onMounted } from 'vue'
import { defineStore } from 'pinia'
import type {
  Account,
  AccountInfo,
  TransactionTBA,
  TransactionIncome,
  TransactionExpense,
  SyncBalance,
} from './types'
import { db } from '../core/firebase'
import {
  doc,
  collection,
  updateDoc,
  onSnapshot,
  setDoc,
  query,
  where,
  orderBy,
  QuerySnapshot,
  Timestamp,
} from 'firebase/firestore'

export const expenseCategories = ref<string[]>([
  'raw material',
  'complement',
  'shipment',
  'salary',
  'other business needs',
  'receivable',
  'individual needs',
  'others',
])
export const incomeCategories = ref<string[]>([
  'selling product',
  'selling assets',
  'gift',
  'debt',
  'others',
])

const accountCollName = ref<string>('balanceAccount')
const accountCollectionFB = collection(db, accountCollName.value)
const accounts = ref<Account[]>([])
const accountInfo = ref<AccountInfo>()

const transactionLastID = ref<number>(0)
const transactionCollName = ref<string>('transactions')
const transactionCollectionFB = collection(db, transactionCollName.value)

/**
 *  Account
 *
 *
 * */

export const useFinanceAccountStore = defineStore(accountCollName.value, () => {
  onMounted(() => {
    const q = query(accountCollectionFB)
    // const q = query(accountCollectionFB, where('isActive', '==', true))
    onSnapshot(q, (querySnapshot) => {
      let res: Account[] = []

      querySnapshot.forEach((doc) => {
        if (doc.id === '0') {
          accountInfo.value = {
            lastID: doc.data().lastID,
            branch: doc.data().branch,
            types: doc.data().types,
          }
        } else {
          res.push({
            id: parseInt(doc.id),
            name: doc.data().name,
            desc: doc.data().desc,
            type: parseInt(doc.data().type),
            number: doc.data().number,
            branch: parseInt(doc.data().branch),
            balance: doc.data().balance,
            isActive: doc.data().isActive,
          })
        }
      })
      accounts.value = res
    })
  })

  function addbalance(to: number, amount: number) {
    try {
      updateDoc(doc(accountCollectionFB, to.toString()), {
        balance: accounts.value.find((item) => item.id == to)?.balance! + amount,
      })
    } catch (error) {
      return error
    }
  }

  function substractBalance(from: number, amount: number) {
    try {
      updateDoc(doc(accountCollectionFB, from.toString()), {
        balance: accounts.value.find((item) => item.id == from)?.balance! - amount,
      })
    } catch (error) {
      return error
    }
  }

  const transactions = useTransactionStore()

  const tba = (data: TransactionTBA) => {
    substractBalance(data.from, data.amount)
    addbalance(data.to, data.amount)
    transactions.newTransaction(data)
  }

  const income = (from: number, amount: number) => {
    addbalance(from, amount)
  }

  const expense = (to: number, amount: number) => {
    substractBalance(to, amount)
  }

  const syncBalance = (data: SyncBalance) => {
    try {
      if (!data.id) return 'missing id!!!'
      updateDoc(doc(accountCollectionFB, data.id.toString()), {
        balance: data.amount,
      })
      transactions.newTransaction(data)
    } catch (error) {
      return error
    }
  }

  const editAccount = (data: Account) => {
    try {
      if (!data.id) return 'missing id!!!'
      let id = data.id.toString()
      delete data.id
      updateDoc(doc(accountCollectionFB, id), data)
    } catch (error) {
      return error
    }
  }

  return { accounts, accountInfo, tba, income, expense, syncBalance, editAccount }
})

/**
 * Transaction
 */

export const useTransactionStore = defineStore('transaction', () => {
  onMounted(() => {
    onSnapshot(doc(transactionCollectionFB, '0'), (doc) => {
      transactionLastID.value = doc.data()!.lastID
    })
  })

  function newTransaction(
    data: TransactionTBA | TransactionIncome | TransactionExpense | SyncBalance,
  ) {
    let newTransactionLastID = transactionLastID.value + 1
    try {
      setDoc(doc(transactionCollectionFB, String(newTransactionLastID)), data)
      setDoc(doc(transactionCollectionFB, '0'), {
        lastID: newTransactionLastID,
      })
    } catch (error) {
      console.log(error)
      return error
    }
  }
  return { newTransaction }
})
