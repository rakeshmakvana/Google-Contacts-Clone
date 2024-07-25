// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC4y3_l7ZuAUvrplLIWF7zuWOK3I8yMQgw",
  authDomain: "contacts-ffd28.firebaseapp.com",
  projectId: "contacts-ffd28",
  storageBucket: "contacts-ffd28.appspot.com",
  messagingSenderId: "520504843371",
  appId: "1:520504843371:web:5f3e515c9363f21d4ca52e"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);