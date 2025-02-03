// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzJMPMewl8oOq75EMXyLsNY8ooRmHtcJY",
  authDomain: "stockmarket-2a5fd.firebaseapp.com",
  databaseURL: "https://stockmarket-2a5fd-default-rtdb.firebaseio.com/",
  projectId: "stockmarket-2a5fd",
  storageBucket: "stockmarket-2a5fd.firebasestorage.app",
  messagingSenderId: "247598683024",
  appId: "1:247598683024:web:31edd73535a2062c005915",
  measurementId: "G-ZQ0PLMMRYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app)

export const auth = getAuth(app); // Firebase Authentication
export {db} //firebase database
