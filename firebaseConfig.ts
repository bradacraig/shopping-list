// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBTOxlcmoqdxtpRD39Vw86CBFANHtnLLAI',
  authDomain: 'shopping-list-bb775.firebaseapp.com',
  projectId: 'shopping-list-bb775',
  storageBucket: 'shopping-list-bb775.firebasestorage.app',
  messagingSenderId: '232015890',
  appId: '1:232015890:web:f3351b0fd4289b8002b0cb',
  measurementId: 'G-BZZCFJ9P6J',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Services
export const analytics = getAnalytics(app)
export const auth = getAuth(app)
export const db = getFirestore(app)
