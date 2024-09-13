
import { getFirestore } from "firebase/firestore";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBAWsN9T9fAvXrW_xc1u7-7-0oYS4YQMHA",
  authDomain: "week7xinyuli.firebaseapp.com",
  projectId: "week7xinyuli",
  storageBucket: "week7xinyuli.appspot.com",
  messagingSenderId: "220600255992",
  appId: "1:220600255992:web:698d05c75044ef1501020d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// 初始化 Firestore 数据库
const db = getFirestore(app)

export default db
