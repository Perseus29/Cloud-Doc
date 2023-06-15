import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCjXt6EZxTxPWvQbUmd4xeCFzsGsyt4hh0",
  authDomain: "docs-f3985.firebaseapp.com",
  projectId: "docs-f3985",
  storageBucket: "docs-f3985.appspot.com",
  messagingSenderId: "511452737786",
  appId: "1:511452737786:web:b88cd626cdf39337915943"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();