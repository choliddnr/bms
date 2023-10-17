import { ref, onMounted, computed } from 'vue'
import { defineStore } from 'pinia'
import { db } from '@/modules/core/firebase'
import { collection, onSnapshot, query } from 'firebase/firestore'

import type { Branch } from './types'

const branchCollName = ref<string>('branch')
const branchCollectionFB = collection(db, branchCollName.value)
const branchs = ref<Branch[]>([])
// const branchInfo = ref<AccountInfo>()

export const useBranchStore = defineStore(branchCollName.value, () => {
  onMounted(() => {
    const q = query(branchCollectionFB)
    // const q = query(accountCollectionFB, where('isActive', '==', true))
    onSnapshot(q, (querySnapshot) => {
      let res: Branch[] = []

      querySnapshot.forEach((doc) => {
        res.push({
          id: doc.id,
          name: doc.data().name,
          contact: doc.data().contact,
          address: { city: doc.data().address_city },
        })
      })
      branchs.value = res
    })
  })
  console.log('q', branchs.value)
  const v = ref(5)
  function inc() {
    const q = query(branchCollectionFB)
    // const q = query(accountCollectionFB, where('isActive', '==', true))
    onSnapshot(q, (querySnapshot) => {
      let res: Branch[] = []

      querySnapshot.forEach((doc) => {
        res.push({
          id: doc.id,
          name: doc.data().name,
          contact: doc.data().contact,
          address: { city: doc.data().address_city },
        })
      })
      branchs.value = res
    })
    return branchs
  }
  return { branchs, inc }
})
