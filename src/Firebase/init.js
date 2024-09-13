import {initializeApp} from "firebase/app"
import {getFirestore} from 'firebase/firestore'
const firebaseConfig = {
    apiKey: "AIzaSyDjcoUJgGDheZAPW86PeRmjtp7BoeVIhd8",
    authDomain: "week7-xinyu-29876.firebaseapp.com",
    projectId: "week7-xinyu-29876",
    storageBucket: "week7-xinyu-29876.appspot.com",
    messagingSenderId: "195580207290",
    appId: "1:195580207290:web:be4cba03a83edd03072283"
  };
initializeApp(firebaseConfig)
const db = getFirestore()
export default db