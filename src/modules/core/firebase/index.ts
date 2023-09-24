// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth } from 'firebase/auth'

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyD7mQfd665Q643f9NaxunfyizybTmGaPFk',
  authDomain: 'tsurayya-bms.firebaseapp.com',
  projectId: 'tsurayya-bms',
  storageBucket: 'tsurayya-bms.appspot.com',
  messagingSenderId: '174762823888',
  appId: '1:174762823888:web:331e67d28d9652fa1bced5',
  measurementId: 'G-0ET0GJE9C6',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app);

const db = getFirestore(app)
const auth = getAuth(app)

export { db, auth }
