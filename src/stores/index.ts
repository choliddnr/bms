import { ref } from 'vue'
import { defineStore } from 'pinia'
import { auth } from '../modules/core/firebase'
import type { User } from 'firebase/auth'

import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'

const session = window.sessionStorage

export const useUserStore = defineStore('user', () => {
  const isAuthenticated = ref<boolean>()
  const user = ref<User | null>(auth.currentUser)

  function setUserUIDSession(uid: string) {
    session.setItem('user_uid', uid)
  }

  function setUser(isAuth: boolean, usr: User | null) {
    isAuthenticated.value = isAuth
    user.value = usr
    if (usr) {
      setUserUIDSession(usr.uid)
    } else {
      setUserUIDSession('')
    }
  }

  const initUser = () => {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        auth,
        (usr) => {
          console.log('initUser onAuthStateChanged', usr)
          if (usr) {
            setUser(true, usr)
          } else {
            setUser(false, null)
          }
          removeListener()
          resolve(usr)
        },
        reject,
      )
    })
  }

  // onAuthStateChanged(auth, (usr) => {
  //   console.log('onAuthStateChanged', usr)
  //   if (usr) {
  //     setUser(true, usr)
  //   } else {
  //     setUser(false, null)
  //   }
  // })

  // initUser()

  function login(email: string, password: string) {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        isAuthenticated.value = true
        user.value = auth.currentUser
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  function register(username: string, email: string, password: string) {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser!, {
          displayName: username,
        }).then(() => {
          isAuthenticated.value = true
          user.value = auth.currentUser
        })
      })
      .catch((error) => {
        console.log(error.message)
      })
  }

  function logout() {
    signOut(auth)
      .then(() => {
        isAuthenticated.value = false
        user.value = null
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return { isAuthenticated, user, login, register, logout, initUser }
})
